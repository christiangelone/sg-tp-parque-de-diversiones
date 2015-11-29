// Generador de superficies de revolución.

var Grid = require("./Grid.js");

module.exports = function(fPerfil,cPerfil, cRevol){
    this.vertices = [];
    this.pPerfil = [];
    this.cPerfil = cPerfil;
    this.cRevol = cRevol;
    this.alfa = Math.PI * 2/(cRevol-1);
    this.normales = [];

    this.fijarPuntosEval = function(){
        for (var i = 0; i < cPerfil; i ++){
            this.pPerfil.push(i*this.recPerfil);
        }
    }

    this.obtenerVertices = function(){
        for (var i = 0; i < this.cRevol; i++){
            for (var j = 0; j < this.cPerfil; j++){
                angulo = this.alfa * i;
                var v = fPerfil(this.pPerfil[j]);
                // Roto en y.
                var rotado = [v[0]*Math.sin(angulo) + v[2]*Math.cos(angulo),
                    v[1], v[0]*Math.cos(angulo) - v[2]*Math.sin(angulo)];
                this.vertices = this.vertices.concat( rotado );

                var normal = rotado;
                this.normales = this.normales.concat(normal);
            }
        }
        //console.log(this.normales);
    }

    this.init = function(program){
        this.recPerfil = 1/(cPerfil-1);
        this.fijarPuntosEval();
        this.obtenerVertices();
        this.grid = new Grid(this.vertices,this.normales, cRevol, cPerfil).init(program);
        return this;
    }

    this.draw = function(gl,program){
        this.grid.draw(gl,program);
    }
}
