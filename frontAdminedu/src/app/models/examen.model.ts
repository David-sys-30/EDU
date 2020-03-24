import { Component, OnInit } from '@angular/core';

export class ExamenModel{
	constructor(
		public idExamen:string,
		public idModulo_Examen:string,
		public nombreExamen:string,
		public evaluacionExamen:string,
		public duracionExamen:string,
		public statusExamen:string
		){}
}