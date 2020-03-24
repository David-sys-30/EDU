'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'clave_secreta';

exports.createToken = function(admin){
	let payload = {
		// Sub es para guardar el id
		sub:admin.idAdministrador,
		nombreAdministrador:admin.nombreAdministrador,
		apellidopaternoAdministrador:admin.apellidopaternoAdministrador,
		apellidomaternoAdministrador:admin.apellidomaternoAdministrador,
		correoAdministrador:admin.correoAdministrador,
		telefonoAdministrador:admin.telefonoAdministrador,
		imagenAdministrador:admin.imagenAdministrador,
		statusAdministrador:admin.statusAdministrador,

		// Fecha de creacion del Token
		iat:moment().unix(),

		// Expiracion de dicho token
		exp:moment().add(30, 'days').unix
	};
	return jwt.encode(payload, secret);
}