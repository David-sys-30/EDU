'use strict'

const CONN = require('./connection.controller');

function getRol(req,res){
	CONN('rol')
	.select()
	.then(roles=>{
		res.status(200).send({roles:roles})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function registraPerfil(req,res){
	let nombrePerfil = req.body.nombrePerfil;
	let roles = req.body.roles;
	let rolPerfil = [];
	
	CONN('perfil').insert({nombrePerfil:nombrePerfil})
	.then(response=>{
		let idPerfil = response[0];
		roles.forEach(function(element){
			rolPerfil.push({
				idRol_RolPerfil:element.idRol, 
				idPerfil_RolPerfil:idPerfil
			})
		})
		CONN('RolPerfil').insert(rolPerfil)
		.then(result=>{
			res.status(200).send({resp:'Exito'});
		})
		.catch(error=>{
			res.status(500).send({resp:'error',error:`${error}`});
		})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function modificaPerfil(req,res){
	let idPerfil = req.params.idPerfil;
	let roles = req.body.roles;
	let rolPerfil = [];
	CONN('perfil').where('idPerfil',idPerfil)
	.update({nombrePerfil:req.body.perfil.nombrePerfil})
	.then(response=>{
		if (roles.length > 0) {
			roles.forEach(function(element){
				rolPerfil.push({
					idRol_RolPerfil:element.idRol, 
					idPerfil_RolPerfil:idPerfil
				})
			})
			CONN('rolperfil').insert(rolPerfil)
			.then(result=>{
				res.status(200).send({resp:'Exito1',message:'Exito'});
			})
			.catch(error=>{
				res.status(500).send({resp:'error',error:`${error}`});
			})
		}else{
			res.status(200).send({resp:'Exito2',message:'Exito'})
		}
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function eliminaRol(req,res){
	let idRol = req.params.idRol;
	CONN('rolperfil').where('idRolPerfil',idRol)
	.del().then(result=>{
		res.status(200).send({resp:'Exito',message:'Exito al eliminar el Rol'})	
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function getPerfiles(req,res){
	CONN('rolperfil')
	.join('perfil', 'rolperfil.idPerfil_RolPerfil', '=', 'perfil.idPerfil')
	.select('*')
	.groupBy('rolperfil.idPerfil_RolPerfil')
	.then(perfiles=>{
		res.status(200).send({perfiles:perfiles})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function getPerfil(req,res){
	let idPerfil = req.params.idPerfil;
	CONN('rolperfil')
	.join('perfil', 'rolperfil.idPerfil_RolPerfil', '=', 'perfil.idPerfil')
	.join('rol', 'rolperfil.idRol_RolPerfil', '=', 'Rol.idRol')
	.where('perfil.idPerfil', idPerfil)
	.select('*')
	.then(perfil=>{
		res.status(200).send({perfil:perfil, 
			nombrePerfil:perfil[0].nombrePerfil})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function darBajaPerfil(req, res){
    let idPerfil = req.params.idPerfil;    
    CONN('perfil')
        .update('statusPerfil', 0)
        .where('idPerfil', idPerfil)
        .then(result => {
            res.status(200).send({ resp: 'Exito', perfil: "Perfil dada de baja" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function darAltaPerfil(req, res){
    let idPerfil = req.params.idPerfil;    
    CONN('perfil')
        .update('statusPerfil', 1)
        .where('idPerfil', idPerfil)
        .then(result => {
            res.status(200).send({ resp: 'Exito', perfil: "Perfil dada de alta" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

module.exports = {
	getRol,
	registraPerfil,
	getPerfiles,
	getPerfil,
	modificaPerfil,
	eliminaRol,
	darBajaPerfil,
	darAltaPerfil
}