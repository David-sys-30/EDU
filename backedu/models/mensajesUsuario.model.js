'use strict'

class ChatUsers{
	constructor(mensaje,time,idemisor,idreceptor,idcurso,){
	
		this.mensaje = mensaje;
		this.time = time;
		this.emisor = idemisor;
		this.receptor = idreceptor;
		this.id_curso = idcurso;
		
	}
}
module.exports = ChatUsers;