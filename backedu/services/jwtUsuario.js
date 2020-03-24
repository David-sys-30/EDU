'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'clave_secreta';

exports.createToken = function(usuario, curso){
	let payload = {
		// Sub es para guardar el id
		sub:usuario.idUsuario,
		nombreUsuario:usuario.nombreAdministrador,
		apellidopaternoUsuario:usuario.apellidopaternoAdministrador,
		apellidomaternoUsuario:usuario.apellidomaternoAdministrador,
		correoUsuario:usuario.correoAdministrador,
		telefonoUsuario:usuario.telefonoAdministrador,
		imagenUsuario:usuario.imagenAdministrador,
		statusUsuario:usuario.statusAdministrador,
		idCurso:curso.idCurso,

		// Fecha de creacion del Token
		iat:moment().unix(),

		// Expiracion de dicho token
		exp:moment().add(30, 'days').unix
	};
	return jwt.encode(payload, secret);
}