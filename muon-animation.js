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

  let muonAnimation = function muonAnimation (__mapper) {
    let f = __mapper('props')(),
      mstore = 	__mapper('xs').m('store')

    let state = {}
    state.animas = [] // global animas

    /*******************************************
     *
     *      @aniListener
     *
     **/
    let aniListener = function aniListener (elapsed) {
      state.animas = f.a(__mapper('muonStore').animasLive())

      /*******************************************
     *    @TIME
     */
      state.animas = f.a(__mapper('muonStore').animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.payload.tim = __mapper('muonTim')(anima.payload.tim, elapsed) // set time
        if (elapsed > anima.payload.tim.limit + anima.payload.tim.msStart) {
          anima.payload.delled = 1 // crop by time
        }
      }


      /*******************************************
     *    @STOP
     */
      let maxlimit = state.animas.reduce((pre, item) => Math.max(pre, item.payload.tim.limit + item.payload.tim.msStart), 0)
      if (isNaN(maxlimit)) state.animationStop()
      if (maxlimit > 0 && elapsed > maxlimit) state.animationStop() // stop if spired
      if (elapsed > maxlimit) state.animationStop() // stop if anigrams spired
      /*******************************************
     *    @WEEN generate animas and offsprings
     */
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i] // each anima in animas live
        let newAnimas = __mapper('xs').m('store').ween(anima) // has generated animas
        __mapper('xs').m('store').apply({'type': 'UPDANIMA', 'caller': 'alima', 'animas': newAnimas})
      }
      state.animas = f.a(__mapper('muonStore').animasLive())
      /*******************************************
      *    @SIM defaults position of nodes
      */
      let sim = __mapper('xs').m('simulation').sim() // simulation on animas
if (0 && 1) console.log("state.animas", state.animas)
      __mapper('xs').m('simulation').simulate(sim, state.animas, elapsed)	// stored

      state.animas = f.a(__mapper('muonStore').animasLive())
      /*******************************************
     *    @GRAMM animas to anigrams
     */

      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]

        let newAnigrams = []
        newAnigrams = f.a(mstore.gramm(anima)) /* GRAMM */
      }

      let anigrams = __mapper('xs').m('store').anigrams()

      /*******************************************
    *     @RENDER
    */

      let featurecollection = {
        'type': 'FeatureCollection',
        'features': anigrams.map(d => d.geoform)
      }

      if (__mapper('renderSvg') !== undefined) __mapper('renderSvg').render(elapsed, featurecollection)
      if (__mapper('renderWebgl') !== undefined) __mapper('renderWebgl').render(elapsed, featurecollection)
      if (__mapper('renderCanvas') !== undefined) __mapper('renderCanvas').render(elapsed, featurecollection)
    }

    /*******************************************
     *     @LISTENER
     */
    if (state.animationStop === undefined) state.animationStop = __mapper('xs').c('timer').subscribe(aniListener)

    /*******************************************
   *      @enty
   */
    function enty () {}

    enty.animationStop = () => state.animationStop

    return enty
  }

  exports.muonAnimation = muonAnimation
}))
