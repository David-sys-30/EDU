'use strict'

class Chat{
	constructor(mensaje,time,emisor,receptor,id_curso,){
	
		this.mensaje = mensaje;
		this.time = time;
		this.emisor = emisor;
		this.receptor = receptor;
		this.id_curso = id_curso;
		
	}
}
module.exports = Chat;