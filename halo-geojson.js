/**********************
 *    @haloGeojson
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloGeojson = global.haloGeojson || {})))
}(this, function (exports) { "use strict"

  let haloGeojson = function haloGeojson(__mapper = {}) {

    let f = __mapper("props")()

  /**********************
   *    @gramify
   */
  let gramify = function (anima, newAnigrams=[]) {

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),             // anigram
        stace =   ani.stace(),               // stace
        ereform = ani.ereform(),             // ereform
        proform = ani.proform(),             // proform
        conform = ani.conform(),             // conform
        geoform = ani.geoform() || geoform  // geoform

      let json = (typeof geoform === "function") ? geoform(anigram) : geoform // geoform
      if (ereform) json = __mapper("xs").m("profier").getProjier(ereform)(json)  // ereform
      if (conform) json = __mapper("xs").m("profier").getProjier(conform)(json)  // conform
      if (stace) json = __mapper("xs").m("stace").getReffier(anigram)(json)  // refform
      if (proform) json = __mapper("xs").m("profier").getProjier(proform)(json)  // proform
      if (stace) json = __mapper("xs").m("stace").getLocifier(anigram)(json)  // lociform

      if (0 && 1) console.log("json",json)
      newAnigrams =  __mapper("xs").m("geoj").geojize(json, anigram)      // geojize
      return newAnigrams

  }

  let haloGeojson_ween = anima => (anima.inited !== true) ? (anima.inited = anima.gelded = true, [anima]) : []
  let haloGeojson_gramn = anima => gramify(anima)

  let haloGeojson = {}
      haloGeojson.ween = anima => haloGeojson_ween(anima)
      haloGeojson.gramn = anima => haloGeojson_gramn(anima)
      haloGeojson.gramify = gramify

    /**********************
   *    @enty
   */
    let enty = haloGeojson

    return enty

  }

  exports.haloGeojson = haloGeojson

}));
