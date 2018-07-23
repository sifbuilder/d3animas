/******************************************
  *       @muonAnimation
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnimation = global.muonAnimation || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnimation (__mapper) {
    let [
      mprops,
      msim,
      mtim,
      rsvg,
      ctimer,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('sim'),
      __mapper('xs').m('tim'),
      __mapper('xs').r('svg'),
      __mapper('xs').c('timer'),
    ]
    )

    let state = {}
    state.animas = [] // global animas
    let mstore = __mapper('muonStore')
    // .................. getsims
    async function getsims_ (animas, elapsed) {
      let sim = msim.sim() // simulation on animas
      await msim.simulate_(sim, animas, elapsed) // stored
      return mstore.animasLive()
    }

    // .................. sequence
    function sequence (items, fromitem) {
      function chain (items, index) {
        return (index === items.length)
          ? Promise.resolve()
          : Promise.resolve(fromitem(items[index]))
            .then(() => chain(items, index + 1))
      }
      return chain(items, 0)
    }

    // .................. waitInPromise  gist.github.com/leofavre/71fcb20bec2c2fb9031b90b79f9647b2
    const waitInPromise = delay => arg => // .then(waitInPromise(17))
      Number.isFinite(delay) && delay > 0
        ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
        : Promise.resolve(arg)
    // .................. getweens
    const getweens = animas => sequence(animas, anima => mstore.ween(anima))


    // .................. getgramms
    const getgramms = animas => sequence(animas, anima => mstore.gramm(anima)) // store anigrams

    // .................. aniListener
    function animate () {
      if (state.animationStop === undefined) {
        state.animationStop = ctimer.subscribe(aniListener)
      }
    }

    // .................. aniListener
    function aniListener (elapsed) {
      console.log(` ................................... animation ${elapsed} ${state.animas.length}`)
      state.animas = mstore.animasLive()
      // console.log(` ................................... animation ${elapsed} ${state.animas.length}`)
      // .................. time

      state.animas = mprops.a(mstore.animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.payload.tim = mtim.timing(anima.payload.tim, elapsed) // set time
        if (elapsed > anima.payload.tim.limit + anima.payload.tim.msStart) {
          anima.payload.delled = 1 // crop by time
        }
      }

      // ............................. @STOP

      let maxlimit = state.animas.reduce((pre, item) => Math.max(pre, item.payload.tim.limit + item.payload.tim.msStart), 0)

      let nostop = state.animas.reduce((pre, item) => (pre || item.payload.tim.nostop), false)

      if (!nostop && (isNaN(maxlimit) ||
            (maxlimit > 0 && elapsed > maxlimit) || // stop if spired
            (elapsed > maxlimit))) { // stop if anigrams spired
        state.animationStop()
      }


    // ............................. @WEEN SIM GRAMM RENDEr
       getweens(mstore.animasLive(), elapsed)
        .then(() => getsims_(mstore.animasLive())
          .then(() => getgramms(mstore.animasLive())
            .then(() => rsvg.render({ type: 'FeatureCollection', features: mstore.anigrams().map(d => d.geofold) }))
        ))


    }

    // ............................. enty
    function enty () {}
    enty.animate = animate
    enty.animationStop = () => state.animationStop
    return enty
  }

  exports.muonAnimation = muonAnimation
}))
