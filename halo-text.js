/***********
 *    @haloText
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloText = global.haloText || {})))
}(this, function (exports) { "use strict"

  let haloText = function (__mapper = {}) {

    let f = __mapper("props")()

    let geoform = p => ({     // geoform
      type:  "Feature",
      geometry: {

        "type": "Point",
        "coordinates": [0, 0]

      },
      properties: {
        attr: {
          "width": p.payload.img.width,
          "height": p.payload.img.height,
        }
      }
    })

    let gramn = function gramn(anima, newAnigrams = []) {

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),             // anigram
        stace =   ani.stace(),               // stace
        ereform = ani.ereform(),             // ereform
        proform = ani.proform(),             // proform
        conform = ani.conform(),             // conform
        geoform = ani.geoform() || geoform  // geoform


      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform  // geoform

      if (stace) json = __mapper("xs").m("stace").getLocifier(anigram)(json)  // lociform

      let newAnigram = ani.anigram()
      newAnigram.sort = "text"
      newAnigram.feature = json
      newAnigram.feature.id = newAnigram.uid

      newAnigrams.push(newAnigram)

      return newAnigrams
    }

    /***************************
 *        @enty
 */
    let enty = function () {}
    enty.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
    enty.gramn = anima  => gramn(anima)

    return enty

  }

  exports.haloText = haloText

}));
