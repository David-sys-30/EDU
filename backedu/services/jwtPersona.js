'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'clave_secreta';

exports.createToken = function(usuario){
	let payload = {
		// Sub es para guardar el id
		sub:usuario.idUsuario,
		nombrePersona:usuario.nombreAdministrador,
		apellidopaternoPersona:usuario.apellidopaternoAdministrador,
		apellidomaternoPersona:usuario.apellidomaternoAdministrador,
		correoPersona:usuario.correoAdministrador,
		telefonoPersona:usuario.telefonoAdministrador,
		imagenPersona:usuario.imagenAdministrador,
		statusPersona:usuario.statusAdministrador,
		// Fecha de creacion del Token
		iat:moment().unix(),

		// Expiracion de dicho token
		exp:moment().add(30, 'days').unix
	};
	return jwt.encode(payload, secret);
}