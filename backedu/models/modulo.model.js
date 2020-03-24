'use strict'

class Modulo{
	constructor(nombre,numero,idCurso,status,duracion){
		this.nombreModulo = nombre;
		this.numeroModulo = numero;
		this.idCurso_Modulo = idCurso;
		this.statusModulo = status;
		this.duracionModulo = duracion;
	}
}

module.exports = Modulo;