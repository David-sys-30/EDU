'use strict'

class Contenido{
	constructor(idCategoriaContenido, nombre, idFormato, rutaContenido, idTema, status){
		this.idCategoriaContenido_Contenido = idCategoriaContenido;
		this.nombreContenido = nombre;
		this.idFormatodocumento_Contenido = idFormato 
		this.rutaContenido = rutaContenido;
		this.idTema_Contenido = idTema;
		this.statusContenido = status;
	}
}

module.exports = Contenido;