// Concatenador de curvas de bezier cúbicas.

var CubicBezier  = require("../curves/CubicBezier.js");

module.exports = function(){
  this.curves = [];

  this.init = function(controlPointSet) {
    for (var i = 0; i < controlPointSet.length; i++) {
      var curve = new CubicBezier().init(controlPointSet[i]);
      this.curves.push(curve);
    }
    return this;
  }

  this.getInterpolated = function(){
    var interpolated = [];
    var i = 0;
    for (var i = 0; i < this.curves.length; i++) {
      var curve = this.curves[i];
      interpolated.push(curve.getInterpolated()[0]);
    }
    interpolated.push(this.curves[this.curves.length - 1].getInterpolated()[1]);
    return interpolated;
  }

  this.generate = function(t){
      //multiplica a t, que va de 0 a 1, por el número de curvas.
      var u = t* this.curves.length, tCurve;
      var curveNumber = Math.floor(Math.abs(u));
      // para el último punto.
      if (curveNumber === this.curves.length) {
          curveNumber--;
          tCurve = 1;
      } else {
          tCurve = Math.abs(u) - curveNumber;
      }
      return this.curves[curveNumber].generate(tCurve);
    }

  this.generate_d1 = function(t){
      var u = t* this.curves.length, tCurve;
      var curveNumber = Math.floor(Math.abs(u));
      if (curveNumber === this.curves.length) {
          curveNumber--;
          tCurve = 1;
      } else {
          tCurve = Math.abs(u) - curveNumber;
      }
      return this.curves[curveNumber].generate_d1(tCurve);
  }

  this.generate_d2 = function(t){
      var u = t* this.curves.length, tCurve;
      var curveNumber = Math.floor(Math.abs(u));
      if (curveNumber === this.curves.length) {
          curveNumber--;
          tCurve = 1;
      } else {
          tCurve = Math.abs(u) - curveNumber;
      }
      return this.curves[curveNumber].generate_d2(tCurve);
  }

  this.TNB = function(t){
    var normal = vec3.create(), binormal = vec3.create();
    var tg = this.generate_d1(t);
    vec3.normalize(tg, tg);
    vec3.cross(binormal, tg, [0,1,0]);
    vec3.normalize(binormal, binormal);
    vec3.cross(normal,binormal,tg);
    return [tg, normal, binormal];
  }
}
