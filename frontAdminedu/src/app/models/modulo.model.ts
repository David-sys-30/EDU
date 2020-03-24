import { Component, OnInit } from '@angular/core';

export class ModulosModel{
	constructor(
		public idModulo:string,
		public nombreModulo:string,
		public numeroModulo:string,
		public idCurso_Modulo:string,
		public statusModulo:string,
		public duracionModulo:string
		){}
}