'use strict'

let temaModel = require('../models/tema.model');
let califTemaModel = require('../models/califTema.model');
let evaluacionModel = require('../models/evaluacionTema.model');
const CONN = require('./connection.controller');

function registraTema(req,res){
	CONN('tema').max('numeroTema as numero')
	.where('idModulo_Tema',req.body.idModulo_Tema)
	.then(
		result=>{
			let numero = result[0]['numero']+1
			let tema = new temaModel(req.body.nombreTema,
				req.body.idModulo_Tema,
				req.body.descripcionTema,
				numero,
				req.body.statusTema);
			CONN('tema').insert(tema).then(
				result=>{
					res.status(200).send({resp:'Exito',message:'Exito al registrar Tema'});
				})
			.catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}
		)
	.catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function obtenerTemas(req,res){
	let idModulo = req.params.idModulo;
	let contador = 0;
	let temas = [];
	let evalu = 'evalu';
	CONN('tema').select().where('idModulo_Tema',idModulo)
	.orderBy('numeroTema')
	.then(result=>{
		result.forEach(function(element, index, array){
			CONN('evaluacioncontenido')
			.join('contenido', 'evaluacioncontenido.idContenido_Evaluacioncontenido', '=', 'contenido.idContenido')
			.join('tema', 'Contenido.idTema_Contenido', '=', 'tema.idTema')
			// .join('Modulo', 'Tema.idModulo_Tema', '=', 'Modulo.idModulo')
			.where('tema.idTema',element.idTema)
			.sum('evaluacioncontenido.porcentajeEvaluacioncontenido as '+evalu)
			.groupBy('tema.idTema')
			.then(
				evaluacionContenido=>{
					CONN('evaluaciontema')
					.where('idTema_Evaluaciontema', element.idTema)
					.select()
					.then(evaluacionTema=>{
						if (evaluacionTema.length > 0) {
							if (evaluacionContenido.length > 0) {
								if (evaluacionContenido[0].evalu == 0) {
									temas.push({
										idTema:element.idTema,
										nombreTema:element.nombreTema,
										idModulo_Tema:element.idModulo_Tema,
										descripcionTema:element.descripcionTema,
										numeroTema:element.numeroTema,
										evaluacionContenido:'No tiene Evaluacion',
										idEvaluaciontema:evaluacionTema[0].idEvaluaciontema,
										evaluacionEvaluaciontema:evaluacionTema[0].evaluacionEvaluaciontema
									});
									contador++;
									if (contador === array.length) {
										res.status(200).send({resp:'Exito',tema:temas})
									}
								}else{
									temas.push({
										idTema:element.idTema,
										nombreTema:element.nombreTema,
										idModulo_Tema:element.idModulo_Tema,
										descripcionTema:element.descripcionTema,
										numeroTema:element.numeroTema,
										evaluacionContenido:evaluacionContenido[0].evalu,
										idEvaluaciontema:evaluacionTema[0].idEvaluaciontema,
										evaluacionEvaluaciontema:evaluacionTema[0].evaluacionEvaluaciontema
									});
									contador++;
									if (contador === array.length) {
										res.status(200).send({resp:'Exito',tema:temas})
									}
								}
							}
							else{
								temas.push({
									idTema:element.idTema,
									nombreTema:element.nombreTema,
									idModulo_Tema:element.idModulo_Tema,
									descripcionTema:element.descripcionTema,
									numeroTema:element.numeroTema,
									evaluacionContenido:'No tiene Evaluacion',
									idEvaluaciontema:evaluacionTema[0].idEvaluaciontema,
									evaluacionEvaluaciontema:evaluacionTema[0].evaluacionEvaluaciontema
								});
								contador++;
								if (contador === array.length) {
									res.status(200).send({resp:'Exito',tema:temas})
								}
							}
						}
						else{
							if (evaluacionContenido.length > 0) {
								if (evaluacionContenido[0].evalu == 0) {
									temas.push({
										idTema:element.idTema,
										nombreTema:element.nombreTema,
										idModulo_Tema:element.idModulo_Tema,
										descripcionTema:element.descripcionTema,
										numeroTema:element.numeroTema,
										evaluacionContenido:'No tiene Evaluacion',
										evaluacionTema:'No tiene Evaluacion'
									});
									contador++;
									if (contador === array.length) {
										res.status(200).send({resp:'Exito',tema:temas})
									}
								}else{
									temas.push({
										idTema:element.idTema,
										nombreTema:element.nombreTema,
										idModulo_Tema:element.idModulo_Tema,
										descripcionTema:element.descripcionTema,
										numeroTema:element.numeroTema,
										evaluacionContenido:evaluacionContenido[0].evalu,
										evaluacionTema:'No tiene Evaluacion'
									});
									contador++;
									if (contador === array.length) {
										res.status(200).send({resp:'Exito',tema:temas})
									}
								}
							}
							else{
								temas.push({
									idTema:element.idTema,
									nombreTema:element.nombreTema,
									idModulo_Tema:element.idModulo_Tema,
									descripcionTema:element.descripcionTema,
									numeroTema:element.numeroTema,
									evaluacionContenido:'No tiene Evaluacion',
									evaluacionTema:'No tiene Evaluacion'
								});
								contador++;
								if (contador === array.length) {
									res.status(200).send({resp:'Exito',tema:temas})
								}
							}
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
		// res.status(200).send({resp:'Exito',tema:result})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizaNumeroTema(req,res){
	req.body.forEach(function(element){
		CONN('tema').update('numeroTema',element.numeroTema)
		.where('idTema',element.idTema)
		.then()
		.catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
	})
	res.send({message:'Exito'});
}

function actualizaTema(req,res){
	let idTema = req.body.idTema;
	let tema = new temaModel(req.body.nombreTema,
		req.body.idModulo_Tema,
		req.body.descripcionTema,
		req.body.numeroTema,
		req.body.statusTema);
	CONN('tema').update(tema).where('idTema',idTema)
	.then(result=>{
		res.status(200).send({res:'Exito',message:'tema Actualizado'})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}


function agregaEvaluacion(req,res){
	let idModulo = req.params.idModulo;
	let evaluacion = new evaluacionModel(req.body.evaluacion, req.body.id);
	CONN('evaluaciontema')
	.join('tema', 'evaluaciontema.idTema_Evaluaciontema', '=', 'tema.idTema')
	.sum('evaluacionEvaluaciontema as suma')
	.where('tema.idModulo_Tema',idModulo)
	.groupBy('tema.idModulo_Tema')
	.then(result=>{
		if (result.length > 0) {
			let suma = result[0].suma + Number(req.body.evaluacion)
			if (suma > 100) {
				res.status(200).send({resp:false, message:'No fue posible insertar esta evaluacion ya que pasa del 100%'})
			}
			else{
				CONN('evaluaciontema').insert(evaluacion).then(result=>{
					res.status(200).send({resp:true, message:'Evaluación agregada correctamente'})
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
			}
		}
		else{
			CONN('evaluaciontema').insert(evaluacion).then(result=>{
				res.status(200).send({resp:true, message:'Evaluación agregada correctamente'})
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

function modificaEvaluacion(req,res){
	let idModulo = req.params.idModulo;
	let idEvaluaciontema = req.params.idEvaluacion;
	let evaluacion = new evaluacionModel(req.body.evaluacion, req.body.id);
	CONN('evaluaciontema')
	.select('evaluacionEvaluaciontema')
	.where('idEvaluaciontema', idEvaluaciontema)
	.then(evaluacionTema=>{	
		CONN('evaluaciontema')
		.join('tema', 'evaluaciontema.idTema_Evaluaciontema', '=', 'tema.idTema')
		.sum('evaluacionEvaluaciontema as suma')
		.where('tema.idModulo_Tema',idModulo)
		.groupBy('tema.idModulo_Tema')
		.then(result=>{			
			let suma = result[0].suma - evaluacionTema[0].evaluacionEvaluaciontema + Number(req.body.evaluacion)
			if (suma > 100) {
				res.status(200).send({resp:false, message:'No fue posible modificar esta evaluacion ya que pasa del 100%'})
			}
			else{
				CONN('evaluaciontema').update(evaluacion)
				.where('idEvaluaciontema', idEvaluaciontema)
				.then(result=>{
					res.status(200).send({resp:true, message:'Evaluación modificada correctamente'});
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
			}
		})
		.catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function sumaEvaluacion(req,res){
	let idModulo = req.params.idModulo;
	CONN('evaluaciontema')
	.join('tema', 'evaluaciontema.idTema_Evaluaciontema', '=', 'tema.idTema')
	.sum('evaluacionEvaluaciontema as suma')
	.where('tema.idModulo_Tema',idModulo)
	.groupBy('tema.idModulo_Tema')
	.then(result=>{
		if (result.length > 0) {
			res.status(200).send({suma:result});
		}
		else{
			res.status(200).send({suma:false});
		}		
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function registraCalifTema(req,res){
	let califTema = new califTemaModel(req.body.idEvaluacionTema_CalifTema, req.body.califTema); 
	CONN("califtema").select().where('idEvaluacionTema_CalifTema',req.body.idEvaluacionTema_CalifTema).then(response=>{
		if(response == ""){
			CONN("califtema").insert(califTema).then(response=>{
		res.status(200).send({resp:true, message:'Calificación registrada correctamente'})
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
		}else{
			
			CONN("califtema").where('idEvaluacionTema_CalifTema',req.body.idEvaluacionTema_CalifTema).update({califTema:req.body.califTema}).then(response=>{
			res.status(200).send({resp:true, message:'Calificación actualizada correctamente'})
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
		}
	})
	
}

function getCalifTema(req,res){
	let contador = 0;
	let temas = [];
	let idTema = req.params.idTema
	CONN("evaluaciontema").select().where('idTema_Evaluaciontema', idTema).then(response=>{
		if(response){
			console.log(response[0].idEvaluaciontema);
				CONN('califtema').select().where('idEvaluacionTema_CalifTema',response[0].idEvaluaciontema).then(response2=>{
					CONN('tema').select().where('idTema', response[0].idTema_Evaluaciontema).then(response3=>{
						temas.push({
										evalTema:response,
										califTema:response2,
										tema:response3
									});
						res.status(200).send({resp:'Exito',temas})
					})
										
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

function getIdEvalTema(req,res){
	let idTema = req.params.idTema
	CONN("evaluaciontema").select().where('idTema_Evaluaciontema', idTema).then(response=>{
		if(response){
			res.status(200).send({resp:'Exito',idEvalTema:response[0].idEvaluaciontema})
		}

	}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
}
module.exports = {
	registraTema,
	obtenerTemas,
	actualizaNumeroTema,
	actualizaTema,
	agregaEvaluacion,
	modificaEvaluacion,
	sumaEvaluacion,
	registraCalifTema,
	getCalifTema,
	getIdEvalTema
}