'use strict'

class CambioPass{
	constructor(idUsuario,fechaCadLink,codCambioPass,statusLink,usuPer){
		
		this.idUsuario = idUsuario;
		this.fechaCadLink = fechaCadLink;
		this.codCambioPass = codCambioPass;
		this.statusLink = statusLink;
		this.usuPer = usuPer
		
	}
}

module.exports = CambioPass;