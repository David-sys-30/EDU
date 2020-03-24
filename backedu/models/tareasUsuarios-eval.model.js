'use strict'

class tareasUsuario{
	constructor(idEvaluacioncontenido_Materialevalusuario, idUsuarioPersonaCurso_Materialevalusuario, idFormatodocumento_Materialevalusuario, nombreMaterialevalusuario, calificacionMaterialevalusuario, fechaMaterialevalusuario, statusMaterialevalusuario, intentoMaterialevalusuario){
		this.idEvaluacioncontenido_Materialevalusuario = idEvaluacioncontenido_Materialevalusuario;
		this.idUsuarioPersonaCurso_Materialevalusuario = idUsuarioPersonaCurso_Materialevalusuario;
		this.idFormatodocumento_Materialevalusuario = idFormatodocumento_Materialevalusuario;
		this.nombreMaterialevalusuario = nombreMaterialevalusuario;
		this.calificacionMaterialevalusuario = calificacionMaterialevalusuario;
		this.fechaMaterialevalusuario = fechaMaterialevalusuario;
		this.statusMaterialevalusuario = statusMaterialevalusuario;
		this.intentoMaterialevalusuario = intentoMaterialevalusuario;
	}
}

module.exports = tareasUsuario;