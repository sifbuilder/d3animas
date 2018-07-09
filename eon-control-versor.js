/*******************************************
   *    @controlVersor
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlVersor = global.controlVersor || {})))
}(this, function (exports) {
  'use strict'

  async function controlVersor (__mapper = {}) {
    let [
      rrenderport,
      mversor,
      d3,
      mgeom,
    ] = await Promise.all([
      __mapper('xs').r('renderport'),
      __mapper('xs').m('versor'),
      __mapper('xs').b('d3'),
      __mapper('xs').m('geom'),
    ])

    // let xydirs = rrenderport.xydirs() // [1 -1] in pixel view
    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]
    getPos = rrenderport.getPos

    // start drag control
    let control = function (elem, props = {}) {
      elem.call(d3.drag()
        .on('start', versorControl.dragstarted)
        .on('drag', versorControl.dragged)
        .on('end', versorControl.dragended))
    }

    // stop drag control
    let reset = elem => elem.call(d3.drag()
      .on('start', null)
      .on('drag', null)
      .on('end', null))

    // ..................
    let state = {

      projection: () => d3.geoOrthographic(),

      rotation: [0, 0, 0],

      inve0_cart: null, // Mouse cartesian position invprojected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (spher)
      dtc: null, // Distance initial dot to center untransformed

      grabbed: false,
      moved: false,
      rotInitial_grads: [0, 0, 0],
      rotInDrag_grads: [0, 0, 0],
      rotAtInit_grads: [0, 0, 0],

      decay: 0.95,
      mult: 2e-3, // rotInDrag_rads factor
      rotInit_rads: [0, 0, 0],
      timeSpan: 200,
      epsilon: 1e-3,
      vel_spher: [0, 0, 0],
      moveSpan: 16,
      autoRot: false,
      lastMoveTime: null,
      timer: null,
      rotMatrix: null,
      cPos: null, // current position
      pPos: null, // previous position

    }

    // ....................... versorControl
    let versorControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // ....................... dragstarted
    function dragstarted () {
      let e = d3.event
      state.proj = state.projection()

      if (state.grabbed) return // drag ongoing
      state.moved = false // not moved yet       // stopMomentum()
      state.grabbed = true

      // -----------------
      state.p0 = getPos(e) // d3.mouse(this)

      let inve0_spher = state.proj.invert(state.p0)
      state.inve0_cart = mgeom.cartesian(inve0_spher)

      state.r0 = state.proj.rotate() // rotation in projection in degrees

      state.q0 = mversor(state.r0) // quaternion of initial rotation
      // -----------------

      state.rotAtInit_grads = state.rotInitial_grads // rebase()
    }

    // ....................... dragged
    function dragged () {
      let e = d3.event

      state.proj = state.projection

      if (!state.grabbed) return
      if (!state.moved) {
        state.moved = true // moved // state.autoRot = false
        state.autoRot = false
        state.rotAtInit_grads = state.rotInitial_grads // rebase()
      }

      // -----------------
      state.lastMoveTime = Date.now()

      // -----------------
      state.p1 = getPos(e)

      // -----------------
      state.inve1_spher = state.proj
        .rotate(state.r0)
        .invert(state.p1)

      state.inve1_cart = mgeom.cartesian(state.inve1_spher)

      // -----------------

      state.pPos = state.cPos
      state.cPos = state.inve1_spher

      // -----------------
      // quaternion to rotate between inve0_cart and inve1_cart
      // compose rotations of pdelta_cart, then of q0
      // euler rotation angles

      let pdelta_cart = mversor.delta(state.inve0_cart, state.inve1_cart)
      let q1 = mversor.multiply(state.q0, pdelta_cart)
      let r1 = mversor.rotation(q1) // in degrees
      // -----------------

      state.rotInDrag_grads = r1
    }

    // ....................... dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return
      let deltat = Math.max(0, 1 - (Date.now() - state.lastMoveTime))

      state.vel_spher = [

        (state.cPos[1] - state.pPos[1]) * state.mult,
        (state.cPos[0] - state.pPos[0]) * state.mult,

      ]
      state.timer = requestAnimationFrame(momentum)
    }

    // ....................... momentum
    function momentum () {
      if (Math.abs(state.vel_spher[0]) < state.epsilon && Math.abs(state.vel_spher[1]) < state.epsilon) return

      state.vel_spher[0] *= state.decay
      state.vel_spher[1] *= state.decay

      let vel = mgeom.cartesian(state.vel_spher)

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // ....................... enty
    function enty () {}
    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    enty.projection = _ => {
      if (_ !== undefined) {
        state.projection = _.projection
        return enty
      } else {
        return state.projection
      }
    }

    // enty.rotation = _ => {
    enty.rotation = () => {
      // if (_ !== undefined) {
      // state.rotation = _
      // return enty
      // } else {
      return mgeom.add(state.rotInDrag_grads, state.rotAtInit_grads)
      // return mgeom.add([0,0,0], state.rotAtInit_grads)
      // }
    }

    return enty
  }

  exports.controlVersor = controlVersor
}))
