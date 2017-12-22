/******************************************
  *       @muonAnimation
  *
  **/
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonAnimation = global.muonAnimation || {})))
}(this, function (exports) { "use strict"

  let muonAnimation = function muonAnimation(__mapper) {

    let f = __mapper("props")()
    let state = {}
        state.animas = []              // global animas

  /*******************************************
   *
   *      @ANIMATION
   *
   **/
    let aniListener =  function aniListener(elapsed) {

      state.animas = f.a(__mapper("muonStore").animasLive() )

    /*******************************************
     *    @TIME
     */
      state.animas = f.a(__mapper("muonStore").animasLive() )
      for (let i=0; i<state.animas.length; i++) {

        let anima = state.animas[i]
        anima.tim  = __mapper("bosonTim")(anima.tim, elapsed) // set time
        if (elapsed > anima.tim.limit) {
          anima.delled = 1        // crop by time
        }
      }

    /*******************************************
     *    @STOP
     */
      let maxlimit = state.animas.reduce((pre,item) => Math.max(pre,item.tim.limit),0)
      if (isNaN(maxlimit)) state.animationStop()
      if (maxlimit > 0 && elapsed > maxlimit)   state.animationStop()    // stop if spired
      if (elapsed > maxlimit)   state.animationStop()    // stop if anigrams spired

    /*******************************************
     *    @WEEN generate animas and offsprings
     */
      for (let i=0; i<state.animas.length; i++) {

        let anima  = state.animas[i]                     // each anima in animas live
        let newAnimas = __mapper("xs").m("store").ween(anima)
        __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"alima","animas":newAnimas})

      }
      state.animas = f.a(__mapper("muonStore").animasLive() )

    /*******************************************
     *    @SIM defaults position of nodes
     */
      let sim = __mapper("xs").m("simulation").sim()
      state.animas =  __mapper("xs").m("simulation").simulate(sim, state.animas, elapsed)

    /*******************************************
     *    @GRAMN animas to anigrams
     */
      for (let i=0; i<state.animas.length; i++) {

        let newAnigrams = __mapper("xs").m("store").gramn(state.animas[i]) /* GRAMN  */
        __mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"store","anigrams":f.a(newAnigrams)})

      }
      let anigrams = __mapper("xs").m("store").anigrams()

    /*******************************************
     *    @FPS
     */
      if (__mapper("muonfps") && __mapper("muonfps").inited())  __mapper("muonfps").addloop()

    /*******************************************
    *     @RENDER
    */
      if (__mapper("renderSVG") !== undefined) __mapper("renderSVG").render(elapsed, anigrams)
      if (__mapper("renderWebgl") !== undefined) __mapper("renderWebgl").render(elapsed, anigrams )
      if (__mapper("renderCanvas") !== undefined) __mapper("renderCanvas").render(elapsed, anigrams )

    }

    /*******************************************
     *     @LISTENER
     */
     if (state.animationStop === undefined) state.animationStop = __mapper("xs").c("timer").subscribe(aniListener)

  /*******************************************
   *      @enty
   */
    function enty() {}

        enty.animationStop = () => state.animationStop

    return enty

  }

  exports.muonAnimation = muonAnimation

}));
