/**********************
 *    @haloLiner
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloLiner = global.haloLiner || {})))
}(this, function (exports) { "use strict"

  let haloLiner = function haloLiner(__mapper = {}) {

  let f = __mapper({"props": muonProps.muonProps()}).props()
  let g = __mapper("xs").m("geom")
  let mwen = __mapper("xs").m("wen")
  let mmouse = __mapper("xs").m("mouse")
	let cwen = __mapper("xs").c("wen")
	let cversor = __mapper("xs").c("versor")
	let mstace =	__mapper("xs").m("stace")

  let r = __mapper("xs").r("renderer"),
    width = r.width(),
    height = r.height()

	let svg = __mapper("renderSVG").svg()

  // -------------------------------  haloLinerHalo_ween
  let haloLinerHalo_ween = function haloLinerHalo_gramn(anima, newItems = []) {

    if (anima.inited !== 1) { anima.inited = anima.gelded = 1; newItems = Array.of(anima) }
    return newItems

  }
  // -------------------------------  haloLinerHalo_gramn
  let haloLinerHalo_gramn = function (anima, newItems = []) {

		if (0 && 1) console.log("  haloLinerHalo_gramn anima",anima)

    let ani = __mapper("xs").m("anitem")(anima),
      anigram = ani.anigram(),
      boform = ani.boform(),
      tim = ani.tim(),
      uid = anigram.uid,
      stace =   ani.stace(),        // stace
      proform = ani.proform(),      // proform
      conform = ani.conform(),      // conform
      geoform = ani.geoform(),       // geoform
      payload = ani.payload(),
      parentuid = anigram.parentuid

    let pacer = payload.pacer  || {}
    let pixspan = payload.span || 0


		let initSitus = d => ({x: width / 2, y: height / 2, z: 0 })
		let autoSitus = d => ({x: Math.random() * width / 2, y: Math.random() * height / 2, z: 0 })
		let eventSitus = d => ({x: mouse.event.x, y: mouse.event.y, z: 0 })


		let locus = mstace.getLocus(anigram)
    if (1 && 1) console.log("  *** avatar locus", locus, anigram)

		autoSitus = d => locus


    let count = {}          						// items to be generated on cycle
    let mouse = {}                      // mouse control
    if (1) {

      mouse.mouseDown = mmouse.mouseDown()        // down
      mouse.mouseUp = mmouse.mouseUp()             // up
      mouse.mouseMove = mmouse.mouseMove()        // move
      mouse.mouseDownShared = mmouse.mouseDownShared()       // shareddown
      mouse.event = mmouse.event()                // event

      if (mouse.event && mouse.event.type === "mouseup") {    // if up then reset
          cwen.reset(svg)
          cversor.reset(svg)
      }

      if (mouse.event !== undefined && mouse.mouseDown === 1 ) {  // on down event ...

        count.event = Math.floor(pacer.eventN)                //  take count

      }

      if (pacer.inited === undefined || pacer.inited !== 1) {

        count.init = Math.floor(pacer.initN)           // count INIT

      }

      let cyletime = tim.unitPassed - (pacer.outed||0)

      if (cyletime >= pacer.autoP) {                 		// if cycle time above autopath
        count.auto = Math.floor(pacer.autoN)        		// count AUTO
        pacer.outed = tim.unitPassed                		// updated with anima

        anima.inited = 1                               	//  inited
        anima.payload.pacer.outed = pacer.outed         //  outed at time units
        let animas = Array.of(anima)
        __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"h.liner",animas}) // upd ANIMA
      }

		}																										// PACE COUNT



		if (Object.keys(count).length > 0) {									// on pace count
      if (0 && 1) console.log("pacer count", count)

			let situs
      let n = 0
      for (let i=0; i<Object.keys(count).length; i++) {   // for each COUNT

        let key = Object.keys(count)[i]                   // count sort

        if (count[key] > 0) {                           	// if count on this sort
          let x, y, z
          if (key === "init") {                         	// init defaults center

						situs = initSitus()

          } else if (key === "auto") {                  // auto defauts random

						situs = autoSitus()

          } else if (key === "event") {                   // event defaults event

						situs = eventSitus()

          }

          let newItem = __mapper("xs").m("store").findAnigramFromUid(uid) 	// anigram
          if (newItem === undefined)  {
              newItem = __mapper("xs").b("clone")(anigram)     	// if first cycle clone anigram
          } else {
              newItem.boform = anigram.boform                   // if exists update traits
              newItem.stace = anigram.stace
              newItem.payload = anigram.payload
              newItem.proform = anigram.proform
              newItem.avatars = anigram.avatars
              newItem.forces = anigram.forces
          }

          if (0 && 1) console.log("newItem",newItem)



          newItem._x = newItem.x														// pre situs
          newItem._y = newItem.y
          newItem._z = newItem.z

          newItem.x = situs.x																			// situs
          newItem.y = situs.y
          newItem.z = situs.z

          let _feature = {}

          if (newItem._feature !== undefined) {							// if previous feature

            _feature = newItem._feature
            let coords = __mapper("xs").m("geoj").getCoords(_feature)

            let coord = Object.values(situs) // [x,y,z]

            let loc = coords[coords.length - 1]							// _e_

            let dx = coord[0] - loc[0]
            let dy = coord[1] - loc[1]
            let dz = coord[2] - loc[2]
            let d = dx * dx + dy * dy + dz * dz

            if (d > pixspan) coords.push(coord)    // add segment if above pixspan distance

            _feature.geometry.coordinates = coords
            _feature.properties.boform = boform

          } else {

            _feature = {type: "Feature", geometry: {}, properties: {}}
            _feature.id = "lineform" + i									// each element in count
            _feature.geometry = {type: "LineString",coordinates: [],}
            _feature.properties.boform = boform

            _feature.geometry.coordinates = Array.of(Object.values(situs))	// [x,y,0]

          }

          if (0 && 1) console.log("_feature", _feature)
          newItem.geoform = newItem._feature = _feature	// set geoform feature and keep history


          let newAnigrams = __mapper("xs").h("geojson").gramn(newItem)
          __mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"h.liner","anigrams":newItem}) // _e_

          newItems = [...newItems, ...newAnigrams]




        }

      }

    }


    return newItems

  }

  let haloLinerHalo = {}
      haloLinerHalo.ween = anima => haloLinerHalo_ween(anima)
      haloLinerHalo.gramn = anima => haloLinerHalo_gramn(anima)

   /**********************
   *    @enty
   */
    let enty = haloLinerHalo

    return enty

  }

  exports.haloLiner = haloLiner

}));
