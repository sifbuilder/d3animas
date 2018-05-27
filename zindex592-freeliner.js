

  // md: # md:{filename}
  // md: **free hand line trace**
  // md: ### animas
  // md: * lineform
  // md:
  // md:
  // md:
  // md: # license
  // md: MIT
  
let muonAlima = function (__mapper) {
  __mapper({'xs': xs.xs(__mapper)}) // PROXIES
  __mapper('xs').m('init')({svg: 1, versor: 0, wen: 0, webgl: 0, bck: 1, key: 1}) // INIT

  let f = __mapper({'props': muonProps.muonProps()}).props(),
    mgeom = __mapper('xs').m('geom'),
    mwen = __mapper('xs').m('wen'),
    crayder = __mapper('xs').c('rayder')

  let r = __mapper('xs').r('renderport'),
    width = r.width(),
    height = r.height()

  if (__mapper('controlKey') !== undefined) {
    let controltimerLeftArrowAlt = () => { // LEFT ARROW
      if (__mapper('muonAnimation').animationStop !== undefined) {
        if (__mapper('controlTimer').started()) {
          __mapper('controlTimer').stop()
        } else {
          __mapper('controlTimer').resume()
        }
      }
    }
    __mapper('controlKey').subscribe(controltimerLeftArrowAlt, 'leftArrowAlt')
  }

  if (__mapper('controlKey') !== undefined) {
    let controltimerUpArrowAlt = () => { // UP ARROW
      __mapper('controlWen').control(__mapper('renderSvg').svg()) // SVG WEN
    }
    __mapper('controlKey').subscribe(controltimerUpArrowAlt, 'upArrowAlt')
  }

  crayder.control() // subscribe mouse and touch listeners
  
  // ............................. pics
  
  let tim = {'td': 52800, 't0': 0, 't1': 1000, 't2': 1, 't3': 1}

  // ............................. lineform
  let lineform = {

    halo: 'pacer',
    payload: {

      tim: tim,
      ric: {gid: 'nat', cid: 'nat', fid: 'lineform'},
      boform: { 'csx': 0, 'cf': [[[444, 999]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 999]]], 'cw': [[[2.7, 2.7]]], 'cp': [[[0.9, 0.9]]]},

      proform: {
        projection: 'uniwen',
        translate: [0, 0, 0],
        scale: 1,
        rotate: [0, 0, 0],
        lens: [0, 1, Infinity],
      },

      geonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null}
      },

      pacer: {
        initN: 0,
        eventN: 1,
        autoN: 0,
        autoP: 0.1,
        outtimed: 0,
        maxN: 60,
        span: 5 / 1400,
				aad: 1,
				type: 'LineString',
				base: 'geo'



      }
    }

  }

  // ............................. enty
  let animas = [

    lineform // h.pacer

  ]

  let animaApi = function animaApi () {
    __mapper('xs').m('store').apply({'type': 'UPDANIMA', 'caller': 'alima', 'animas': animas})
  }

  return animaApi
}

let __mapper = muonMapper.muonMapper()
__mapper({'muonAlima': muonAlima(__mapper)}).muonAlima(__mapper)