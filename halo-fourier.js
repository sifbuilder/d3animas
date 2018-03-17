/****************************
 *      @haloFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFourier = global.haloFourier || {})))
}(this, function (exports) {
  'use strict'

  let haloFourier = function haloFourier (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mnat = __mapper('xs').m('nat')

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

  const pi = Math.PI, pi2 = 2 * pi,
      turn = 2 * Math.PI // 360

      
    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram() // anigram
      let fractal = anigram.payload.fractal
      
      let _NAME = fractal.name || 'anis',
        _DEPTH = fractal.depth || 2,
        _CF = fractal.cf || (d => 222 * 1), // cf color onlevel
        _SIDES = fractal.sides || 5,
        _RAD = fractal.rad || 90
        
        
        
      let radOnLevel = d => (d === 0) ? _RAD : _RAD / (Math.pow(2, d)) // rad(level)
      

      
      let zcoef = (rad, ang) => Complex({ re: rad * Math.cos(ang), im: rad * Math.sin(ang) })      
      
      
      
      let anis = []
      for (let order = 0; order < _DEPTH; order++) {
        anis[order] = f.cloneObj(anis[order - 1] || anigram) // anis h.nat
        anis[order].halo = 'ent' // halo
        
        anis[order].payload.ric = {gid: 'nat', cid: _NAME + order, fid: _NAME + order}
        anis[order].payload.fractal.an = [] // [0..._DEPTH)
        for (let j = 0; j < order; j++) {
          
          let ang = fractal.angOnLevel(j) 

          let rad = fractal.radOnLevel(j)
          
          anis[order].payload.fractal.an[j] = {rad, ang}
          
        }

        anis[order].payload.fractal.coef = d => { // fractal coef(order)
          let z = d.payload.fractal.an.reduce((p, q) => {
            let aj = zcoef(q.rad, q.ang) // q
            return p.add(aj)
          }, Complex({re: 0, im: 0}))
          return z
        }
        anis[order].payload.fractal.rad = radOnLevel(order) // rad
        anis[order].payload.boform.cf = _CF(order) // boform
        if (order === _DEPTH - 1) { // add avatars to last ani fractal
          anis[order].payload.avatars = anis[order].payload.fractal.avatars
        }
        
        anis[order].geofold = d => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              
              // ///
              // the geoform coincides with te geonode
              // //
              coordinates: [0,0],
            },
            properties: {
               pointRadius: d.payload.fractal.rad,
               
               
               // ///
               // the geonode reflects the geoform situs where it is created
               // the geonode returns the coordinates to unpositioned avatar
               // //
               geonode: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: Complex({re:0,im:0})
                    .add(
                    
                      d.payload.fractal.coef(d)
                      
                    )
                    .toVector()
                },
                properties: { // geofold coindices with geonode
                
                
               // ///
               // the geonode is affected by forces
               // maintains original situs
               // //                
                  orgen: Complex({re:0,im:0})
                    .add(
                    
                      d.payload.fractal.coef(d)
                      
                    )
                    .toVector(),
                  velin: [0, 0],
                  velang: [0, 0],
                  prevous: [0, 0],
                  geodelta: [0, 0]
                }
              },
            }
          })
        
      }
      
      for (let i=0; i<anis.length; i++) {
        newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(anis[i])]
      }
      
      return newAnigrams

    }

    /****************************
   *    @enty
   */
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloFourier = {}
    haloFourier.ween = anima => haloNat_ween(anima)
    haloFourier.gramm = anima => {
      let r = haloNat_gramm(anima)
      return r
    }

    let enty = haloFourier

    return enty
  }

  exports.haloFourier = haloFourier
}))
