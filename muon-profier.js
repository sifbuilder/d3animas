/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  let muonProfier = function muonProfier (__mapper = {}) {
    let f = __mapper('props')(),
      cwen = __mapper('xs').c('wen')(),
      cversor = __mapper('xs').c('versor'),
      mwen = __mapper('xs').m('wen'),
      mstace = __mapper('xs').m('stace'),
      mproj3ct = __mapper('xs').m('proj3ct'),
      mgeom = __mapper('xs').m('geom'),
      guniwen = __mapper('xs').g('uniwen')

    /****************************
 *      @profiom
 *        get projection from proform and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let profiom = function (prjdef) {
      let prj = guniwen(prjdef)

      if (prjdef !== undefined) {
        if (f.isString(prjdef.projection)) { // if _projection singular name
          prj = __mapper('xs').g(prjdef.projection)(prjdef) // props

        } else if (f.isFunction(prjdef.projection)) { // if is projection
          prj = prjdef.projection // props passed to projection

        } else if (f.isArray(prjdef.projections)) { // if plural select one
          prj = prjdef.projections[ Math.round(prjdef.projectidx || 0) ]

          if (f.isString(prj)) { // if name in array
            prj = __mapper('xs').g(prj)(prjdef) // get projection from name
          }
        }

        // if (prj.rotate !== undefined) {
          // let rot = (prjdef.rotate) ? prjdef.rotate : [0, 0, 0]

          // let dims = rot.length   // planar or spherical geometry
          // if (rot.length == 2) rot[2] = 0

          // let control
          // if (prjdef.projection === 'uniwen' || prjdef.control === 'wen') control = cwen // WEN
          // else control = cversor // VERSOR

          // let controlRotation = control
            // .projection(prj) // tbd
            // .rotation() // rotation from control wen

          // rot = mgeom.add(rot, controlRotation)

          // if (dims == 2) { // planar rotation
            // rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0])
          // }

          // prjdef.rotate = rot
        // }


        let translate = prjdef.translate
        if (translate && f.isObject(translate) && f.isPosition(translate)) {
          translate = Object.values(translate) // translate is {x,y,z}
          prjdef.translate = translate
        }

        let center = prjdef.center
        if (translate && f.isObject(center) && f.isPosition(center)) {
          center = Object.values(center) // center is {x,y,z}
          prjdef.center = center
        }

        for (let [key, value] of Object.entries(prjdef)) {
          if (f.isFunction(prj[key])) prj[key](value)
        }
      }
      return prj
    }

    /* ***************************
 *       @projier
 *       json = mprofier.projier(f.v(prodef, anigram), anigram)(json)
 */
    let projier = (prodef, anigram) => // projer is fenrir if no prodef
      json => (prodef) ? mproj3ct(json, profiom(prodef)) : json

    /****************************
 *       @ereformer
 */
    let ereformer = anigram => {
      let projdef = anigram.payload.ereform
      let projer = profiom(projdef)

      return json => mproj3ct(json, projer)
    }
    /****************************
 *       @conformer
 */
    let conformer = anigram => {
      let projdef = anigram.payload.conform

      let projer

      if (projdef === undefined) {
        
        projer = d => d
        
      } else {
        
        let projection = profiom(projdef)
        projer = json => mproj3ct(json, projection)
        
      }

      return projer
    }
    /****************************
 *       @proformion
 */
    let proformion = (anigram) => {

      let projection = profiom({ 
          'projection': 'uniwen',
      })
    
      let projdef = anigram.payload.proform
      
      if (projdef !== undefined) {

          let geofold = anigram.geofold


          let translate = []

          // if geonode
          //    translate fold by geonode location
          if (geofold.properties && geofold.properties.geonode) { 
            let geonode = geofold.properties.geonode
            translate.push(geonode.geometry.coordinates)
          }
          if (projdef.translate) {
            translate.push(mstace.getTranspot(projdef.translate, anigram))
          }
          projdef.translate = translate

          projection = profiom(projdef)

      }
 
      return projection
    }
    
    /****************************
 *       @proformer
 */
    let proformer = anitem => json => mproj3ct(json, proformion(anitem))
 
 
    /****************************
 *      @enty
 */
    let enty = function () {}
    enty.profiom = profiom
    enty.projier = projier
    
    enty.proformion = proformion
    enty.proformer = proformer
    
    enty.ereformer = ereformer
    
    enty.conformer = conformer

    return enty
  }

  exports.muonProfier = muonProfier
}))
