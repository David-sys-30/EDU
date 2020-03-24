import { Component, OnInit } from '@angular/core';

export class RequisitosModel{
 	constructor(
 		public idRequisito:string,
 		public idSubcategoriacurso_Requisito:string,
 		public nombreSubcategoriacurso:string,
 		public idCategoriacurso_Subcategoriacurso:string,
 		public nombreCategoriacurso:string,
 		public descripcionRequisito:string
		){}
}