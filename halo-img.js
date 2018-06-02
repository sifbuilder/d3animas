/***********
 *    @haloImg
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloImg = global.haloImg || {})))
}(this, function (exports) {
  'use strict'

  let haloImg = function haloImg (__mapper = {}) {
    let f = __mapper('xs').m('props'),
		  manitem = __mapper('xs').m('anitem'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mboform = __mapper('xs').m('boform'),
      mric = __mapper('xs').m('ric'),
      mstace = __mapper('xs').m('stace')

    let _geofold = p => ({ // geofold
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: {
        sort: 'img',
        attr: {
          'width': p.payload.img.style.width,
          'height': p.payload.img.style.height,
          'rotate': p.payload.img.style.rotate,
          'xlink:href': p.payload.img.url
        }
      }
    })

    let gramm = function gramm (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(),
			  halo = 				anigram.halo, // halo
        payload = 		anigram.payload // payload


        let geofold = _geofold(anigram) // geofold

        let newAnigram = { 
          halo, 
          geofold, 
          payload 
        }
      
      newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(newAnigram)]
      return newAnigrams
    }

    /***************************
 *        @enty
 */
    let enty = function () {}
    enty.ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = 1, [anima]) : []
    enty.gramm = anima => gramm(anima)

    return enty
  }

  exports.haloImg = haloImg
}))
