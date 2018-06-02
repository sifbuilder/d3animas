/***********
   *    @controlRayder
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlRayder = global.controlRayder || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: ** **
  // md: ### refs
  // md: * https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
  // md:
  // md:
  // md:
  // md: # license
  // md: MIT  

  var controlRayder = function (__mapper = {}) {
    
    let f = __mapper('xs').m('props')   
    
    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()


    let mouse = {
      x: -2, // Initialize off canvas
      y: -2 
    }
    
    let pointer = {
      x: -2, 
      y: -2 
    }      
    
    let touch = {}    

    let domNode = __mapper('renderSvg').svg()
    
    let state = {
      pointer,
      mouse,
      touch,
      domNode
    }
    
    let cameraProjer = r.cameraProjer()
    
  
  // ............................. projector
  function projector (event) {
    
    if (typeof enty[ event.type ] == 'function' ) {
      if (1 && 1) console.log('crayder.projector:event', event.type)
    }

    if (event.type === 'mousemove') {
      
      let t = cameraProjer.invert([event.x, event.y])

      state.mouse.x = t[0]
      state.mouse.y = t[1]

      state.pointer.x = t[0] //
      state.pointer.y = t[1] //
      
    } else if (event.type === 'touchmove') {
      
      let touch = event.changedTouches[0]

      let t = cameraProjer.invert([touch.clientX, touch.clientY])

      state.mouse.x = t[0]
      state.mouse.y = t[1]

      state.pointer.x = t[0] //
      state.pointer.y = t[1] //
    }
  }

  // ............................. touchStartListener
    function touchStartListener (event) {
      event.preventDefault()
      enty.touchStart(1)
      enty.touchStartShared(1)
      enty.event(event)
    }

  // ............................. touchMoveListener
    function touchMoveListener (event) {
      event.preventDefault()
      enty.touchMove(1)
      enty.touchStartShared(1)
      enty.event(event)
      projector(event)
    }

  // ............................. touchEndListener
    function touchEndListener (event) {
      enty.touchStart(0)
      enty.touchStartShared(0)
      enty.event(event)
    }

  // ............................. mouseDownListener
    function mouseDownListener (event) {
      enty.mouseDown(1)
      enty.mouseDownShared(1)
      enty.event(event)
    }

  // ............................. mouseMoveListener
    function mouseMoveListener (event) {
      
      enty.mouseMove(1)
      enty.mouseDownShared(1)
      enty.event(event)
      projector(event)
      
    }

  // ............................. mouseUpListener
    function mouseUpListener (event) {
      enty.mouseDown(0)
      enty.mouseDownShared(0)
      enty.event(event)
    }

   // ............................. subscribe
    let subscribe = function (listener, domNode, sensor) {

      if (typeof listener !== 'function') throw new Error('Listener to be function')
      domNode.node().addEventListener(sensor, listener) // mounseUp, mouseUpListener
    
    }

   // ............................. controlrayder
  let control = function (domNode) {
    
      enty.domNode(domNode)
    
      subscribe(mouseDownListener, state.domNode, 'mousedown')
      subscribe(mouseUpListener, state.domNode, 'mouseup')
      subscribe(mouseMoveListener, state.domNode, 'mousemove')

      subscribe(touchStartListener, state.domNode, 'touchstart')
      subscribe(touchMoveListener, state.domNode, 'touchmove')
      subscribe(touchEndListener, state.domNode, 'touchend')
      
    }
    
   // ............................. enty
    let enty = () => enty

    enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode

    enty.mouse = () => state.mouse
    enty.touch = () => state.touch
    enty.pointer = () => state.pointer //

    enty.control = control
    
    enty.mouseDown = _ => (_ !== undefined) ? (state.mouseDown = _, enty) : state.mouseDown
    enty.mouseDownShared = _ => (_ !== undefined) ? (state.mouseDownShared = _, enty) : state.mouseDownShared
    enty.mouseMove = _ => (_ !== undefined) ? (state.mouseMove = _, enty) : state.mouseMove
    enty.mouseUp = _ => (_ !== undefined) ? (state.mouseUp = _, enty) : state.mouseUp
    
    enty.touchStart = _ => (_ !== undefined) ? (state.touchStart = _, enty) : state.touchStart
    enty.touchStartShared = _ => (_ !== undefined) ? (state.touchStartShared = _, enty) : state.touchStartShared
    enty.touchMove = _ => (_ !== undefined) ? (state.touchMove = _, enty) : state.touchMove
    enty.touchEnd = _ => (_ !== undefined) ? (state.touchEnd = _, enty) : state.touchEnd
    
       

    return enty
  }

  exports.controlRayder = controlRayder
}))
