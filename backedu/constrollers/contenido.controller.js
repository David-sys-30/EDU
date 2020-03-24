'use strict'

let contenidoModel = require('../models/contenido.model');
let CalificacionMaterialModel = require('../models/calificacion.model.js');
const CONN = require('./connection.controller');
let path = require('path');
var fs = require('fs');

function registraContenido(req,res){
	let idCategoria;
	let formato;
	CONN('categoriacontenido').select().where('nombreCategoriacontenido',req.body.idCategoriacontenido_Contenido)
	.then(
		idCategoria=>{
			idCategoria = idCategoria[0].idCategoriacontenido;
			CONN('formatodocumento').select().where('nombreFormatodocumento',req.body.idFormatodocumento_Contenido)
			.then(
				idFormato=>{
					if (idFormato.length <= 0) {
						CONN('formatodocumento').insert({nombreFormatodocumento:req.body.idFormatodocumento_Contenido})
						.then(result=>{
							formato = result[0];
							console.log(formato);
							let contenido = new contenidoModel(idCategoria,
								req.body.nombreContenido,
								formato,
								req.body.rutaContenido,
								req.body.idTema_Contenido,
								req.body.statusContenido);
							CONN('Contenido').insert(contenido)
							.then(result=>{
								res.status(200).send({resp:'Exito', contenido:result})
							})
							.catch(error=>{
								res.status(404).send({resp:'Error',error:`${error}`});
							})
						})
						.catch(error=>{
							res.status(404).send({resp:'Error',error:`${error}`});
						})
					}else{
						formato = idFormato[0].idFormatodocumento;
						console.log(formato);
						let contenido = new contenidoModel(idCategoria,
							req.body.nombreContenido,
							formato,
							req.body.rutaContenido,
							req.body.idTema_Contenido,
							req.body.statusContenido);
						CONN('Contenido').insert(contenido)
						.then(result=>{
							res.status(200).send({resp:'Exito', contenido:result})
						})
						.catch(error=>{
							res.status(404).send({resp:'Error',error:`${error}`});
						})
					}
				}
				)
			.catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
		)
	.catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function registraTareas(req,res){
	let idCategoria;
	let formato;
	CONN('categoriacontenido').select().where('nombreCategoriacontenido',req.body.contenido.idCategoriacontenido_Contenido)
	.then(
		idCategoria=>{
			idCategoria = idCategoria[0].idCategoriacontenido;
			CONN('formatodocumento').select().where('nombreFormatodocumento',req.body.contenido.idFormatodocumento_Contenido)
			.then(
				idFormato=>{
					if (idFormato.length <= 0) {
						CONN('formatodocumento').insert({nombreFormatodocumento:req.body.contenido.idFormatodocumento_Contenido})
						.then(result=>{
							formato = result[0];
							// console.log(formato);
							let contenido = new contenidoModel(idCategoria,
								req.body.contenido.nombreContenido,
								formato,
								req.body.contenido.rutaContenido,
								req.body.contenido.idTema_Contenido,
								req.body.contenido.statusContenido);
							CONN('evaluacioncontenido')
							.join('contenido', 'evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
							.join('tema', 'contenido.idTema_Contenido', '=', 'tema.idTema')
							.where('tema.idTema',req.body.contenido.idTema_Contenido)
							.sum('evaluacioncontenido.porcentajeEvaluacioncontenido as eval')
							.then(
								result=>{
									let resultado = Number(result[0].eval + req.body.evaluacion);
									if (resultado > 100) {
										res.status(200).send({resp:false, message:'El porcentaje sobrepasa el 100%, No se pudo Insertar'})
									}else{
										CONN('Contenido').insert(contenido)
										.then(idContenido=>{
											CONN('evaluacioncontenido').insert({idContenido_Evaluacioncontenido:idContenido,porcentajeEvaluacioncontenido:req.body.evaluacion})
											.then(result=>{
												res.status(200).send({resp:true, contenido:idContenido})
											})
											.catch(error=>{
												res.status(404).send({resp:'Error',error:`${error}`});
											})
										})
										.catch(error=>{
											res.status(404).send({resp:'Error',error:`${error}`});
										})
									}
								})
							.catch(error=>{
								res.status(404).send({resp:'Error',error:`${error}`});
							})
						})
						.catch(error=>{
							res.status(404).send({resp:'Error',error:`${error}`});
						})
					}else{
						formato = idFormato[0].idFormatodocumento;
						// console.log(formato);
						let contenido = new contenidoModel(idCategoria,
							req.body.contenido.nombreContenido,
							formato,
							req.body.contenido.rutaContenido,
							req.body.contenido.idTema_Contenido,
							req.body.contenido.statusContenido);
						let idTema = req.params.idTema;
						CONN('evaluacioncontenido')
						.join('contenido', 'evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
						.join('tema', 'contenido.idTema_Contenido', '=', 'tema.idTema')
						.where('tema.idTema',req.body.contenido.idTema_Contenido)
						.sum('evaluacioncontenido.porcentajeEvaluacioncontenido as eval')
						.then(
							result=>{
								let resultado = Number(result[0].eval + req.body.evaluacion);
								if (resultado > 100) {
									res.status(200).send({resp:false, message:'El porcentaje sobrepasa el 100%, No se pudo Insertar'})
								}else{
									CONN('contenido').insert(contenido)
									.then(idContenido=>{
										CONN('evaluacioncontenido').insert({idContenido_Evaluacioncontenido:idContenido,porcentajeEvaluacioncontenido:req.body.evaluacion})
										.then(result=>{
											res.status(200).send({resp:true, contenido:idContenido})
										})
										.catch(error=>{
											res.status(404).send({resp:'Error',error:`${error}`});
										})
									})
									.catch(error=>{
										res.status(404).send({resp:'Error',error:`${error}`});
									})
								}
							})
						.catch(error=>{
							res.status(404).send({resp:'Error',error:`${error}`});
						})
					}
				}
				)
			.catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
		)
	.catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function actualizaDocumento(req,res){
	let idContenido = req.params.idContenido;
	let idCategoria;
	let formato;
	CONN('categoriacontenido')
	.select()
	.where('nombreCategoriacontenido', req.body.idCategoriacontenido_Contenido)
	.orWhere('idCategoriacontenido', req.body.idCategoriacontenido_Contenido)
	.then(idCategoria =>{
		idCategoria = idCategoria[0].idCategoriacontenido;
		CONN('formatodocumento').select().where('idFormatodocumento',req.body.idFormatodocumento_Contenido)
		.orWhere('nombreFormatodocumento', req.body.idFormatodocumento_Contenido)
		.then(idFormato=>{
			if (idFormato.length <= 0) {
				CONN('formatodocumento').insert({nombreFormatodocumento:req.body.idFormatodocumento_Contenido})
				.then(result=>{
					formato = result[0];
					console.log(formato);
					let contenido = new contenidoModel(idCategoria,
						req.body.nombreContenido,
						formato,
						req.body.rutaContenido,
						req.body.idTema_Contenido,
						req.body.statusContenido);
					CONN('contenido').update(contenido).where('idContenido', idContenido)
					.then(contenidoActualizado=>{
						res.status(200).send({resp:'Exito', contenido:idContenido})
					})
					.catch(error=>{
						res.status(404).send({resp:'Error',error:`${error}`});
					})
				})
				.catch(error=>{
					res.status(404).send({resp:'Error',error:`${error}`});
				})
			}else{
				formato = idFormato[0].idFormatodocumento;
				console.log(formato);
				let contenido = new contenidoModel(idCategoria,
					req.body.nombreContenido,
					formato,
					req.body.rutaContenido,
					req.body.idTema_Contenido,
					req.body.statusContenido);
				CONN('contenido').update(contenido).where('idContenido', idContenido)
				.then(contenidoActualizado=>{
					res.status(200).send({resp:'Exito', contenido:idContenido})
				})
				.catch(error=>{
					res.status(404).send({resp:'Error',error:`${error}`});
				})
			}
		}).catch(error=>{
			res.status(404).send({resp:'Error',error:`${error}`});
		})
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function actualizaTarea(req,res){
	let idContenido = req.params.idContenido;
	let idCategoria;
	let formato;
	CONN('categoriacontenido')
	.select()
	.where('nombreCategoriacontenido', req.body.contenido.idCategoriacontenido_Contenido)
	.orWhere('idCategoriacontenido', req.body.contenido.idCategoriacontenido_Contenido)
	.then(idCategoria =>{
		idCategoria = idCategoria[0].idCategoriacontenido;
		CONN('formatodocumento').select().where('idFormatodocumento',req.body.contenido.idFormatodocumento_Contenido)
		.orWhere('nombreFormatodocumento', req.body.contenido.idFormatodocumento_Contenido)
		.then(idFormato=>{
			if (idFormato.length <= 0) {
				CONN('formatodocumento').insert({nombreFormatodocumento:req.body.contenido.idFormatodocumento_Contenido})
				.then(result=>{
					formato = result[0];
					// console.log(formato);
					let contenido = new contenidoModel(idCategoria,
						req.body.contenido.nombreContenido,
						formato,
						req.body.contenido.rutaContenido,
						req.body.contenido.idTema_Contenido,
						req.body.contenido.statusContenido);
					CONN('contenido').update(contenido).where('idContenido', idContenido)
					.then(contenidoActualizado=>{
						CONN('evaluacioncontenido').select('porcentajeEvaluacioncontenido')
						.where('idEvaluacioncontenido', req.body.evaluacion.idEvaluacioncontenido)
						.then(numero=>{
							CONN('evaluacioncontenido')
							.join('contenido', 'evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
							.join('tema', 'contenido.idTema_Contenido', '=', 'tema.idTema')
							.where('tema.idTema',req.body.contenido.idTema_Contenido)
							.sum('evaluacioncontenido.porcentajeEvaluacioncontenido as eval')
							.then(
								result=>{
									let resultado = Number(result[0].eval - numero[0].porcentajeEvaluacioncontenido + req.body.evaluacion.porcentajeEvaluacioncontenido)
									if (resultado > 100) {
										res.status(200).send({resp:false, message:'El porcentaje sobrepasa el 100%', contenido:idContenido})
									}
									else{
										CONN('evaluacioncontenido')
										.update({idContenido_Evaluacioncontenido:idContenido,porcentajeEvaluacioncontenido:req.body.evaluacion})
										.where('idEvaluacioncontenido', req.body.evaluacion.idEvaluacioncontenido)
										.then(result=>{
											res.status(200).send({resp:true, contenido:idContenido})
										})
										.catch(error=>{
											res.status(404).send({resp:'Error',error:`${error}`});
										})
									}
								})
							.catch(error=>{
								res.status(404).send({resp:'Error',error:`${error}`});
							})
						})
						.catch(error=>{
							res.status(404).send({resp:'Error',error:`${error}`});
						})
					})
					.catch(error=>{
						res.status(404).send({resp:'Error',error:`${error}`});
					})
				})
				.catch(error=>{
					res.status(404).send({resp:'Error',error:`${error}`});
				})
			}else{
				formato = idFormato[0].idFormatodocumento;
				// console.log(formato);
				let contenido = new contenidoModel(idCategoria,
					req.body.contenido.nombreContenido,
					formato,
					req.body.contenido.rutaContenido,
					req.body.contenido.idTema_Contenido,
					req.body.contenido.statusContenido);
				CONN('contenido').update(contenido).where('idContenido', idContenido)
				.then(contenidoActualizado=>{
					CONN('evaluacioncontenido').select('porcentajeEvaluacioncontenido')
					.where('idEvaluacioncontenido', req.body.evaluacion.idEvaluacioncontenido)
					.then(numero=>{
						CONN('evaluacioncontenido')
						.join('contenido', 'evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
						.join('tema', 'contenido.idTema_Contenido', '=', 'tema.idTema')
						.where('tema.idTema',req.body.contenido.idTema_Contenido)
						.sum('evaluacioncontenido.porcentajeEvaluacioncontenido as eval')
						.then(
							result=>{
								let resultado = Number(result[0].eval - numero[0].porcentajeEvaluacioncontenido + req.body.evaluacion.porcentajeEvaluacioncontenido)
								if (resultado > 100) {
									res.status(200).send({resp:false, message:'El porcentaje sobrepasa el 100%', contenido:idContenido})
								}
								else{
									CONN('evaluacioncontenido')
									.update({idContenido_Evaluacioncontenido:idContenido,porcentajeEvaluacioncontenido:req.body.evaluacion})
									.where('idEvaluacioncontenido', req.body.evaluacion.idEvaluacioncontenido)
									.then(result=>{
										res.status(200).send({resp:true, contenido:idContenido})
									})
									.catch(error=>{
										res.status(404).send({resp:'Error',error:`${error}`});
									})
								}
							})
						.catch(error=>{
							res.status(404).send({resp:'Error',error:`${error}`});
						})
					})
					.catch(error=>{
						res.status(404).send({resp:'Error',error:`${error}`});
					})
				})
				.catch(error=>{
					res.status(404).send({resp:'Error',error:`${error}`});
				})
			}
		}).catch(error=>{
			res.status(404).send({resp:'Error',error:`${error}`});
		})
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function obtenerContenido(req,res){
	let idTema = req.params.idTema;
	CONN('contenido').select().where('idTema_Contenido',idTema)
	.then(result=>{
		res.status(200).send({resp:'Exito',contenido:result});
	})
	.catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function getEvaluacion(req,res){
	let idTema = req.params.idTema;
	CONN('evaluacioncontenido')
	.join('contenido', 'evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
	.join('tema', 'contenido.idTema_Contenido', '=', 'tema.idTema')
	.where('tema.idTema',idTema)
	.sum('evaluacioncontenido.porcentajeEvaluacioncontenido as eval')
	.then(
		result=>{
			res.status(200).send({evaluacion:result[0].eval});
			return result[0].eval
			
		})
	.catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function obtenerTareas(req,res){
	let idTema = req.params.idTema;
	CONN('evaluacioncontenido')
	.join('contenido','evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
	.select('contenido.idContenido',
		'contenido.idCategoriacontenido_Contenido',
		'contenido.nombreContenido',
		'contenido.idFormatodocumento_Contenido',
		'contenido.rutaContenido',
		'contenido.idTema_Contenido',
		'contenido.statusContenido',
		'evaluacioncontenido.idEvaluacioncontenido',
		'evaluacioncontenido.porcentajeEvaluacioncontenido')
	.where('contenido.idTema_Contenido',idTema)
	.then(result=>{
		res.status(200).send({resp:'Exito',contenido:result});
	})
	.catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function subeVideo(req,res){
	let idContenido = req.params.idContenido;
	let video = req.file;
	CONN('contenido').where('idContenido',idContenido).update('rutaContenido',req.file.filename)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizo el contenido'})
		}else{
			CONN('contenido').select('rutaContenido').where('idContenido',idContenido)
			.then(video=>{
				if (!video) {
					res.status(500).send({resp:'Error',message:'error al devolver video'})
				}
				else{
					res.status(200).send({video:video[0],message:'Exito al subir video'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

var getVideo = (req,res)=>{
	var videoFile = req.params.rutaContenido;
	var path_file = `./Contenido/videos/${videoFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe el video'});
		}
	}); 
}

function subeDocumento(req,res){
	let idContenido = req.params.idContenido;
	let documento = req.file;
	CONN('contenido').where('idContenido',idContenido).update('rutaContenido',req.file.filename)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizo el contenido'})
		}else{
			CONN('contenido').select('rutaContenido').where('idContenido',idContenido)
			.then(documento=>{
				if (!docuemnto) {
					res.status(500).send({resp:'Error',message:'error al devolver documento'})
				}
				else{
					res.status(200).send({docuemnto:documento[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

var getDocumento = (req,res)=>{
	var documentoFile = req.params.rutaContenido;
	var path_file = `./Contenido/documentos/${documentoFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe el Documento'});
		}
	}); 
}



function obtenerIdEvaluacionContenido(req,res){
	var idContenido = req.params.idContenido
	CONN('evaluacioncontenido')
	.select()
	.where('idContenido_EvaluacionContenido',idContenido)
	.then(idEvaluacioncontenido=>{
			res.status(200).send({resp:'Exito', idEvaluacioncontenido:idEvaluacioncontenido})
		}).catch(error=>{
			res.status(404).send({resp:'Error',error:`${error}`});
	})
}

	function getDocumentos(req,res){
		let itemsProcessed = 0;
		let arrays = [];
		let idUsuario = req.params.idUsuario;
		let idTema = req.params.idTema;
		CONN('usuariopersonacurso')
		.select()
		.where('idUsuario_UsuarioPersonaCurso',idUsuario)
		.then(idUsuarioPersonaCursos=>{
			idUsuarioPersonaCursos.forEach(function(element,index,array){
				CONN('materialevalusuario')
				.where('idUsuarioPersonaCurso_Materialevalusuario',element.idUsuarioPersonaCurso)
				.andWhere('idTema_Material', idTema)
				.then(materialevalusuario=>{ 
					if(materialevalusuario.length != 0){
						arrays.push(materialevalusuario)
					}
					
				itemsProcessed++;
				if(itemsProcessed === array.length) {
					res.status(200).send({resp:'Exito', contenidoeval:arrays})
				}	
					
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				
			})
			})
		})
	}

	function actualizaCalificacionTarea(req,res){
		let idCalTarea = req.body.idMaterialevalusuario;
		let calificacion = new CalificacionMaterialModel (
				
				req.body.calificacionMaterialevalusuario
			);
		CONN('materialevalusuario').update(calificacion)
		.where('idMaterialevalusuario',idCalTarea)
		.then(result=>{
		res.status(200).send({res:'Exito',message:'Calificacion Actualizada',calificacion})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});


	}

	var getDocumentoAlumno = (req,res)=>{
	var documentoFile = req.params.rutaContenido;
	var path_file = `./Contenido/DocsAlumnos/${documentoFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe el Documento'});
		}
	}); 
}

	

module.exports = {
	registraContenido,

	subeVideo,
	getVideo,
	subeDocumento,
	getDocumento,
	obtenerContenido,
	registraTareas,
	obtenerTareas,
	actualizaTarea,
	actualizaDocumento,
	getEvaluacion,
	obtenerIdEvaluacionContenido,
	getDocumentos,
	getDocumentoAlumno,
	actualizaCalificacionTarea
}


