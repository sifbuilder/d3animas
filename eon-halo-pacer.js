/**********************
 *    @haloPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloPacer = global.haloPacer || {})))
}(this, function (exports) {
  'use strict'

  async function haloPacer (__mapper = {}) {
    let [
      mric,
      mgeom,
      manitem,
      crayder,
      cwen,
      cversor,
      hent,
      mstace,
    ] = await Promise.all([
      __mapper('xs').m('ric'),
      __mapper('xs').m('geom'),
      __mapper('xs').m('anitem'),
      __mapper('xs').c('rayder'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
      __mapper('xs').h('ent'),
      __mapper('xs').m('stace'),
    ])

    let mstore = __mapper('muonStore')

    // ............................. _geofolder
    let _geofolder = function (ani, prob) {
      let pacerPayload = ani.payload.pacer
      let geoType = pacerPayload.type || 'LineString',
        base = pacerPayload.base || 'geo'

      let geofold = {
        type: 'Feature',
        geometry: { type: geoType, coordinates: null },
        properties: {},
      }

      let ric = ani.payload.ric
      let uid = mric.getuid(ric)

      let anitem = mstore.findAnigramFromUid(uid)
      if (anitem !== undefined && anitem.geofold !== undefined) {
        geofold = anitem.geofold
        if (base === 'geo') {
          if (geofold.properties.formGeoformed) { // revert geometry to formGeoformed
            geofold.geometry = geofold.properties.formGeoformed.geometry
          }
        } else if (base === 'ere') {
          if (geofold.properties.formEreformed) { // revert geometry to formEreformed
            geofold.geometry = geofold.properties.formEreformed.geometry
          }
        } else if (base === 'pro') {
          if (geofold.properties.formProformed) { // revert geometry to formProformed
            geofold.geometry = geofold.properties.formProformed.geometry
          }
        } else {
          if (geofold.properties.formGeoformed) { // revert geometry to formGeoformed
            geofold.geometry = geofold.properties.formGeoformed.geometry
          }
        }
      }

      return geofold
    }

    // ............................. _stacer
    let _stacer = {
      autoSitus: function (ani) {
        return mstace.getLocus(ani.payload.pacer.stace, ani)
      },
      initSitus: function (ani) {
        return {x: 0, y: 0, z: 0 }
      },
      eventSitus: function (ani) {
        return {x: crayder.pointer().x, y: crayder.pointer().y, z: 0 }
      },
    }

    // ............................. ween
    let ween = anima => []

    // ............................. gramm
    async function gramm (anima, newItems = []) {
      // let anigram = await manitem.snapani(anima)
// if (1 && 1) console.log('h.ent gramm anigram', anigram)       
      // let anitem  = await manitem.functorize(anigram)
      let anitem = anima
      
      let halo = anitem.halo,
        payload = anitem.payload,
        ric = payload.ric,
        tim = payload.tim

      let pacer = payload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        span = pacer.span || 0, // span between items
        aad = pacer.aad || 0 // aad to previtem

      let count = {} // count: items in cycle

      //  pacer interfaces
      let geofolder = payload.pacer.geofolder || _geofolder // geofolder
      let stacer = Object.assign({}, payload.pacer.stacer, _stacer) // stacer
      let riccer = payload.pacer.riccer || function (ani) { return ani.payload.ric }

      //  event
      if (crayder.mouse() && crayder.mouse().type === 'mouseup') { // if mouse up then reset
        let svg = __mapper('renderSvg').svg()
        cwen.reset(svg)
        cversor.reset(svg)
      }
      if ((crayder.mouse() !== undefined && crayder.mouseDown() === 1) ||
          (crayder.touch() !== undefined && crayder.touchStart() === 1)) { // on mouse DOWN
        if (mousesignal === 0 || crayder.mouse().type === 'mousedown') { //
          count.event = Math.floor(pacer.eventN) //  if in state or was event
        }
      }

      //  init
      if (pacer.inited === undefined || pacer.inited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      //  auto
      let cycletime = tim.unitPassed - (pacer.outed || 0)
      if (cycletime >= pacer.autoP &&
            tim.unitPassed > (pacer.autoT || 0)
      ) { // if cycle time above autopath
        count.auto = Math.floor(pacer.autoN) // count AUTO
        anitem.payload.inited = 1 //  inited
        anitem.payload.pacer.outed = tim.unitPassed // updated with anima
        let animas = Array.of(anitem) // upd ANIMA
        // mstore.apply({'type': 'UPDANIMA', 'caller': 'h.pacer', animas})
        mstore.apply({'type': 'UPDANIGRAM', 'caller': 'h.pacer', animas})
      }

      if (Object.keys(count).length > 0) { // on pace count
        let stace // situs of new anitem dependent on kind

        for (let counter = 0; counter < Object.keys(count).length; counter++) { // in count
          let key = Object.keys(count)[counter] // count sort

          if (count[key] > 0) { // if count on this sort
            if (key === 'init') {
              stace = stacer.initSitus(anitem) // INIT
            } else if (key === 'auto') {
              stace = stacer.autoSitus(anitem) // AUTO
            } else if (key === 'event') {
              stace = stacer.eventSitus(anitem) // EVENT
            }

            let situs = mstace.getLocus(stace, anitem)

            if (situs && typeof situs === 'object') situs = Object.values(situs)

            let _ric = ric
            _ric = riccer(anitem)
            let uid = mric.getuid(_ric) // uid

            let newItem = {}
            newItem.halo = halo
            newItem.geofold = geofolder(anitem)
            newItem.payload = Object.assign({}, anitem.payload) // newItem.payload
            newItem.payload.ric = _ric
            newItem.payload.uid = uid

            if (aad) { //  if aad,  add to LineString
              //  add situs to newItem coords
              //  coords are final space coords (after h.ent, stored at m.animation)
              let coords = newItem.geofold.geometry.coordinates // domain coords
              let geocoords = newItem.geofold.properties.geocoords // pre coords

              if (coords && coords.length > 0) {
                let presitus = coords[coords.length - 1] // last point in paced string

                let d = mgeom.distance3d(presitus, situs) // distance to new coord
                if (d >= span) {
                  coords.push(situs) // if beyond span ADD SITUS to LineString
                }
              } else {
                coords = Array.of(situs) // coords start with first situs
              }

              newItem.geofold.geometry.coordinates = coords // upd coords
              newItem.geofold.properties.geocoords = geocoords

              let newItemsInCount = await hent.gramm(newItem) // h.ent newItem
              newItems = [...newItems, ...newItemsInCount] // add new items
            } else { //  if NOT aad
              if (1 && 1) console.log('--- newItem', newItem)

              if (newItem.geofold && newItem.geofold.geometry.type === 'Point') { // POINT
                let presitus = newItem.geofold.geometry.coordinates

                if (presitus !== null) { // if paced item DOES exist
                  let d = mgeom.distance3d(presitus, situs) // distance from previous situs

                  if (d >= span) { // if distance from previous point greater than span
                    newItem.geofold.geometry.coordinates = [0, 0, 0]
                    newItem.payload.proform = {projection: 'uniwen', translate: situs } // proform
                    let newAnigrams = await hent.gramm(newItem) // process newItem as h.ent
                    newItems = [...newItems, ...newAnigrams] // add new anigrams
                  }
                } else { // paced item NOT exists
                  newItem.geofold.geometry.coordinates = [0, 0, 0]
                  newItem.payload.proform = {projection: 'uniwen', translate: situs} // proform

                  let newGrams = await hent.gramm(newItem)
                  newItems = [...newItems, ...newGrams] // add items
                }
              } else { // ..... else TRACE NAT
                let halo = newItem.halo

                newItem.payload.proform = { projection: 'uniwen', translate: situs } // proform transfer trace situs to halo

                let newGrams = await __mapper('xs').h(halo).gramm(newItem)
                newItems = [...newItems, ...newGrams] // add items
              }
            }
          }
        }
      }
      if (1 && 1) console.log('newItems', newItems)

      return newItems
    }

    let haloPacerHalo = function () {}
    haloPacerHalo.ween = anima => ween(anima)
    haloPacerHalo.gramm = anima => gramm(anima)

    // ....................... enty
    let enty = haloPacerHalo

    return enty
  }

  exports.haloPacer = haloPacer
}))
