import { Component, OnInit } from '@angular/core';

export class AdministradorModel {

  constructor(
  	public idAdministrador:string,
  	public nombreAdministrador:string,
  	public apellidopaternoAdministrador:string,
  	public apellidomaternoAdministrador:string,
  	public correoAdministrador:string,
  	public telefonoAdministrador:string,
  	public contrasenaAdministrador:string,
  	public imagenAdministrador:string,
  	public statusAdministrador:string
  	) { }

}
