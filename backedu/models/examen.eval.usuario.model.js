'use strict'

class EvaluacionTemaModel{
	constructor(idUsuarioPersonaCurso_Examenevalusuario, idExamen_examenevalusuario,calificacionExamenevalusuario){
		this.idUsuarioPersonaCurso_Examenevalusuario = idUsuarioPersonaCurso_Examenevalusuario;
		this.idExamen_examenevalusuario = idExamen_examenevalusuario;
		this.calificacionExamenevalusuario = calificacionExamenevalusuario;
	}
}

module.exports = EvaluacionTemaModel;