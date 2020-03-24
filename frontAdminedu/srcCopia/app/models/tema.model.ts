import { Component, OnInit } from '@angular/core';

export class TemasModel{
	constructor(
		public idTema:string,
		public nombreTema:string,
		public idModulo_Tema:string,
		public descripcionTema:string,
		public numeroTema:string,
		public statusTema:string
		){}
}