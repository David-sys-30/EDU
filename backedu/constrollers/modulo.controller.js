'use strict'

let moduloModel = require('../models/modulo.model');
let CalifModulo = require('../models/califModulo.model');
let evaluacionModel = require('../models/evaluacionModulo.model');
const CONN = require('./connection.controller');

function registraModulo(req,res){
	CONN('modulo').max('numeroModulo as numero')
	.where('idCurso_Modulo',req.body.idCurso_Modulo)
	.then(
		result=>{
			let numero = result[0]['numero']+1
			let modulo = new moduloModel(req.body.nombreModulo,
				numero,
				req.body.idCurso_Modulo,
				req.body.statusModulo,
				req.body.duracionModulo);
			CONN('Modulo').insert(modulo).then(
				result=>{
					res.status(200).send({resp:'Exito',message:'Exito al registrar Modulo'});
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

function obtenerModulosing(req,res){
	let idModulo = req.params.idModulo;
	CONN('modulo').select().where('idModulo',idModulo)
	.then(result=>{
		res.status(200).send({resp:'Exito',modulo:result})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function obtenerModulos(req,res){
	let idCurso = req.params.idCurso;
	let examenes = [];
	let contador = 0;
	CONN('modulo').select().where('idCurso_Modulo',idCurso)
	.orderBy('numeroModulo')
	.then(result=>{
		result.forEach(function(element, index, array){
			CONN('examen').select()
			.where('idModulo_Examen', element.idModulo)
			.then(result=>{
				CONN('evaluaciontema')
				.join('tema', 'evaluaciontema.idTema_Evaluaciontema', '=', 'tema.idTema')
				.sum('evaluacionEvaluaciontema as suma')
				.where('tema.idModulo_Tema',element.idModulo)
				.groupBy('tema.idModulo_Tema')
				.then(evaluacionTema=>{
					CONN('Evaluacionmodulo')
					.select()
					.where('idModulo_Evaluacionmodulo',element.idModulo)
					.then(
						evaluacionModulo=>{
							if (evaluacionModulo.length > 0) {
								if (evaluacionTema.length > 0) {
									if (result.length > 0) {
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:true,
											idExamen:result[0].idExamen,
											evaluacionTema:evaluacionTema[0].suma,
											idEvaluacionmodulo:evaluacionModulo[0].idEvaluacionmodulo,
											evaluacionEvaluacionmodulo:evaluacionModulo[0].evaluacionEvaluacionmodulo
										})	
										contador++;	
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}			
									}else{
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:false,
											evaluacionTema:evaluacionTema[0].suma,
											idEvaluacionmodulo:evaluacionModulo[0].idEvaluacionmodulo,
											evaluacionEvaluacionmodulo:evaluacionModulo[0].evaluacionEvaluacionmodulo
										})
										contador++;
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}
									}
								}
								else{
									if (result.length > 0) {
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:true,
											idExamen:result[0].idExamen,
											evaluacionTema:'No tiene Evaluación',
											idEvaluacionmodulo:evaluacionModulo[0].idEvaluacionmodulo,
											evaluacionEvaluacionmodulo:evaluacionModulo[0].evaluacionEvaluacionmodulo
										})	
										contador++;	
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}			
									}else{
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:false,
											evaluacionTema:'No tiene Evaluación',
											idEvaluacionmodulo:evaluacionModulo[0].idEvaluacionmodulo,
											evaluacionEvaluacionmodulo:evaluacionModulo[0].evaluacionEvaluacionmodulo
										})
										contador++;
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}
									}
								}		
							}else{
								if (evaluacionTema.length > 0) {
									if (result.length > 0) {
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:true,
											idExamen:result[0].idExamen,
											evaluacionTema:evaluacionTema[0].suma,
											evaluacionEvaluacionmodulo:'No tiene Evaluación'
										})	
										contador++;	
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}			
									}else{
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:false,
											evaluacionTema:evaluacionTema[0].suma,
											evaluacionEvaluacionmodulo:'No tiene Evaluación'
										})
										contador++;
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}
									}
								}
								else{
									if (result.length > 0) {
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:true,
											idExamen:result[0].idExamen,
											evaluacionTema:'No tiene Evaluación',
											evaluacionEvaluacionmodulo:'No tiene Evaluación'
										})	
										contador++;	
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}			
									}else{
										examenes.push({
											idModulo:element.idModulo,
											nombreModulo:element.nombreModulo,
											numeroModulo:element.numeroModulo,
											idCurso_Modulo:element.idCurso_Modulo,
											statusModulo:element.statusModulo,
											duracionModulo:element.duracionModulo,
											examen:false,
											evaluacionTema:'No tiene Evaluación',
											evaluacionEvaluacionmodulo:'No tiene Evaluación'
										})
										contador++;
										if(contador === array.length) {
											res.status(200).send({resp:'Exito',modulo:examenes})
										}
									}
								}
							}
						}).catch(error =>{
							res.status(500).send({resp:'error',
								error: `${error}`});
						});
					}).catch(error =>{
						res.status(500).send({resp:'error',
							error: `${error}`});
					});
				})
})
}).catch(error =>{
	res.status(500).send({resp:'error',
		error: `${error}`});
});
}

