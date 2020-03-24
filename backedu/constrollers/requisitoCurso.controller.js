'use strict'

let requisitoModel = require('../models/requisito.model');
let pruebasModel = require('../models/pruebas.model');
const CONN = require('./connection.controller');

function registraRequisito(req,res){
	let requisito = new requisitoModel(req.body.descripcionRequisito,req.body.idSubcategoriacurso_Requisito);
	CONN('requisito').insert(requisito).then(
		requisito=>{
			res.status(200).send({resp:'Exito',requisito:requisito,message:'Requisito insertado Correctamente'});
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizaRequisito(req,res){
	let idRequisito = req.params.idRequisito;
	let requisito = new requisitoModel(req.body.descripcionRequisito,req.body.idSubcategoriacurso_Requisito);
	CONN('requisito').where('idRequisito', idRequisito).update(requisito).then(
		result=>{
			res.status(200).send({resp:'Exito',resultado:result,message:'Requisito actualizado correctamente'});
		}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function obtenerRequisitos(req,res){
	CONN('requisito').select().then(
		requisitos=>{
			res.status(200).send({resp:'Exito',requisitos:requisitos});
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function joinRequisitos(req,res){
	CONN('requisito')
	.join('subcategoriacurso', 'requisito.idSubcategoriacurso_Requisito', '=', 'subcategoriacurso.idSubcategoriacurso')
	.join('categoriacurso', 'subcategoriacurso.idCategoriacurso_Subcategoriacurso', '=', 'categoriacurso.idCategoriacurso')
	.select('requisito.idRequisito',
			'requisito.idSubcategoriacurso_Requisito', 
			'subcategoriacurso.nombreSubcategoriacurso',
			'subcategoriacurso.idCategoriacurso_Subcategoriacurso',
			'categoriacurso.nombreCategoriacurso',
			'requisito.descripcionRequisito')
	.then(result=>{
		res.status(200).send({resp:'Exito',requisitos:result})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function getRequisito(req,res){
	let idSubcategoria = req.params.idSubcategoria;
	CONN('requisito')
	.where('idSubcategoriacurso_Requisito',idSubcategoria)
	.join('subcategoriacurso', 'requisito.idSubcategoriacurso_Requisito', '=', 'subcategoriacurso.idSubcategoriacurso')
	.join('categoriacurso', 'subcategoriacurso.idCategoriacurso_Subcategoriacurso', '=', 'categoriacurso.idCategoriacurso')
	.select('requisito.idRequisito',
			'requisito.idSubcategoriacurso_Requisito', 
			'subcategoriacurso.nombreSubcategoriacurso',
			'subcategoriacurso.idCategoriacurso_Subcategoriacurso',
			'categoriacurso.nombreCategoriacurso',
			'requisito.descripcionRequisito')
	.then(result=>{
		if (!result) {
				res.status(200).send({resp:'Exito',message:'No hay requisitos aun'})
			}else{
				res.status(200).send({resp:'Exito',requisito:result})
			}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function pruebas(req,res){
	let prueba = req.body.uno;
	let pruebas = [];

	prueba.forEach(function(element) {
	  pruebas.push({prueba:element.prueba, otro:'prue'})
	});
	// console.log(pruebas);
	
	CONN('prueba').insert(pruebas).then(result=>{
		// res.status(200).send({result:result});
		CONN('Prueba').select().where('idPrueba',result).then(
			prueba=>{
				res.status(200).send({prueba:prueba});
			})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}


module.exports = {
	registraRequisito,
	actualizaRequisito,
	obtenerRequisitos,
	joinRequisitos,
	getRequisito,
	pruebas
}