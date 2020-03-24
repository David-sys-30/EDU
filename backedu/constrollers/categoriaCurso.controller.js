'use strict'

let categoriaCurso = require('../models/categoriaCurso.model');
const CONN = require('./connection.controller');

function registraCategoria(req,res){
	let categoria = new categoriaCurso(req.body.nombreCategoriacurso,1);
	CONN('categoriacurso').select().where('nombreCategoriacurso', req.body.nombreCategoriacurso).then(result=>{
		if (result.length > 0) {
			res.status(200).send({resp:'Error 1',message:'Esta Categoria ya existe'})
		}else{
			CONN('categoriacurso').insert(categoria).then(idCategoria=>{
				if (!idCategoria) {
					res.status(500).send({resp:'Error 2',message:'No se pudo insertar la categoria'})
				}else{
					res.status(200).send({resp:'Exito',categoria:idCategoria,message:'Categoria registrada con exito'});
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

function obtenerCategorias(req,res){
	CONN('categoriacurso').select('*').then(categorias=>{
		if (!categorias) {
			res.status(404).send({resp:'Error 1',message:'No se encontraron Categorias'})	
		}else{
			res.status(200).send({resp:'Exito',categorias:categorias})
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizaCategoria(req,res){
	let idCategoria = req.params.idCategoria;
	let categoria = new categoriaCurso(req.body.nombreCategoria,1);
	CONN('categoriacurso').where('idCategoriacurso',idCategoria).update(categoria).then(result=>{
		if (!result) {
			res.status(404).send({resp:'Error 2', message:'No se encontro categoria para actualizar'})
		}else{
			console.log(result)
			CONN('categoriacurso').select().where('idCategoriacurso',idCategoria).then(categoria=>{
				if (!categoria) {
					res.status(404).send({resp:'Error 3',message:'No se pueden obtener los datos de la categoria actualizada'});
				}else{
					res.status(200).send({resp:'Exito',categoria:categoria,message:'Categoria Actualizada correctamente'});
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

function obtenerCategoria(req,res){
	let idCategoria = req.params.idCategoriacurso;
	CONN('categoriacurso').select().where('idCategoriacurso', idCategoria).then(categoria=>{
		if (!categoria) {
			res.status(404).send({resp:'Error 1',message:'No se encontro la Categoria'});
		}else{
			res.status(200).send({resp:'Exito',categoria:categoria[0]});
		}
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	})
}

function bajaCategoria(req,res){
		let idCategoria = req.params.idCategoria;
	CONN('categoriacurso').where('idCategoriacurso',idCategoria).update('statusCategoriacurso',0).then(result=>{
		if (!result) {
			res.status(404).send({resp:'Error 2', message:'No se encontro categoria para actualizar'})
		}else{
			console.log(result)
			CONN('categoriacurso').select().where('idCategoriacurso',idCategoria).then(categoria=>{
				if (!categoria) {
					res.status(404).send({resp:'Error 3',message:'No se pueden obtener los datos de la categoria actualizada'});
				}else{
					res.status(200).send({resp:'Exito',categoria:categoria,message:'Categoria Actualizada correctamente'});
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

function altaCategoria(req,res){
		let idCategoria = req.params.idCategoria;
	CONN('categoriacurso').where('idCategoriacurso',idCategoria).update('statusCategoriacurso',1).then(result=>{
		if (!result) {
			res.status(404).send({resp:'Error 2', message:'No se encontro categoria para actualizar'})
		}else{
			console.log(result)
			CONN('categoriacurso').select().where('idCategoriacurso',idCategoria).then(categoria=>{
				if (!categoria) {
					res.status(404).send({resp:'Error 3',message:'No se pueden obtener los datos de la categoria actualizada'});
				}else{
					res.status(200).send({resp:'Exito',categoria:categoria,message:'Categoria Actualizada correctamente'});
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



module.exports = {
	registraCategoria,
	obtenerCategorias,
	actualizaCategoria,
	obtenerCategoria,
	bajaCategoria,
	altaCategoria
}