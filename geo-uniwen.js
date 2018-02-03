/*******************************************
 *    @geoUniwen
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoUniwen = global.geoUniwen || {})))
}(this, function (exports) {
  'use strict'

  let geoUniwen = function geoUniwen (__mapper = {}) {
    let f = __mapper('props')(),
      mgeom = __mapper('xs').m('geom'),
      mwen = __mapper('xs').m('wen'),
      cwen = __mapper('xs').c('wen')

    const init = {}
    init.scale = [1, 1, 1]
    init.rotate = [0, 0, 0]
    init.translate = [0, 0, 0]
    init.center = [0, 0, 0]
    init.lens = [0, 1, Infinity]

    let state = {}
    state.scale = init.scale
    state.rotate = init.rotate
    state.translate = init.translate
    state.center = init.center
    state.lens = init.lens

    let wenRotation = function (rot) {
      let rox = mwen.matrix(rot !== undefined ? mgeom.to_radians(rot) : cwen.rotInDrag())
      return function (x, y, z = 0) {
        return mwen.rotateMatrix([x, y, z], rox)
      }
    }

    let wenRotInverse = function (rot) {
      let rox = mwen.matrix(rot !== undefined ? mgeom.to_radians(rot) : cwen.rotInDrag())
      let invrox = mwen.transpose33(rox)
      return function (x, y, z = 0) {
        return mwen.rotateMatrix([x, y, z], invrox)
      }
    }

    let wenFocalInverse = function (p, d, s) {
      let h = Array.isArray(s) ? s : Array.of(s)
      let f0 = (h[0] || 1) / (1 - p[2] / d)
      let f1 = (h[1] || h[0]) / (1 - p[2] / d)
      return [p[0] / f0, p[1] / f1, p[2]]
    }

    /**************************
  *       @wenProjInvert
  */
    let wenProjInvert = function (point) {
      let rotate = state.rotate,
        scale = state.scale,
        translate = state.translate,
        lens = state.lens

      let x = point[0]
      let y = point[1]
      let z = point[2] || 0

      let c = [x, y, z]

      if (f.isPureArray(translate)) {
        c = c.map((d, i) => d - (translate[i] || 0)) // inverse translate
      } else { // assume multiple translates
        for (let k = 0; k < translate.length; k++) {
          let trans = translate[k] // if {} assume {x,y,z} => [,,]
          if (typeof trans === 'object') trans = Object.values(trans).map(d => d || 0)
          c = c.map((d, i) => d - (trans[i] || 0)) // translate
        }
      }

      c = wenFocalInverse([ c[0], c[1], z ], lens[2], scale) //   inverse projection

      c = [ c[0], c[1], (c[2] - lens[0]) / lens[1] ] // inverse focus

      c = wenRotInverse(rotate)(...c) //   inverse rotation

      return c
    }

    /**************************
  *       @pointStream
  */
    let pointStream = function (x, y, z = 0) {
      let rotate = state.rotate,
        scale = state.scale,
        translate = state.translate,
        lens = state.lens

      let c = [x, y, z]
      c = wenRotation(rotate)(...c) // rotate

      c = [ c[0], c[1], (c[2] * lens[1]) + lens[0] ] // focus

      c = mwen.projection(c, lens[2], scale) // project

      if (f.isPureArray(translate)) {
        c = c.map((d, i) => d + (translate[i] || 0)) // translate
      } else { // assume multiple translates
        for (let k = 0; k < translate.length; k++) {
          let trans = translate[k] // if {} assume {x,y,z} => [,,]
          if (typeof trans === 'object') trans = Object.values(trans).map(d => d || 0)
          c = c.map((d, i) => d + (trans[i] || 0)) // translate
        }
      }

      this.stream.point(...c)
    }

    let profion = () => {
      let geoTrans = d3.geoTransform({
        point: pointStream,
        sphere: d => d })

      let geoProj = p => geoTrans(p)

      geoProj.stream = s => geoTrans.stream(s)

      geoProj.invert = wenProjInvert

      return geoProj
    }

    /****************************
   *    @enty
   */
    let enty = function (prjdef = {}) {
      let m = profion(prjdef)
      let vars = Object.keys(prjdef)

      state = Object.assign({}, init) // reste proj state

      for (let i = 0; i < vars.length; i++) {
        if (state[vars[i]] !== undefined) state[vars[i]] = prjdef[vars[i]] // upd state
      }

      m.translate = _ => (_ !== undefined) ? (state.translate = _, m) : state.translate
      m.rotate = _ => (_ !== undefined) ? (state.rotate = _, m) : state.rotate
      m.scale = _ => (_ !== undefined) ? (state.scale = _, m) : state.scale
      m.lens = _ => (_ !== undefined) ? (state.lens = _, m) : state.lens

      return m
    }

    return enty
  }

  exports.geoUniwen = geoUniwen
}))
