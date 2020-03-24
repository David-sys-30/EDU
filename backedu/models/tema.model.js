'use strict'

class Tema{
	constructor(nombre,idModulo,descripcion,numero,status){
		this.nombreTema = nombre;
		this.idModulo_Tema = idModulo;
		this.descripcionTema = descripcion;
		this.numeroTema = numero;
		this.statusTema = status;
	}
}

module.exports = Tema;