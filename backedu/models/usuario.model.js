'use strict'

class Usuario{
  constructor(nombreUsuario, apellidopaternoUsuario, apellidomaternoUsuario, correoUsuario,contrasenaUsuario, imagenUsuario, statusUsuario){
    this.nombreUsuario = nombreUsuario;
    this.apellidopaternoUsuario = apellidopaternoUsuario;
    this.apellidomaternoUsuario = apellidomaternoUsuario;
    this.correoUsuario = correoUsuario;
    this.contrasenaUsuario = contrasenaUsuario;
    this.imagenUsuario = imagenUsuario;
    this.statusUsuario = statusUsuario;
  }
}

module.exports = Usuario;
