/*******************************************
 *    @haloScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloScene = global.haloScene || {})))
}(this, function (exports) {
  'use strict'

  async function haloScene(__mapper = {}) {

    let   __mscene          = __mapper('xs').m('scene')


    let [
          mscene,
       ] = await Promise.all( [
          __mscene,
       ])    
    
    
    // let mscene = __mapper('xs').m('scene')
    
    let ween = function (anima, newAnimas = []) {

      let p = anima.payload.context
      mscene.scenify(p)
      
      newAnimas = Array.of(anima)
      return newAnimas
    }

    // .................... enty
    
    let haloNat_ween = anima => ween(anima)
    
    let haloNat_gramm = anima => anima

    let haloNat = {
    
      ween: anima => haloNat_ween(anima),
      gramm: anima => haloNat_gramm(anima)
      
    }

    let enty = haloNat

    return enty
  }

  exports.haloScene = haloScene
}))
