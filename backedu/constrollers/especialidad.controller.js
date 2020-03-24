'use strict'

let Especialidad = require('../models/catalogoEspecialidad.model');
const CONN = require('./connection.controller');

function insertaEspecialidad(req,res){
	let especialidad = new Especialidad(req.body.descripcionCatalogoespecialidad);
	CONN('catalogoespecialidad').insert(especialidad)
	.then(result=>{
		res.status(200).send({resp:'Exito',message:'Se inserto correctamente la especialidad'})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`})
	})
}

function modificaEspecialidad(req,res){
	let idEspecialidad = req.params.idCatalogoEspecialidad;
	let especialidad = new Especialidad(req.body.descripcionCatalogoespecialidad);
	console.log(especialidad)
	CONN('catalogoespecialidad')
	.where('idCatalogoEspecialidad', idEspecialidad)
	.update(especialidad)
	.then(result=>{
		res.status(200).send({resp:'Exito', message:'Especialidad Actualizada correctamente'})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function obtenerEspecialidades(req,res){
	CONN('catalogoespecialidad').select()
	.then(result=>{
		res.status(200).send({resp:'Exito', especialidades:result})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function obtenerEspecialidad(req,res){
	let idEspecialidad = req.params.idCatalogoEspecialidad;
	CONN('catalogoespecialidad')
	.where('idCatalogoEspecialidad',idEspecialidad)
	.select()
	.then(result=>{
		res.status(200).send({resp:'Exito',especialidad:result})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

module.exports = {
	insertaEspecialidad,
	modificaEspecialidad,
	obtenerEspecialidades,
	obtenerEspecialidad
}
