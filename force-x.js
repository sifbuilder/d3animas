/***********
	 *		@forceX
	 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceX = global.forceX || {})))
}(this, function (exports) {
  'use strict'

  let forceX = function (__mapper = {}) {
    let props = __mapper('xs').m('props')

    /***********
		*		@force
		*/
    let force = function (params) {
      let position = params.position || 0
      let strength = params.strength || (() => 0.1)

      let d3src = (params.src !== undefined) ? params.src : d3 // d3_force

      let d3force = d3src.forceX(position)
        .strength(strength)

      return d3force
    }

    var enty = function enty () {}
    enty.force = force
    return enty
  }

  exports.forceX = forceX
}))
