/***************************
 *        @muonFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFourier = global.muonFourier || {})))
}(this, function (exports) {
  'use strict'

// https://raw.githubusercontent.com/andymac-2/fourier-polygon/master/fourier-polygon.js
// https://github.com/andymac-2/fourier-polygon
// (C) 2018 Andrew Pritchard (MIT License)
// https://www.youtube.com/watch?v=2hfoX51f6sg

var muonFourier = function () {


let diagram,

  polyline, // complex numbers from path. define in fourierDiagram

  period = 1,
  transform = [],
  centres = [],
  circles = [],
  svgPolyLine = null,
  endCircle = null,
  traced = null,

  tracedPath = "",
  endTime = null


let updateTransform = function () {

  if (0 && 1) console.log("updateTransform")
    var N = polyline.length;
    var _transform = [];
    for (var k = 0; k < N; k++) {
        var current = Complex (0, 0);
        for (var n = 0; n < N; n++) {
            var coef = Complex (0, (-2) * Math.PI * k * n / N)
            let h = coef.exp().mul(polyline[n])
            current = current.add(h);
        }
        _transform.push(current);
    }

    // _transform = _transform.sort((a,b) => b.abs() - a.abs())


// if (0 && 1) console.log("_transform", _transform.map(d => d.abs()))

    transform = _transform;
};



var fourierDiagram = function (path) {

    if (0 && 1) console.log("fourierDiagram")


    polyline = [];
    for (var i = 0; i < path.length; i++) {
        var point = path[i];
        polyline.push (Complex(point[0], point[1]));
    }

};





    /***************************
     *        @enty
     */
    let enty = () => {}

    enty.fourierDiagram = function (_div, _path, _period) {
      fourierDiagram(_div, _path, _period)
      return enty
    }
    enty.updateTransform = function () {
      updateTransform()
      return enty
    }

    enty.transform = () => transform


    return enty
  }

  exports.muonFourier = muonFourier
}))
