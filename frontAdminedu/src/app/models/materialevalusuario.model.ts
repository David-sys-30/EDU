import { Component, OnInit } from '@angular/core';

export class CalificaMaterialModel {

  constructor(
  	public idMaterialevalusuario:string,
  	public idEvaluacioncontenido_Materialevalusuario:string,
  	public idUsuarioPersonaCurso_Materialevalusuario:string,
  	public idFormatodocumento_Materialevalusuario:string,
  	public nombreMaterialevalusuario:string,
  	public calificacionMaterialevalusuario:string,
  	public fechaMaterialevalusuario:string,
  	public statusMaterialevalusuario:string,
  	public intentoMaterialevalusuario:string
  	) { }

}
