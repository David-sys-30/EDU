'use strict'

class Persona{
	constructor(nombre, apellidoPaterno, apellidoMaterno, correo, descripcion, imagen, status, telefono, contrasena){
		this.nombrePersona = nombre;
		this.apellidopaternoPersona = apellidoPaterno;
		this.apellidomaternoPersona = apellidoMaterno;
		this.correoPersona = correo;
		this.descripcionPersona = descripcion;
		this.imagenPersona = imagen;
		this.statusPersona = status;
		this.telefonoPersona = telefono;
		this.contrasenaPersona = contrasena;
	}
}

module.exports = Persona;