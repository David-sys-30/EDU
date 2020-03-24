import { Component, OnInit } from '@angular/core';

export class UsuarioModel {

  constructor(
  	public idUsuario:string,
  	public nombreUsuario:string,
  	public apellidopaternoUsuario:string,
  	public apellidomaternoUsuario:string,
  	public correoUsuario:string,
  	public contrasenaUsuario:string,
  	public imagenUsuario:string,
  	public statusUsuario:string
  	) { }

}