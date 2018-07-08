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
      mstore,
      msim,
      mtim,
      msnap,
      rsvg,
      rrenderport,
      ctimer
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('store'),
      __mapper('xs').m('sim'),
      __mapper('xs').m('tim'),
      __mapper('xs').m('snap'),
      __mapper('xs').r('svg'),
      __mapper('xs').r('renderport'),
      __mapper('xs').c('timer')
    ]
    )

    let state = {}
    state.animas = [] // global animas

    // .................. getsims
    const getsims = (animas, elapsed) => {
      let sim = msim.sim() // simulation on animas
      msim.simulate(sim, animas, elapsed)	// stored
      return mstore.animasLive()
    }

    // .................. getweens
    const getweens = async (animas, elapsed) => {
      let newAnimas = animas.map(anima => mstore.ween(anima))
      return mstore.animasLive()
    }
    
    function sequence(array, callback) {
        function chain(array, index) {
          if (index == array.length) return Promise.resolve();
            return Promise.resolve(callback(array[index])).then(function () {
              return chain(array, index + 1);
            })
        }
        return chain(array, 0);
    }

    // .................. getgramms
    const getgramms = (animas, elapsed) => {
      // let newAnigrams = animas.map(anima => mstore.gramm(anima)) // store anigrams
      let newAnigrams = sequence(animas, anima => mstore.gramm(anima)) // store anigrams
      return mstore.anigrams() // get anigrams from store
    }

    // .................. aniListener
    function animate () {
      if (state.animationStop === undefined) {
        state.animationStop = ctimer.subscribe(aniListener)
      }
    }

    // .................. aniListener
    function aniListener (elapsed) {
      
      mstore = __mapper('muonStore') // store with state from __mapper
      state.animas = mstore.animasLive()
      if (1 && 1) console.log(' __________________ aniListener', state.animas.length, elapsed.toFixed(0))

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
      Promise.resolve(state.animas)
        .then (animas => {
 // if (1 && 1) console.log('animation animas', animas)         
          return getweens(animas, elapsed)
        })
        .then(animas => getsims(animas))
        .then(animas => {
if (1 && 1) console.log('-------------------------- 1')
            let anigrams = getgramms(animas)
if (1 && 1) console.log('-------------------------- 2')
            return anigrams
        })
        .then(anigrams => {
// if (1 && 1) console.log('animation anigrams', anigrams)
          return { type: 'FeatureCollection', features: anigrams.map(d => d.geofold) }
        })
        .then(featurecollection => {
  // if (1 && 1) console.log('animation featurecollection', featurecollection)        
            rsvg.render(elapsed, featurecollection)
        })
        
        
    }

    // ............................. enty
    function enty () {}
    enty.animate = animate
    enty.animationStop = () => state.animationStop
    return enty
  }

  exports.muonAnimation = muonAnimation
}))
