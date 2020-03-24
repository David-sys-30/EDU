import { Component, OnInit } from '@angular/core';

export class GrupoModel{

	constructor(
		public idGrupo:string,
		public nombreGrupo:string,
		public idPersona:string,
		public statusGrupo:string	
		){ }
}