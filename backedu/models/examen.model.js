'use strict'

class Examen{
	constructor(idModulo, nombre, evaluacion, duracion, status){
		this.idModulo_Examen = idModulo;
		this.nombreExamen = nombre;
		this.evaluacionExamen = evaluacion;
		this.duracionExamen = duracion;
		this.statusExamen = status;
	}
}

module.exports = Examen;