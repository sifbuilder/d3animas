/***********
 *		@muonAnitem
 */			
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) { "use strict"


  var muonAnitem = function muonAnitem(__mapper = {}) {

    let f = __mapper("props")()

    /***************************************
 *				@anitem
 * 				
 */		
    let anitem = {}
 
    let setAnitem = function (d = {}) {	
      let a = anitem = {}
		
      // if (d && d.form  							// form:{x,y,z}
      // && typeof d.form === "object" 	
      // && ( d.form.x !== undefined && d.form.y !== undefined && d.form.z !== undefined )) {
      // a.form = d.form
      // } else if (d 											// form:{}
      // && d.form  
      // && typeof d.form === "object" 
      // && ( d.form.x === undefined && d.form.y === undefined && d.form.z === undefined )) {
      // a.form = {}
      // a.form.x = Object.assign( {}, d.form,  {fas8: (d.form.fas8 || 0)} )	// set fas8 0
      // a.form.y = Object.assign( {}, (d.form.y || d.form) , {fas8: d.form.fas8 - 90})
      // a.form.z = Object.assign( {}, (d.form.z || d.form) )
      // } else if (d 											// form:{x:}
      // && d.form  
      // && typeof d.form === "object" 
      // && ( d.form.x !== undefined || d.form.y !== undefined || d.form.z !== undefined )) {
      // a.form = {}
      // a.form.x = Object.assign({}, d.form.x )		// defined
      // a.form.y = Object.assign({}, (d.form.y || d.form.x) , {fas8: d.form.x.fas8 - 90})
      // a.form.z = Object.assign({}, (d.form.z || d.form.x) )
      // } else if (d 											// form:[{},{},{}]
      // && d.form  
      // && Array.isArray(d.form)) {
      // a.form = {}
      // a.form.x = d.form[0]
      // a.form.y = d.form[1] ||  Object.assign({}, d.form[0], {fas8: d.form.fas8 - 90})
      // a.form.z = d.form[2] ||  Object.assign({}, d.form[0])
      // } else {
      // a.form = {}
      // a.form.x = {} 
      // a.form.y = {} 
      // a.form.z = {} 
      // }

      let c = {
		
        stace: f.v((d||{}).stace),	// stace: {a,b,c}

        avatars: d.avatars,					// avatars: {}
        fields: d.fields,						// fields: {pic, field}
      
        form: d.form,
      
        from: d.from,						// from form in tern
        fuel: d.fuel,						// fuel
			
        ereform: (d||{}).ereform,		// ereform()
			
        geoform: (d||{}).geoform,		// geoform()
        geometry: d.geometry,				// geometry		-- from f.gramn
			
        graticule: d.graticule,	// extent: {}
        payload: d.payload,		// {initN,eventN,autoN,autoP,outed,maxN}
        nums: d.nums,		// {ra2, pos, fas, step, dist, div, mod, z}
        parent: d.parent || {},	// parent - default to empty object
        parentuid: d.parentuid,			// parentuid
        pic: d,									// pic:{}

        coform: d.coform,		// projection, scale, translate, rotate
        conform: d.conform,
			
        proform: d.proform,	// projection, scale, translate, rotate
			
        reticule: d.reticule,	// 
        msg: d.msg,						// 
			
        ric: d.ric,						// {type, gid, cid, fid}
        tim: d.tim,						// tim: {t0,t1,t2,t3}
			
        to: d.to,							// to form in tern
        trace: d.trace,				// trace: {hquan, hmod}
        boform: d.boform,					// {csx,cf,cs,cw
        voro: d.voro,					// {hsamp, f, t}
        vorts: d.vorts,				// {pos,fas,step,dist,div,mod,z}

        halo: d.halo,				 // d.halo,	// 
			
        nid: d.nid,								// nid
        uid: d.uid,								// uid
        x: d.x,										// 
        y: d.y,										// 
        z: d.z,										// 
			
        sort: d.sort,							// sort

      }
		
      a = Object.assign(a, c)
      return a	
	
    }
    /***************************************
 *				getNode
 * 				
 */		
    let getNode = function getNode(aniState = {}) {	

      let node = {
			 x: aniState.x,
			 y: aniState.y,
			 z: aniState.z,
        _x: aniState._x,     // past location
        _y: aniState._y,     // past location
        _z: aniState._z,     // past location
        vx: aniState.vx,
        vy: aniState.vy,
        vz: aniState.vz,
      }   
      return node

    }	
	
   /***********
	*		@enty
	*/		
	
    let enty = function( anima, t ) {
      let anigram = {}
      if (anima !== undefined) {
        if (t !== undefined) {
          anigram = __mapper("xs").b("snap")(anima, t)
        } else if (anima.tim.unitTime !== undefined) {
          let t = anima.tim.unitTime
          anigram = __mapper("xs").b("snap")(anima, t)
        }
        setAnitem(anigram)
      }
      return enty
    }

    enty.anigram = (ani,t) => {
      if (ani !== undefined) {										// if give anima
        if (t !== undefined) {									// if given time
						 ani  = __mapper("xs").b("snap")(ani, t)	// anima snap  to anigram
        }
        setAnitem(ani) 														// build anitem
      }
      return anitem															// give anitem back		
    }
		
    enty.getNode = getNode												// anitem => node
		
    enty.conform = (_) => { return _ !== undefined ? (anitem.conform = _, anitem) : anitem.conform }
    enty.conform$2 = (_) => { return _ !== undefined ? (anitem.conform = _, anitem) : (delete anitem.conform.z, anitem.conform)}
		
    enty.form = (_) => { return _ !== undefined ? (anitem.form = _, anitem) : anitem.form }
    enty.form$2 = (_) => { return _ !== undefined ? (anitem.form = _, anitem) : (delete anitem.form.z, anitem.form)}
		
		
    enty.from = (_) => { return _ !== undefined ? (anitem.from = _, anitem) : anitem.from }
    enty.fuel = (_) => { return _ !== undefined ? (anitem.fuel = _, anitem) : anitem.fuel }
		
    enty.ereform = (_) => {  return _ !== undefined ? (anitem.ereform = _, anitem) : anitem.ereform }
		
    enty.geoform = (_) => {  return _ !== undefined ? (anitem.geoform = _, anitem) : anitem.geoform }
		
    enty.graticule = (_) => { return _ !== undefined ? (anitem.graticule = _, anitem) : anitem.graticule }
    enty.nums = (_) => { return _ !== undefined ? (anitem.nums = _, anitem) : anitem.nums }
    enty.payload = (_) => { return _ !== undefined ? (anitem.payload = _, anitem) : anitem.payload }
		
    enty.proform = (_) => { return _ !== undefined ? (anitem.proform = _, anitem) : anitem.proform }
		
    enty.reticule = (_) => { return _ !== undefined ? (anitem.reticule = _, anitem) : anitem.reticule }
    enty.ric = (_) => { return _ !== undefined ? (anitem.ric = _, anitem) : anitem.ric }
    enty.stace = (_) => { return _ !== undefined ? (anitem.stace = _, anitem) : anitem.stace }
    enty.tim = (_) => { return _ !== undefined ? (anitem.tim = _, anitem) : anitem.tim }
    enty.boform = (_) => { return _ !== undefined ? (anitem.boform = _, anitem) : anitem.boform }
    enty.trace = (_) => { return _ !== undefined ? (anitem.trace = _, anitem) : anitem.trace }
    enty.to = (_) => { return _ !== undefined ? (anitem.to = _, anitem) : anitem.to }
		
    enty.avatars = (_) => { return _ !== undefined ? (anitem.avatars = _, anitem) : anitem.avatars }
    enty.parent = (_) => { return _ !== undefined ? (anitem.parent = _, anitem) : anitem.parent }

    enty.segs = () => { 
      let segs = 0
      segs = Math.max((anitem.form.x.seg5 || 0), segs)
      segs = Math.max((anitem.form.y.seg5 || 0), segs)
      segs = Math.max(((anitem.form.z||{}).seg5 || 0), segs)
      return segs
    }
		
		
    return enty

  }

  exports.muonAnitem = muonAnitem

}))
