/**********************
 *    @haloStars
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloStars = global.haloStars || {})))
}(this, function (exports) { "use strict"

  let haloStars = function haloStars(__mapper = {}) {


  /*******************************************
 *      @stars
 *
 */
    let stars = []

    let newStar = function( p ) {
      let {dist, speed, focaleStar, bop, name} = p
      let star = Object.assign({}, p)
          star.x = (Math.random() - 0.5) * 1
          star.y = (Math.random() - 0.5) * 1
          star.z = dist
          star.speed = speed
          star.bop= bop
      return star
    }

    let halogeoform = p => {
      let payload = p.payload,
          ric = p.ric,
          boform = p.boform

      let {nbStars, velStar, focaleStar, doxStar, maxZStar} = payload    // stars

      const dtMax = 1000 * 1 / 60
      let msPassed = p.tim.msPassed        // ms passed from first cycle
      let msDelta = p.tim.msDelta          // ms passed from previous cycle
      let dt = Math.max(msDelta , dtMax)  * 0.001


      if (stars.length < nbStars) {                     // CREATE

        for(let i = stars.length; i < nbStars; i++) {

          let dist = Math.random() * 0.2 // doxStar * Math.random() + 1

          let speed = velStar + Math.random() * velStar /2
          let bop = 1
          let name = "star_" + i

          let s = {dist, speed, focaleStar, bop, name }
          let star = newStar(s)

          stars.push(star)
        }
      }

      for (let i = 0, l = stars.length; i < l; i++) {   // UPD

        let star = stars[i]
        star.z = star.z + dt * star.speed      // z

        let starRange = maxZStar
        let bop = 0

        let s = {dist: doxStar, speed: velStar, focaleStar: focaleStar, bop, name: star.name}
        if (star.z > starRange || star.delled === 1) { // NEW STAR if out range or DELLED
          star = stars[i] = newStar(s)
        }

      }

      let jsonStars = {type: "FeatureCollection",features: []}
      for (let i = 0, l = stars.length; i < l; i++) {          // EACH STAR GEO

        let colorSpan = i * 10
        let star = stars[i]

        let geometry = {type:"Point",coordinates:[]}

        geometry.coordinates = Array.of( star.x, star.y, star.z )

        let feature = {type:"Feature",geometry:{},properties:{}}
          let _ric = {}
            _ric.gid = ric.gid
            _ric.cid = ric.cid + "star"
            _ric.fid = i

        feature.properties.zorder = star.z      // feature zorder from star z

        feature.properties.ric = _ric

        feature.properties.sort = "feature"
        feature.properties.pointRadius = payload.radioStar
        feature.geometry = geometry
        feature.properties.boform = boform    // same boform for all stars


        jsonStars.features.push(feature)

      }

      let jsonFaces = {type: "FeatureCollection", features: []}
      let {points, faces} = payload   // points faces

      for (let i = 0, l = faces.length; i < l; i++) {

        let face = faces[i]                // face pointsx position
        let geometry = {type:"Polygon",coordinates:[]}

        geometry.coordinates = Array.of(face.pointsx.map(k=>points[k])) // eg [-1, 1, 1]

        let feature = {type:"Feature",geometry:{},properties:{}}
          let _ric = {}
            _ric.gid = ric.gid
            _ric.cid = ric.cid + "face"
            _ric.fid = i
        feature.properties.ric = _ric

        feature.properties.sort = "feature"
        feature.geometry = geometry
        feature.properties.boform = face.boform || boform // boform per face
        jsonFaces.features.push(feature)
      }

      let json = {type: "FeatureCollection", features: []}


      json.features = [...jsonStars.features, ...jsonFaces.features]


      for (let i=0; i<json.features.length; i++) {

        let feature = json.features[i]
          let _ric = {}
            _ric.gid = ric.gid
            _ric.cid = "ani"      // to same class to order from m.animate
            _ric.fid = (i,d,a) => _ric.cid + "_" + i  // svg count id
        feature.properties.ric = _ric

      }

      return json
    }

    /**********************
   *    @gramify
   */
    let gramify = function (anima, newAnigrams=[]) {

      let ani = __mapper("xs").m("anitem")(anima)

      let stace = ani.stace(),                // stace
        proform = ani.proform(),                // proform
        conform = ani.conform(),                // conform
        geoform = ani.geoform() || halogeoform     // geoform

      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform


      if (conform) {
        let conformer = __mapper("xs").b("gist")(conform)
        json =  __mapper("xs").b("proj3ct")(json, conformer)  // conform
      }

      if (stace) {
        let reformer = __mapper("xs").m("stace").getReform(stace)
        json =  __mapper("xs").b("proj3ct")(json, reformer)      // reform
      }

      if (proform) {
        let proformer = __mapper("xs").b("gist")(proform)
        json =  __mapper("xs").b("proj3ct")(json, proformer)  // proform
      }

      if (stace) {
        let lociformer =  __mapper("xs").m("stace").getLociform(ani.anigram())
        json =  __mapper("xs").b("proj3ct")(json, lociformer)  // lociform
      }

      newAnigrams =  __mapper("xs").m("geoj").geojize(json, ani.anigram())  // id

      return newAnigrams
    }


    /**********************
   *    @enty
   */
    let enty = function enty() {}
    enty.ween = __mapper("xs").h("geojson").ween
    enty.gramn = anima => gramify(anima)

    return enty

  }

  exports.haloStars = haloStars

}))
