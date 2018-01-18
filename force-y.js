/* -------------------------- */
/*       forcey  							*/
/* -------------------------- */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forcey = global.forcey || {})))
}(this, function (exports) {
  'use strict'

  var forcey = function forcey (__mapper = {}) {
    let props = __mapper('props')()

    // -------------------------------------//
    //       force													//
    // -------------------------------------//
    let force = function (params) {
      // console.log(" ------------- force", params)
      let position = params.position || 0
      let strength = params.strength || (() => 0.1)

      let d3src = (params.src !== undefined) ? params.src : d3 // d3_force

      let d3force = d3src.forceY(position)
        .strength(strength)

      return d3force
    }

    /* -------------------------- 	*/
    /*        muonApi		  				*/
    /* -------------------------- 	*/
    var muonApi = function muonApi () {}
    muonApi.force = force

    return muonApi
  }

  exports.forcey = forcey
}))
