/*******************************************
 *    @muonInit
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonInit = global.muonInit || {})))
}(this, function (exports) {
  'use strict'

  /*******************************************
 *    @muonInit
 */
  let muonInit = function muonInit (__mapper = {}) {
  /*******************************************
 *    @enty
 */
    let enty = function (p) {
      if (p.canvas) __mapper({'renderCanvas': renderCanvas.renderCanvas(__mapper)})

      // SVG
      if (p.svg) __mapper({'renderSvg': renderSvg.renderSvg(__mapper)})

      // SVG POSITION
      if (p.pos) __mapper('xs').c('pos')(__mapper('renderSvg').svg())

      // BCK IMAGE
      if (p.img) __mapper('xs').m('image')('zimg-black.jpg')

      // SVG WEN
      if (p.svg && p.wen) __mapper('xs').c('wen').control(__mapper('renderSvg').svg())

      // SVG VERSOR
      if (p.svg && p.versor) __mapper('xs').c('versor').control(__mapper('renderSvg').svg())

      // WEBGL
      if (p.webgl) __mapper({'renderWebgl': renderWebgl.renderWebgl(__mapper)})

      // ANIMATION
      __mapper({'muonAnimation': muonAnimation.muonAnimation(__mapper)})

      // STORE
      __mapper({'muonStore': muonStore.muonStore(__mapper)})

      // GUI https://github.com/dataarts/dat.gui
      if (p.gui) { gui = new dat.GUI(); gui.add(window, 'restart') }

      // KEYBRD CONTROLS
      if (p.key) {
        __mapper('xs').c('key').start()                 // KEYBRD CONTROLS

        let controltimerRightArrowAlt = () => {         // ARROW
          if (__mapper('muonAnimation').animationStop !== undefined) {
            if (__mapper('controlTimer').started()) {
              __mapper('controlTimer').stop()
            } else {
              __mapper('controlTimer').resume()
            }
          }
        }
        __mapper('xs').c('key').subscribe(controltimerRightArrowAlt, 'rightArrowAlt')
      }

      // RAYDER mouse control
       __mapper('xs').c('rayder').control(__mapper('renderSvg').svg())
      
      // FPS frames per second applicance
      if (p.fps) {
        const fpsdiv = d3.select('body').append('div').attr('id', 'fps')
        __mapper('xs').m('fps').init()
      }

      // STATS
      if (p.stats) {
        let stats = __mapper('xs').m('stats')() // new Stats();
        stats.showPanel(-1) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom)
        function animate () {
          stats.begin(); stats.end()
          requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }

    return enty
  }

  exports.muonInit = muonInit
}))
