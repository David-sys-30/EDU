'use strict'

class Banner{
	constructor(titulo, descripcion, fecha, imagen, status){
		this.tituloPublicidad = titulo;
		this.descripcionPublicidad = descripcion;
		this.fechaPublicidad = fecha;
		this.imagenPublicidad = imagen;
		this.statusPublicidad = status;
	}
}

module.exports = Banner;