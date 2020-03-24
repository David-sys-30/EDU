'use strict'

let Grupo = require('../models/grupo.model');
const CONN = require('./connection.controller');

function obtenerGrupos(req,res){
	CONN('grupo').select('*').then(grupos=>{
		if (!grupos) {
			res.status(404).send({resp:'Error',message:'No se encontraron Grupos'})	
		}else{
			res.status(200).send({resp:'Exito',grupos:grupos})
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function obtenerGrupo(req, res){
	let idGrupo = req.params.idGrupo;
	CONN('grupo').select('*').where('idGrupo',idGrupo).then(grupos=>{
		if (!grupos) {
			res.status(404).send({resp:'Error',message:'No se encontraron Grupos'})	
		}else{
			res.status(200).send({resp:'Exito',grupos:grupos})
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function obtenerUsuarios(req,res){
	let idGrupo = req.params.idGrupo;
	CONN('grupousuario')
	.join('usuario', 'grupousuario.usuario_idUsuario', '=', 'usuario.idUsuario')
	.select('idUsuario','nombreUsuario', 'apellidopaternoUsuario', 'apellidomaternoUsuario').where('grupo_idGrupo', idGrupo).andWhere('statusGrupousuario', 1)
	.then(users=>{
		if (!users) {
			res.status(404).send({resp:'Error',message:'No se encontraron Usuarios'})	
		}else{
			res.status(200).send({resp:'Exito',Usuarios:users})
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizaGrupo(req,res){
	let idGrupo = req.params.idGrupo;
	let grupo = new Grupo(req.body.nombreGrupo);
	CONN('grupo').where('idGrupo',idGrupo).update(grupo).then(result=>{
		if (!result) {
			res.status(404).send({resp:'Error', message:'No se encontró grupo para actualizar'})
		}else{
			CONN('grupo').select().where('idGrupo',idGrupo).then(grupo=>{
				if (!grupo) {
					res.status(404).send({resp:'Error',message:'No se pueden obtener los datos del grupo actualizado'});
				}else{
					res.status(200).send({resp:'Exito',grupo:grupo,message:'Grupo actualizado correctamente'});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	})
}

function registraGrupo(req,res){
	let grupo = new Grupo(req.body.nombreGrupo,
		req.body.idPersona);
	console.log(grupo);
	CONN('grupo').select().where('nombreGrupo', req.body.nombreGrupo).then(result=>{
		if (result.length > 0) {
			res.status(200).send({resp:'Error',message:'Este Grupo ya existe'})
		}else{
			CONN('grupo').insert(grupo).then(idGrupo=>{
				if (!idGrupo) {
					res.status(500).send({resp:'Error',message:'No se pudo insertar Grupo'})
				}else{
					res.status(200).send({resp:'Exito', id:idGrupo[0], message:'Grupo registrado con exito'});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function agregarUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    let idGrupo = req.params.idGrupo;
    CONN('grupousuario').select().where('usuario_idUsuario', idUsuario).andWhere('grupo_idGrupo', idGrupo)
        .then(row => {
            if (row.length > 0) {
                CONN('grupousuario').where('usuario_idUsuario', idUsuario).andWhere('grupo_idGrupo', idGrupo)
                .update('statusGrupousuario', 1).then(result => {
                    if (!result) {
                            res.status(500).send({ resp: 'Error', error: 'No se actualizó correctamente' })
                    } else {
                        res.status(200).send({ resp: 'Exito', message: 'Tabla actualizado correctamente'});
                    }
                }).catch(error => {
                    res.status(404).send({ resp: 'Error1', error: `${error}` });
                    console.log(`${error}`);
                })
            } else {
                CONN('grupousuario').insert([{usuario_idUsuario: idUsuario, grupo_idGrupo: idGrupo, statusGrupousuario: 1}])
                    .then(resultado => {
                        if (!resultado) {
                            res.status(500).send({ resp: 'Error', error: 'No se insertó correctamente' })
                        } else {
                            res.status(200).send({ resp: 'Exito', message: 'Usuario agregado correctamente'});
                        }
                    }).catch(error => {
                        res.status(404).send({ resp: 'Error', error: `${error}` });
                        console.log(`${error}`);
                    })
            }
        })
}

function removerUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    let idGrupo = req.params.idGrupo;
    CONN('grupousuario').where('usuario_idUsuario', idUsuario).andWhere('grupo_idGrupo', idGrupo)
    .update('statusGrupousuario', 0).then(result => {
    	if (!result) {
    		res.status(500).send({ resp: 'Error', error: 'No se actualizó correctamente' })
    	} else {
    		res.status(200).send({ resp: 'Exito', message: 'Tabla actualizado correctamente'});
    	}
    }).catch(error => {
    	res.status(404).send({ resp: 'Error1', error: `${error}` });
    	console.log(`${error}`);
    })
}

function obtenerAllUsuarios(req,res){
	CONN('usuario').select('idUsuario','nombreUsuario', 'apellidopaternoUsuario', 'apellidomaternoUsuario').then(grupos=>{
		if (!grupos) {
			res.status(404).send({resp:'Error',message:'No se encontraron Grupos'})	
		}else{
			res.status(200).send({resp:'Exito',users:grupos})
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

module.exports = {
	obtenerGrupos,
	obtenerGrupo,
	actualizaGrupo,
	registraGrupo,
	obtenerUsuarios,
	agregarUsuario,
	removerUsuario,
	obtenerAllUsuarios
}