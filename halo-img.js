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
    let f = __mapper('props')(),
		  manitem = __mapper('xs').m('anitem'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mboform = __mapper('xs').m('boform'),
      mric = __mapper('xs').m('ric'),
      mstace = __mapper('xs').m('stace')

    let _geoform = p => ({ // geofold
      type: 'Feature',
      geometry: {

        'type': 'Point',
        'coordinates': [0, 0]

      },
      properties: {
        sort: 'img',
        attr: {
          'width': p.payload.img.width,
          'height': p.payload.img.height,
          'xlink:href': p.payload.img.url
        }
      }
    })

    let gramm = function gramm (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(),
			  halo = 				anigram.halo, // halo
        geofold = 		anigram.geofold || _geoform, // geofold
        payload = 		anigram.payload, // payload
        boform = 			payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform =			payload.proform, // proform
        conform = 		payload.conform, // conform
        uid = 				payload.uid, // uid
        parentuid = 	payload.parentuid, // parentuid
        json

      let newAnigram = {
        halo: halo, // inherit halo
        geofold: geofold,
        payload: payload
      }
if (1 && 1) console.log('newAnigram', newAnigram)

      newAnigram.geofold.properties.ric = ric
      newAnigram.geofold.properties.uid = uid

      newAnigrams = __mapper('xs').h('ent').gramm(newAnigram)

      newAnigrams = Array.of(newAnigram)
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
