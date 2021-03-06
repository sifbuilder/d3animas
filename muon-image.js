/***********
 *    @muonImage
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonImage = global.muonImage || {})))
}(this, function (exports) {
  'use strict'

  let muonImage = function (__mapper) {
    let enty = function (src) {
      let name = src || 'space.jpg'

      if (__mapper('renderSvg')) {
        let imgs = __mapper('renderSvg').svg()
          .select('svg').selectAll('image').data([0])
        imgs.enter()
          .insert('svg:image')
          .attr('xlink:href', './' + name)
          .attr('x', '0')
          .attr('y', '0')
          .attr('width', '600')
          .attr('height', '400')
          .style('position', 'absolute; top:0px; left:0px; z-index:1')
          .attr('overflow', 'visible') // _e_
      } else {
        // "no renderSvg"
      }
    }

    return enty
  }

  exports.muonImage = muonImage
}))
