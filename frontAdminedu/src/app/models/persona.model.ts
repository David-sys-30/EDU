import { Component, OnInit } from '@angular/core';

export class PersonaModel {

  constructor(
  	public idPersona:string,
  	public nombrePersona:string,
  	public apellidopaternoPersona:string,
  	public apellidomaternoPersona:string,
  	public correoPersona:string,
  	public descripcionPersona:string,
  	public imagenPersona:string,
  	public statusPersona:string,
  	public telefonoPersona:string,
    public contrasenaPersona:string
  	) { }

}
