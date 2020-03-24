'use strict'

class Administrador{
	constructor(nombre, apellidoPaterno, apellidoMaterno, correo, telefono, contrasena, imagen, status){
		this.nombreAdministrador = nombre;
		this.apellidopaternoAdministrador = apellidoPaterno;
		this.apellidomaternoAdministrador = apellidoMaterno;
		this.correoAdministrador = correo;
		this.telefonoAdministrador = telefono;
		this.contrasenaAdministrador = contrasena;
		this.imagenAdministrador = imagen;
		this.statusAdministrador = status;
	}
}

module.exports = Administrador;