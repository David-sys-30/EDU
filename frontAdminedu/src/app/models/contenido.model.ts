import { Component, OnInit } from '@angular/core';

export class ContenidoModel{
	constructor(
		public idContenido:string,
		public idCategoriacontenido_Contenido:string,
		public nombreContenido:string,
		public idFormatodocumento_Contenido:string,
		public rutaContenido:string,
		public idTema_Contenido:string,
		public statusContenido:string

		){}
}