'use strict'

class UsuarioTema{
	constructor( idUsuariotema, tema_idTema, usuario_idUsuario, statusVisto){
		this.idUsuariotema = idUsuariotema;
		this.tema_idTema = tema_idTema 
		this.usuario_idUsuario = usuario_idUsuario;
		this.statusVisto = statusVisto;
	}
}

module.exports = UsuarioTema;