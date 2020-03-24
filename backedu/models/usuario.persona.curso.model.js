'use strict'

class UsuarioPersonaCurso{
	constructor( idUsuario_UsuarioPersonaCurso, idPersonaCurso_UsuarioPersonCurso, fechainicioUsuarioPersonaCurso, fechaTerminoUsuarioPersonaCurso, statusUsuarioPersonaCurso){
		this.idUsuario_UsuarioPersonaCurso = idUsuario_UsuarioPersonaCurso;
		this.idPersonaCurso_UsuarioPersonCurso = idPersonaCurso_UsuarioPersonCurso 
		this.fechainicioUsuarioPersonaCurso = fechainicioUsuarioPersonaCurso;
		this.fechaTerminoUsuarioPersonaCurso = fechaTerminoUsuarioPersonaCurso;
		this.statusUsuarioPersonaCurso = statusUsuarioPersonaCurso;
	}
}

module.exports = UsuarioPersonaCurso;