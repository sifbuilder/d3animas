/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnitem (__mapper = {}) {
    let [
      msnap,
    ] = await Promise.all([
      __mapper('xs').m('snap'),
    ])

    const functor = (d, ...p) => (typeof d === 'function') ? d(...p) : d

    // ............................. snapani
    let snapani = function (ani, t) {
      let anigram
      if (ani !== undefined) {
        t = t || ani.payload.tim.unitTime
        anigram = msnap.snap(ani, t)
      }
      return anigram
    }

    // ............................. functorize
    let functorize = function (ani, t) {
      let anigram = snapani(ani, t)

      if (anigram !== undefined) {
        if (anigram.payload === undefined) anigram.payload = {}
        anigram.geofold = functor((anigram.geofold), anigram) // geofold
        anigram.payload.conform = functor(anigram.payload.conform, anigram) // conform
        anigram.payload.proform = functor(anigram.payload.proform, anigram) // proform
      }

      return {

        halo: anigram.halo, // halo
        geofold: anigram.geofold, // geofold
        payload: anigram.payload, // payload
        avatars: anigram.avatars, // avatars

      }
    }

    // ............................. enty
    let enty = () => {}
    enty.snapani = snapani
    enty.functorize = functorize
    return enty
  }

  exports.muonAnitem = muonAnitem
}))
