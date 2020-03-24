import { Component, OnInit } from '@angular/core';

export class CursosModel{
	constructor(
		public idCurso:number,
		public idTipocurso_Curso:string,
		public idSubcategoriacurso_Curso:string,
		public nombreCurso:string,
		public resumenCurso:string,
		public descripcionCurso:string,
		public dirigidoCurso:string,
		public imagenCurso:string,
		public costoCurso:string,
		public statusCurso:string,
		public urlpresentacionCurso:string
		){}
}