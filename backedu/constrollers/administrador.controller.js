'use strict'

let Administrador = require('../models/administrador.model');
const CONN = require('./connection.controller');
let jwt = require('../services/jwt');
let path = require('path');
var fs = require('fs');

function loginAdministrador(req,res){
	let correo = req.body.correoAdministrador;
	let contrasena = req.body.contrasenaAdministrador;
	let gethash = req.body.gethash;
	CONN('administrador').where('correoAdministrador',correo)
	.andWhere('contrasenaAdministrador',contrasena)
	.select().then(admin=>{
		if (!admin) {
			res.status(500).send({resp:'Error',message:'Error en el servidor'})
		}else{
			if (admin.length <= 0) {
				res.status(404).send({resp:'Error',message:'Error en el usuario o contraseña'})
			}else{
				if (admin[0]['statusAdministrador'] != 1) {
					res.status(404).send({resp:'Error',message:'Lo sentimos, este correo esta dado de baja'});
				}else{
					let idAdministrador = admin[0]['idAdministrador'];
					if (gethash) {
						let token = jwt.createToken(admin);
						res.status(200).send({
							token:token,
							resp:'Sesion iniciada',
							administrador:admin
						});				
					}else{
						res.status(200).send({resp:'Sesion iniciada',administrador:admin});
					}
				}				
			}
		}
	}).catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function registraAdministrador(req, res){
	let administrador = new Administrador(req.body.nombreAdministrador, 
		req.body.apellidopaternoAdministrador, 
		req.body.apellidomaternoAdministrador, 
		req.body.correoAdministrador, 
		req.body.telefonoAdministrador, 
		req.body.contrasenaAdministrador, 
		'default.png',
		req.body.statusAdministrador);
	CONN('administrador').select().where('correoAdministrador',req.body.correoAdministrador)
	.then(row=>{
		if (row.length > 0) {
			res.status(200).send({mensaje:'El correo que quieres registrar ya esta registrado, intenta con otro'})
		}else{
			CONN('administrador').insert(administrador).then(idAdministrador=>{
				if (!idAdministrador) {
					res.status(500).send({resp:'Error', error: 'No se inserto el Administrador'});
				}else{
					res.status(200).send({
						resp:'Administrador registrado',
						idAdministrador:idAdministrador
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}
		
	})
}

function actualizaAdministrador (req,res){
	let idAdministrador = req.params.idAdministrador;	
	let administrador = new Administrador(req.body.nombreAdministrador, 
		req.body.apellidopaternoAdministrador, 
		req.body.apellidomaternoAdministrador, 
		req.body.correoAdministrador, 
		req.body.telefonoAdministrador, 
		req.body.contrasenaAdministrador,
		req.body.imagenAdministrador,
		req.body.statusAdministrador);
	CONN('administrador').where('idAdministrador', idAdministrador)
	.update(administrador).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('administrador').select().where('idAdministrador',idAdministrador).then(admin=>{
				if (!admin) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',administrador:admin,message:'Administrador actualizado correctamente'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
		console.log(`${error}`);
	})
}

function subeImagen(req,res){
	let idAdministrador = req.params.idAdministrador;
	let foto = req.file;
	CONN('administrador').where('idAdministrador',idAdministrador).update('imagenAdministrador',req.file.filename)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizo la foto'})
		}else{
			CONN('administrador').select('imagenAdministrador').where('idAdministrador',idAdministrador)
			.then(image=>{
				if (!image) {
					res.status(500).send({resp:'Error',message:'error al devolver foto'})
				}
				else{
					res.status(200).send({image:image[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

var getImageFile = (req,res)=>{
	var imagenFile = req.params.imagenAdministrador;
	var path_file = `./imgs/administrador/${imagenFile}`;
	// var path_file = `./imgs/Persona/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la Imagen'});
		}
	}); 
}

function getAdministradores(req,res){
	CONN('Administrador').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron administradores'});
		}else{
			res.status(200).send({
				resp:'Administradores',
				admin:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

module.exports = {
	registraAdministrador,
	actualizaAdministrador,
	loginAdministrador,
	getAdministradores,
	subeImagen,
	getImageFile
}