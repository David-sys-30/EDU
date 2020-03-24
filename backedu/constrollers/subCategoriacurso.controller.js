'use strict'

let subCategoriaCurso = require('../models/subCategoriacurso.model');
const CONN = require('./connection.controller');

function registraSubcategoria (req,res){
	let subCategoria = new subCategoriaCurso(req.body.idCategoriacurso_Subcategoriacurso,
		req.body.nombreSubcategoriacurso);
	CONN('subcategoriacurso').select().where('nombreSubcategoriacurso', req.body.nombreSubcategoriacurso)
	.then(result=>{
		if (result.length > 0) {
			res.status(200).send({resp:'Error 1',message:'Esta Sub Categoria ya esta registrada'});
		}else{
			CONN('subcategoriacurso').insert(subCategoria).then(idSubcategoria=>{
				res.status(200).send({resp:'Exito',subCategoria:idSubcategoria,message:'Sub Categoria registrada con exito'});
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

function obtenerSubCategorias (req,res){
	let idCategoria = req.params.idCategoria;
	CONN('subcategoriacurso').select().where('idCategoriacurso_Subcategoriacurso', idCategoria).then(subCategoria=>{
		if (!subCategoria) {
			res.status(404).send({resp:'Error 1',message:'No hay Sub Categorias registradas'});
		}else{
			res.status(200).send({resp:'Exito',subCategoria:subCategoria});
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizaSubcategoria (req,res){
	let idSubcategoria = req.params.idSubcategoriacurso;
	let subCategoria = new subCategoriaCurso(req.body.idCategoriacurso_Subcategoriacurso,
		req.body.nombreSubcategoriacurso);
	CONN('subcategoriacurso').update(subCategoria).where('idSubcategoriacurso',idSubcategoria).then(result=>{
		CONN('subcategoriacurso').select().where('idSubcategoriacurso',idSubcategoria).then(subcategoria=>{
			res.status(200).send({resp:'Exito',subcategoria:subCategoria,message:'Sub Categoria actualizada con exito'});
		}).catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

module.exports = {
	registraSubcategoria,
	obtenerSubCategorias,
	actualizaSubcategoria
}