function obtenerModulosExamen(req,res){
	let idCurso = req.params.idCurso;
	CONN('examen')
	.join('modulo','examen.idModulo_Examen', '=', 'modulo.idmodulo')
	.where('modulo.idCurso_Modulo',idCurso)
	.orderBy('numeroModulo')
	.select('modulo.idModulo',
		'modulo.nombreModulo',
		'modulo.numeroModulo',
		'modulo.idCurso_Modulo',
		'modulo.statusModulo',
		'modulo.duracionModulo',
		'examen.idExamen')
	.then(result=>{
		res.status(200).send({resp:'Exito',modulo:result})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizaNumero(req,res){
	req.body.forEach(function(element){
		CONN('modulo').update('numeroModulo',element.numeroModulo)
		.where('idModulo',element.idModulo)
		.then()
		.catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
	})
	res.send({message:'Exito'});
}

function actualizaModulo(req,res){
	let idModulo = req.params.idModulo;
	let modulo = new moduloModel(req.body.nombreModulo,
		req.body.numeroModulo,
		req.body.idCurso_Modulo,
		req.body.statusModulo,
		req.body.duracionModulo);
	CONN('modulo').update(modulo).where('idModulo',idModulo)
	.then(result=>{
		res.status(200).send({res:'Exito',message:'Modulo Actualizado'})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function agregaEvaluacion(req,res){
	let idCurso = req.params.idCurso;
	let evaluacion = new evaluacionModel(req.body.evaluacion, req.body.id);
	CONN('evaluacionmodulo')
	.join('modulo', 'evaluacionmodulo.idModulo_Evaluacionmodulo', '=', 'modulo.idModulo')
	.sum('evaluacionEvaluacionmodulo as suma')
	.where('modulo.idCurso_Modulo',idCurso)
	.groupBy('modulo.idCurso_Modulo')
	.then(result=>{
		if (result.length > 0) {
			let suma = result[0].suma + Number(req.body.evaluacion)
			if (suma > 100) {
				res.status(200).send({resp:false, message:'No fue posible insertar esta evaluacion ya que pasa del 100%'})
			}
			else{
				CONN('evaluacionmodulo').insert(evaluacion).then(result=>{
					res.status(200).send({resp:true, message:'Evaluación agregada correctamente'})
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
			}
		}
		else{
			CONN('evaluacionmodulo').insert(evaluacion).then(result=>{
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
	let idCurso = req.params.idCurso;
	let idEvaluacionmodulo = req.params.idEvaluacion;
	let evaluacion = new evaluacionModel(req.body.evaluacion, req.body.id);
	CONN('evaluacionmodulo')
	.select('evaluacionEvaluacionmodulo')
	.where('idEvaluacionmodulo', idEvaluacionmodulo)
	.then(evaluacionModulo=>{	
		CONN('evaluacionmodulo')
		.join('modulo', 'evaluacionmodulo.idModulo_Evaluacionmodulo', '=', 'modulo.idModulo')
		.sum('evaluacionEvaluacionmodulo as suma')
		.where('modulo.idCurso_Modulo',idCurso)
		.groupBy('modulo.idCurso_Modulo')
		.then(result=>{			
			let suma = result[0].suma - evaluacionModulo[0].evaluacionEvaluacionmodulo + Number(req.body.evaluacion)
			if (suma > 100) {
				res.status(200).send({resp:false, message:'No fue posible modificar esta evaluacion ya que pasa del 100%'})
			}
			else{
				CONN('Evaluacionmodulo').update(evaluacion)
				.where('idEvaluacionmodulo', idEvaluacionmodulo)
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
	let idCurso = req.params.idCurso;
	CONN('evaluacionmodulo')
	.join('modulo', 'evaluacionmodulo.idModulo_Evaluacionmodulo', '=', 'modulo.idModulo')
	.sum('evaluacionEvaluacionmodulo as suma')
	.where('modulo.idCurso_Modulo',idCurso)
	.groupBy('modulo.idCurso_Modulo')
	.then(result=>{
		if (result.length > 0) {
			res.status(200).send({suma:result,idCurso:idCurso});
		}
		else{
			res.status(200).send({suma:false});
		}		
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function registraCalifModulo(req,res){
	let califModulo = new CalifModulo(req.body.idEvaluacionModulo_CalifModulo, req.body.califModulo); 
	CONN("califmodulo").select().where('idEvaluacionModulo_CalifModulo',req.body.idEvaluacionModulo_CalifModulo).then(response=>{
		if(response == ""){
			CONN("califmodulo").insert(califModulo).then(response=>{
		res.status(200).send({resp:true, message:'Calificación registrada correctamente'})
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
		}else{
			CONN("califmodulo").where('idEvaluacionModulo_CalifModulo',req.body.idEvaluacionModulo_CalifModulo).update(califModulo).then(response=>{
			res.status(200).send({resp:true, message:'Calificación actualizada correctamente'})
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
		}
	})
	
}

function getCalifMod(req,res){
	let contador = 0;
	let modulos = [];
	let idModulo = req.params.idModulo
	CONN("evaluacionmodulo").select().where('idModulo_Evaluacionmodulo', idModulo).then(response=>{
		if(response){
			console.log(response[0].idEvaluacionmodulo);
				CONN('califmodulo').select().where('idEvaluacionModulo_CalifModulo',response[0].idEvaluacionmodulo).then(response2=>{
					CONN('modulo').select().where('idModulo', response[0].idModulo_Evaluacionmodulo).then(response3=>{
						modulos.push({
										evalModulo:response,
										califModulo:response2,
										modulo:response3
									});
						res.status(200).send({resp:'Exito',modulos})
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

function getIdEvalMod(req,res){
	let idModulo = req.params.idModulo
	CONN("evaluacionmodulo").select().where('idModulo_Evaluacionmodulo', idModulo).then(response=>{
		if(response){
			res.status(200).send({resp:'Exito',idEvalModulo:response[0].idEvaluacionmodulo})
		}else{
			res.status(500).send({resp:'No existe ese modulo'})
		}

	}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				});
}

module.exports = {
	registraModulo,
	obtenerModulos,
	actualizaNumero,
	actualizaModulo,
	obtenerModulosExamen,
	agregaEvaluacion,
	modificaEvaluacion,
	sumaEvaluacion,
	obtenerModulosing,
	registraCalifModulo,
	getIdEvalMod,
	getCalifMod
}