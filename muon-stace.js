/***********
 *    @muonStace
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonStace = global.muonStace || {})))
}(this, function (exports) { "use strict"

  let muonStace = function (__mapper = {}) {

    let f = __mapper("props")()
		let mstore = __mapper("xs").m("store")
		let mlacer = __mapper("xs").m("lacer")


  /* ******************************************
    getLocifier (anigram)
    getLocifion (anigram)                     -- translate projection
			getLocus (anigram)                     	-- locus or first location
				getSiti (anigram)                     -- root x,y,z
				getLocations (anigram)                -- stace root, pos ref
					getLocsInDim (dimStace, dimStream)  -- location of dimStream by dimStace
					getLocsFromParent (anigram)
  */
    // ........................ getSiti         situs: Arary.of(ani.x, .y, .z)
    let getSiti = function (anima, siti=[]) {

      let situs = {}

			if (typeof anima === "object") {

				if ( typeof anima.x === "number" ) situs.x = anima.x
				if ( typeof anima.y === "number" ) situs.y = anima.y
				if ( typeof anima.z === "number" ) situs.z = anima.z

			}

      if (Object.keys(situs).length === 0) situs = undefined
      else {
          situs = Object.values(situs)
          siti.push(situs)
      }

      return siti

    }

 /* **********
 *             @getLocsInDim
 *             array of locations in stace dim
 */
    let getLocsInDim = function (staceDim, parentCoordsDim = []) {


      let locations = []
      if (typeof staceDim === "number") {

          locations.push(staceDim)

      } else if (typeof staceDim === "object" && staceDim.pos !== undefined)  {// staceDim pos

        if (parentCoordsDim.length > 0) {

          if (typeof staceDim.pos === "number") {           // one position

            let pos = f.posInStream(staceDim.pos, parentCoordsDim)

            let idx = Math.floor(pos)

            let v = parentCoordsDim[idx]
            locations = Array.of(v)

          } else if (Array.isArray(staceDim.pos)) {

            let dist = staceDim.dist || 0 // distance to position
            let fas = staceDim.fas || 0   // phase in positions
            let c0 = staceDim.pos[0]      // * staceDim.length / 100    // _e_
            let c1 = staceDim.pos[1]      // * staceDim.length / 100    // _e_

            let pos0 = Math.floor(c0)     // first of positions array
            let pos1 = Math.floor(c1)     // last of positions array

            let step = Math.round(staceDim.step) || 1    // step between positions

            if (pos0 <= pos1) {
              locations = d3.range(pos0, pos1, step)   // d3 create positional array
                .map(d => d + fas)                        // displace positions by phase
                .map(d => d % parentCoordsDim.length)          // mod (-1)
                .map(d => Math.floor(d))              // integer position
                .map(d => parentCoordsDim[d])            // location from parent coords
                .map(d => d + dist)                   // sum dist to dim location
            } else {
              locations = d3.range(pos1, pos0, step)    // d3 create positional array
                .map(d => d + fas)                  // displace positions by phase
                .map(d => d % parentCoordsDim.length)          // mod
                .map(d => Math.floor(d))
                .map(d => parentCoordsDim[d])
                .map(d => d + dist)
            }

          }
        }
      }


      return locations
    }


 /* ***************************************
 *        @getLocations
 *         get val of d in dim dim
 *					called by m.profier.proform to get translate
 */
									// 			@dimval get val of d in dim dim
									let dimval = (dim, d) => {                               // val in dim
										let ret
										if (typeof d === "number")          ret = d            // dim val is number
											else if (Array.isArray(d))  {                        // dim val is array
													if ( typeof d[dim] === "number" ) ret = d[dim]
													else if (Array.isArray(d[dim])) ret = d[dim][dim]
													else if (typeof d[dim] === "object") ret = Object.values(d[dim])[dim]
											}
											else if (typeof d === "object") {
													ret = Object.values(d)[dim]                     // dim val is object

											}
										return ret
									}


 let getLocations = function (stace, anigram, locations=[]) {

					if (1 && 1) console.log("m.stace.getLocations stace", stace)

					if (anigram !== undefined) {

								stace = stace || anigram.payload.boform


								if (stace !== undefined && Array.isArray(stace)) {  // stace :: [x,y,z]

									let location = []
									let val = stace                  // single location from stace array

									// [x,y,z], {x,y,z}, [ [x1,y1,z1], [x2,y3,z3] ]
									
								if (f.isArray(val) && f.isPureArray(val))	{
										location[0] = val[0] || 0
										location[1] = val[1] || 0
										location[2] = val[2] || 0
										
								} if (f.isArray(val) && f.isQuasiPureArray(val)) {	 //sum _____ [[a1,a2,a3],[b1,b2]]*

												let poses = val.length										// positions eg.2
												let mx = Math.max(...val.map(d => d.length))	// num of dims eg. 3

												for (let i=0; i<mx; i++) {				// for each dimension
														let loc = 0
														for (let j=0; j<poses; j++) {
															loc = loc + (val[j][i] || 0)
														}
														location[i] = loc
												}

								}  else {
										console.log(" location format not supported")
								}




									locations.push(location)

								}

								else if (stace !== undefined && typeof stace === "object") { // anigram.payload.boform.{x,y,z}
									
									let val = stace   
									
									if (val.x !== undefined || val.y !== undefined || val.z !== undefined ) {	// is a position

										let location = []
										location[0] = val.x || 0
										location[1] = val.y || 0
										location[2] = val.z || 0
										
										locations.push(location)
										
									} else {															// rely on parent
								
								
												let location = []
												let entries = Object.entries(stace)
												let dims = __mapper("xs").m("anitem").dims()  // x, y, z

												let parentCoords = __mapper("xs").m("anitem").parentCoords(anigram) // parentCoords

												let parentLocationsDimd = mlacer.unslide(parentCoords)		// unslide

												let parentLocations = []
												for (let i=0; i<entries.length; i++) {
													let entry = entries[i]
													let key = entry[0]
													let val = entry[1]

													if (dims.find(d => d === key)) {
															parentLocations[i] = getLocsInDim(val, parentLocationsDimd[i])
													}


												}

												let slidedParentLocs = mlacer.slide(parentLocations, "max")

												if (slidedParentLocs.length > 0) locations.push(slidedParentLocs[0])
									}

								}

								if (locations.length === 0) {           // if still nothing, try to inherit from parent

										let parentuid = anigram.payload.parentuid

										if (parentuid !== undefined) {
											parent = mstore.findAnigramFromUid(parentuid)

											if (parent !== undefined) {
													let location = getLocus(parent)
													locations.push(location)
											}
										}


								}

					}

					if (locations.length === 0) locations = [[0,0,0]]


      return locations

    }



    /* **********
  *         @api
  *          get the uniwen projection with translate to ref location
  */

    let getReffion = function (stace, anigram = {}) {

      stace = stace || anigram.payload.boform

      let geometry = anigram.payload.geofold.geometry
      let coords = __mapper("xs").m("geoj").getCoords(geometry)

      let refs = f.unslide(coords)      // unidim coords
      let r0 = refs[0][stace.x.ref]     // stace.x.ref
      let r1 = refs[1][stace.y.ref]     // stace.y.ref
      let r2 = refs[2][stace.z.ref]     // stace.z.ref

      let projection =  { "projection": "uniwen","translate": [ r0, r1 , r2 ] }

      return  __mapper("xs").m("profier").projion(projection)

    }

 /* **************************************
 *        @getLocus
 */
    let getLocus = function (stace, anigram ) {

			stace = stace || anigram.payload.boform

			if (0 && 1) console.log("********getLocus stace", stace)

      let locus = [0,0,0]            // default locus _e_

      let siti = getSiti(anigram)           // anima    .x,.y,.z - root and sim
      let locations = getLocations(stace, anigram) // anigram  stace x || x.pos || x.ref

      if (siti && siti.length > 0 && locations && locations.length > 0) {	// siti, locations

				let situs = siti[0]
				let location = locations[0]

        locus = f.fa(situs).map((d, i) => d + location[i])  // add situs, location

      } else if (siti && siti.length > 0 ) {										// if siti

        locus =  siti[0]																	// first situs

      } else if (locations && locations.length >0 ) {						// if locations

        locus = locations[0]															// first location

      }

			return locus


    }

 /* **************************************
 *        @getLocifion
 *        get the uniwen projection with translate to anigram location
 *        getLocus
 */
    let getLocifion = function (stace, anigram ) {

			let locus = getLocus(stace,  anigram )

      let projection =  {
        "projection": "uniwen",
        "translate": [ locus[0], locus[1], locus[2] ]
      }

      return  __mapper("xs").m("profier").projion(projection)

    }

    /* **************************************
 *        @getLocifier
 *        locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]]
 */
    let getLocifier = function (stace, anigram = {}) {

      let locifion = getLocifion (stace, anigram)

      return g =>  __mapper("xs").b("proj3ct")(g, locifion)

    }

    /* **************************************
 *        @getReffier
 */
    let getReffier = function (stace, anigram = {}) {
      stace = stace || anigram.payload.boform
      if ( stace && stace.x && stace.x.ref &&       // stace.x.ref
                    stace.y &&  stace.y.ref) {      // stace.y.ref

        let reffion = getReffion (stace, anigram)

        return g =>  __mapper("xs").b("proj3ct")(g, reffion)

      }  else {

        return d => d               // identity

      }
    }

    /***********
  *         @enty
  */
    function enty() { return enty }

    enty.getLocus = getLocus   //  location
    enty.getLocifion = getLocifion   //  projection
    enty.getLocifier = getLocifier   //  projector

    enty.getLocations = getLocations   //  getLocations

    enty.getReffion = getReffion      //  projection
    enty.getReffier = getReffier      //  projector

    return enty

  }

  exports.muonStace = muonStace

}));
