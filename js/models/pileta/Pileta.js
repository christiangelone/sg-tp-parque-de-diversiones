var Barrido = require("../../main_shapes/Barrido.js");
var CubicBezierConcatenator  = require("../../curves/CubicBezierConcatenator.js");
var Puntos = require('../../curves/puntos.js');
var MaterialPhong = require('../../Materiales/MaterialPhong.js');

module.exports = function(){
  this.supB = null;

  var fForma = function(){

    var control = new Puntos().puntosPiletaPreparados;

    return function(t){
        var forma = new CubicBezierConcatenator().init(control);
        return forma.generate(t);
    }
  }
  this.fForma = fForma();

  this.fBarrido = function(t){
    return [0, t, 0];
  }

  this.init = function(){
    var material = new MaterialPhong({
      mapaRefleccion:"js/textures/SB/",
      mapaDifuso:"js/textures/water.jpg",
      mapaNormales:"js/textures/waterNM.png",
      ks:2.0,
      shininess: 50,
      agua:true
      });
    this.material = material;
    this.supB = new Barrido(this.fForma, this.fBarrido, 200, 40).init(material);
    return this;
  }

  this.draw = function(mv, t){
    // Le paso el tiempo a los shaders.
    global.gl.useProgram(this.material.program);
    global.gl.uniform1f(this.material.program.t, t);

    m = mat4.create();
    // Centrado al origen.
    mat4.translate(m,mv,[0,0,-0.5]);
    mat4.scale(m,m,[1,20,1]);

    this.supB.draw(m);
  }
}
