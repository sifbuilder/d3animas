/****************************
 *      @haloQuadric
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloQuadric = global.haloQuadric || {})))
}(this, function (exports) {
  'use strict'


  // md: # md:{filename}
  // md: **expose nat form**
  // md: h.ent with  anima.geofold : `mnat.natFeature(p.payload.form)`
  // md:
  // md: # license
  // md: MIT


  let haloQuadric = function haloQuadric (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mnat = __mapper('xs').m('nat')

    let pow = Math.pow
    
    let functor = d => Array.isArray(d) ? d : Array.of(d)
    
    let ft = p => a => p.reduce( (acc,cur,i) => acc + cur * pow(a,i) , 0)
    
    let fn = form =>    // form has defined a1, a2, a3, a4  , r1, r2, r3, r4
      (r=0,s=0,u=0,v=0,a=1,b=1,c=1,d=1) => {
        let ret =  a * form.r1 * ft(functor(form.a1))(r) + 
            b * form.r2 * ft(functor(form.a2))(s) + 
            c * form.r3 * ft(functor(form.a3))(u) + 
            d * form.r4 * ft(functor(form.a4))(v)
            
        return ret
      }

    // .................... gramm
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram() // anigram
      let form = anigram.payload.form
      if (form !== undefined && typeof form === 'object') {
        let entries =  Object.entries(form)
        for (let i=0; i < entries.length; i++) {
          let entry = entries[i]
          let dax = entry[0]
          let formDax = entry[1]

          if (formDax.fn0 === undefined && (
            formDax.a1 !== undefined ||
            formDax.a2 !== undefined ||
            formDax.a3 !== undefined ||
            formDax.a4 !== undefined ||
            formDax.r1 !== undefined ||
            formDax.r2 !== undefined ||
            formDax.r3 !== undefined ||
            formDax.r4 !== undefined )) {

             formDax.a1  = (formDax.a1 === undefined) ? functor(0) : functor(formDax.a1)
             formDax.a2  = (formDax.a2 === undefined) ? functor(0) : functor(formDax.a2)
             formDax.a3  = (formDax.a3 === undefined) ? functor(0) : functor(formDax.a3)
             formDax.a4  = (formDax.a4 === undefined) ? functor(0) : functor(formDax.a4)
             formDax.r1  = (formDax.r1 === undefined) ? 0 : formDax.r1
             formDax.r2  = (formDax.r2 === undefined) ? 0 : formDax.r2
             formDax.r3  = (formDax.r3 === undefined) ? 0 : formDax.r3
             formDax.r4  = (formDax.r4 === undefined) ? 0 : formDax.r4
if (1 && 1) console.log('formDax', i, formDax)

             formDax.fn0 = fn(formDax)

          } else {
              // let default to h.nat
          }


        }
      }


      anigram.halo = 'nat' // halo
      anigram.payload.form = form // fn0

      newAnigrams = __mapper('xs').h('nat').gramm(anigram)

      return newAnigrams

    }

    // .................... enty
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloQuadric = {}
    haloQuadric.ween = anima => haloNat_ween(anima)
    haloQuadric.gramm = anima => haloNat_gramm(anima)

    let enty = haloQuadric

    return enty
  }

  exports.haloQuadric = haloQuadric
}))
