/*******************************************
 *    @geoNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoNatform = global.geoNatform || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **returns nat projection**
  // md:
  // md: ### functions
  // md: pointStream
  // md: `pointStream projectionDefinition`
  // md: projectionDefinition: {type:nat, form:form}
  // md: get the nat for mvertices
  // md: natPoint returns the nat projection per polar coordinates
  // md:
  // md: ### methods
  // md: natprofion
  // md:  compleate form for natform
  // md:
  // md: # license
  // md: MIT

  async function geoNatform (__mapper = {}) {
    let mnat = await __mapper('xs').m('nat'),
      d3 = await __mapper('d3')

    let cache = {} // points, form

    // ............................. pointStream
    let pointStream = function (prjdef) {
      let natPoint = mnat.natVertex(prjdef.form) // m.nat.natVertex (a,b,c) => [a,b,c]

      let stream = function (lambda, phi, radio = 1) {
        this.stream.point(...natPoint(lambda, phi, radio))
      }

      return stream
    }

    // ............................. natprofion
    let natprofion = prjdef => {		// projection:natPoint, form:{x,y,z}
      let geoTrans = d3.geoTransform({
        point: pointStream(prjdef)})

      let geoProj = p => geoTrans(p)

      geoProj.stream = s => geoTrans.stream(s)

      return geoProj
    }

    // ............................. enty
    let enty = function (prjdef = {}) {
      return natprofion(prjdef)
    }

    return enty
  }

  exports.geoNatform = geoNatform
}))
