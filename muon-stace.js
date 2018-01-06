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

  /* ******************************************
    getLocifier (anigram)
    getLocifion (anigram)                     -- translate projection
			getLocus (anigram)                     	-- locus or first location
				getSiti (anigram)                     -- root x,y,z
				getLocations (anigram)                -- stace root, pos ref
					getLocsInDim (dimStace, dimStream)  -- location of dimStream by dimStace
					getLocsFromParent (anigram)
					getParentLocations (anigram)          -- inherit natural parent location
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
 *        @dimval
 *         get val of d in dim dim
 */
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
 /* ***************************************
 *        @getLocations
 *
 */
 let getLocations = function (anigram, locations=[]) {

					let stace
					if (anigram !== undefined) {
						
								stace = anigram.stace


								if (stace !== undefined && Array.isArray(stace)) {  // stace :: [x,y,z]

									let val = stace                  // single location from stace array
									let location = []

									location[0] = dimval(0 ,val)
									location[1] = dimval(1, val)
									location[2] = dimval(2, val)

									locations.push(location)

								}

								else if (stace !== undefined && typeof stace === "object") { // anigram.stace.{x,y,z}


									let location = []
									let entries = Object.entries(stace)
									let dims = __mapper("xs").m("anitem").dims()  // x, y, z

									let parentLocationsDimd = f.unslide(__mapper("xs").m("anitem").parentCoords(anigram))

									let parentLocations = []

									for (let i=0; i<entries.length; i++) {
										let entry = entries[i]
										let key = entry[0]
										let val = entry[1]

										if (dims.find(d => d === key)) parentLocations[i] = getLocsInDim(val, parentLocationsDimd[i])


									}

									let slidedParentLocs = f.slide(parentLocations, "max")


									if (slidedParentLocs.length > 0) locations.push(slidedParentLocs[0])



								}

								if (locations.length === 0) {           // if still nothing, try to inherit from parent
										
										let parentuid = anigram.parentuid

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

 /* ***************************************
 *        @getParentLocation
 */
    let getParentLocations = function (anigram = {}, locations=[]) {

      let stace = anigram.stace,
        parentuid = anigram.parentuid

      parent = mstore.findAnigramFromUid(parentuid)

      if (parent !== undefined) locations = getLocations(parent)

      return locations

    }


 /* **************************************
 *        @getLocus
 */
    let getLocus = function (anigram ) {

			if (0 && 1) console.log("  ********getLocus", anigram)
	
      let locus = [0,0,0]            // default locus _e_

      let siti = getSiti(anigram)           // anima    .x,.y,.z - root and sim
      let locations = getLocations(anigram) // anigram  stace x || x.pos || x.ref

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
    let getLocifion = function (anigram ) {

			let locus = getLocus( anigram )

      let projection =  {
        "projection": "uniwen",
        "translate": [ locus[0], locus[1], locus[2] ]
      }
      return  __mapper("xs").m("profier").getProjion(projection)

    }

  /* **************************************
 *        @getLocifier
 *        locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]]
 */
    let getLocifier = function (anigram = {}) {

      let locifion = getLocifion (anigram)

      return g =>  __mapper("xs").b("proj3ct")(g, locifion)

    }

  /***********
  *         @enty
  */
    function enty() { return enty }

    enty.getLocus = getLocus   //  location
    enty.getLocifion = getLocifion   //  projection
    enty.getLocifier = getLocifier   //  projector

    return enty

  }

  exports.muonStace = muonStace

}));
