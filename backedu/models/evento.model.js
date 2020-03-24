'use strict'

class Evento{
	constructor(idUsuarioPersonaCurso_eventos, fechaInicioEvento, fechaFinEvento, nombreEvento, statusEvento){
		this.idUsuarioPersonaCurso_eventos = idUsuarioPersonaCurso_eventos;
		this.fechaInicioEvento = fechaInicioEvento;
		this.fechaFinEvento = fechaFinEvento;
		this.nombreEvento = nombreEvento;
		this.statusEvento = statusEvento;
	}
}

module.exports = Evento;