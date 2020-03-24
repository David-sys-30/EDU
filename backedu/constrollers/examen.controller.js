'use strict'

let ExamenModel = require('../models/examen.model');
const CONN = require('./connection.controller');
let PreguntaModel = require ('../models/pregunta.model');
let EvalExamen = require ('../models/examen.eval.usuario.model');

function crearExamen(req,res){
	let examen = new ExamenModel(
		req.body.idModulo_Examen,
		req.body.nombreExamen,
		req.body.evaluacionExamen,
		req.body.duracionExamen,
		req.body.statusExamen);
	CONN('examen').insert(examen)
	.then(idExamen=>{
		res.status(200).send({resp:'Exito', examen:idExamen});
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function actualizarExamen(req,res){
	let idExamen = req.params.idExamen;
	let examen = new ExamenModel(
		req.body.idModulo,
		req.body.nombreExamen,
		req.body.evaluacionExamen,
		req.body.duracionExamen,
		req.body.statusExamen);
	CONN('examen').update(examen)
	.where('idExamen', idExamen)
	.then(result=>{
		res.status(200).send({resp:'Exito',message:'Examen Actualizado'})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function getExamen(req,res){
	let idExamen = req.params.idExamen;
	let idModulo = req.params.idModulo;
	CONN('examen').select()
	.where('idExamen', idExamen)
	.andWhere('idModulo_Examen', idModulo)
	.then(result=>{
		res.status(200).send({resp:'Exito', examen:result})
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}


function creaPreguntaRespuesta(req,res){
	let respuestas = [];
	let pregunta = new PreguntaModel(req.body.pregunta.idExamen_Preguntaexamen,
		req.body.pregunta.preguntaPreguntaexamen,
		req.body.pregunta.statusPreguntaexamen);
	CONN('preguntaexamen').insert(pregunta).then(
		idPregunta=>{
			req.body.respuestas.forEach(function(element){
				respuestas.push({idPreguntaexamen_Respuestaexamen:idPregunta[0],
					respuestaRespuestaexamen:element.respuesta,
					statusRespuestaexamen:element.status,
					retroRespuestaexamen:element.retro})
			})
			CONN('respuestaexamen').insert(respuestas)
			.then(result=>{
				res.status(200).send({resp:'Exito'});
			})
			.catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		})
	.catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function obtenerPreguntas(req,res){
	let idExamen = req.params.idExamen;
	CONN('preguntaexamen').select()
	.where('idExamen_Preguntaexamen',idExamen)
	.then(
		response=>{
			res.status(200).send({resp:'Exito',preguntas:response})
		})
	.catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function calificarExamen(req,res){
	let idUsuarioPersonaCurso_Examenevalusuario = req.params.idUsuarioPersonaCurso_Examenevalusuario;
	let idExamen_examenevalusuario = req.params.idExamen_examenevalusuario;
	let evalExamen = new EvalExamen(
		idUsuarioPersonaCurso_Examenevalusuario,
		idExamen_examenevalusuario,
		req.body.calificacionExamenevalusuario);
	CONN('examenevalusuario').insert(evalExamen).then(idevalExamen=>{
			res.status(200).send({resp:'Exito', idEvalexamen:idevalExamen});
		}).catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
}

function obtenerRespuestas(req,res){
	let idPregunta = req.params.idPregunta;
	CONN('preguntaexamen').select()
	.where('idPreguntaexamen',idPregunta)
	.then(
		pregunta=>{
			CONN('respuestaexamen').select()
			.where('idPreguntaexamen_Respuestaexamen',idPregunta)
			.then(respuestas=>{
				res.status(200).send({resp:'Exito', 
					pregunta:pregunta,
					respuestas:respuestas
				})
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

function modificarPreguntaExamen(req,res){
	let idPregunta = req.params.idPregunta
	let pregunta = new PreguntaModel(req.body.pregunta.idExamen_Preguntaexamen,
		req.body.pregunta.preguntaPreguntaexamen,
		req.body.pregunta.statusPreguntaexamen,
		req.body.pregunta.retroPreguntaexamen);
	CONN('preguntaexamen').update(pregunta)
	.where('idPreguntaexamen',idPregunta)
	.then(
		result=>{
			if (insertaArray(res,idPregunta,req.body.respuestas)) {
				console.log('si')
			}else{
				console.log('no');
			}
		})
	.catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
}

function insertaArray(res,idPregunta,arr){
	let respuestas = [];
	arr.forEach(function(element){
		respuestas.push({idPreguntaexamen_Respuestaexamen:idPregunta,
			respuestaRespuestaexamen:element.respuesta,
			statusRespuestaexamen:element.status,
			retroRespuestaexamen:element.retro})
		CONN('respuestaexamen').update({
			idPreguntaexamen_Respuestaexamen:idPregunta,
			respuestaRespuestaexamen:element.respuesta,
			statusRespuestaexamen:element.status,
			retroRespuestaexamen:element.retro
		})
		.where('idRespuestaexamen',element.idRespuesta)
		.then(result=>{
			// res.status(200).send({resp:'Exito'});
		})
		.catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
	})
	return res.status(200).send({resp:'Exito'});
}

function randomPreguntas(req,res){
	let idExamen = req.params.idExamen;
	CONN('examen').select()
	.where('idExamen', idExamen)
	.then(
		examen=>{
			CONN('preguntaexamen')
			.select()
			.where('idExamen_Preguntaexamen', idExamen)
			.then(
				preguntas=>{
					if (preguntas.length > 0) {
						let arr = shuffle(preguntas);
						// res.send({random:arr,preguntas:preguntas});
						randomRespuestas(res,arr,examen)
					}else{
						res.status(200).send({examen:examen})
					}

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



/*========================================
=            Preguntas Random            =
========================================*/

function randomRespuestas(res,preguntas,examen){
	let arrays = [];
	let itemsProcessed = 0;
	preguntas.forEach(function(element, index, array){
		CONN('respuestaexamen')
		.select()
		.where('idPreguntaexamen_Respuestaexamen', element.idPreguntaexamen)
		.then(
			result=>{
				let respuestas = shuffle(result);
				arrays.push({pregunta:element,respuestas:respuestas});
				itemsProcessed++;
				if(itemsProcessed === array.length) {
					return res.status(200).send({examen:examen,
						preguntas:arrays});
				}				
			}
			)
		.catch(error =>{
			res.status(500).send({resp:'error',
				error: `${error}`});
		});
	})	
}

/*=====  End of Preguntas Random  ======*/



/*==============================
=            Random            =
==============================*/

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

return array;
}

/*=====  End of Random  ======*/


	// function getCalificacionAlumno(req,res){
	// 	let idExamen = req.params.idExamen;
	// let idUsuarioPersona = req.params.idUsuarioPersona;
	// CONN('examenevalusuario').select()
	// .where('idExamen_examenevalusuario', idExamen)
	// .andWhere('idUsuarioPersonaCurso_Examenevalusuario', idUsuarioPersona)
	// .then(result=>{
	// 	res.status(200).send({resp:'Exito', examen:result})
	// }).catch(error =>{
	// 	res.status(500).send({resp:'error',
	// 		error: `${error}`});
	// });
	// }


		function getCalificacionAlumno(req,res){
		let idUsuario = req.params.idUsuario;
		let itemsProcessed = 0;
		let arrays = [];
	CONN('usuariopersonacurso').select()
	.where('idUsuario_UsuarioPersonaCurso', idUsuario)
	.then(idUsuarioPersonaCursos=>{
		idUsuarioPersonaCursos.forEach(function(element,index,array){
			CONN('examenevalusuario').select()
			.where('idUsuarioPersonaCurso_Examenevalusuario',element.idUsuarioPersonaCurso)	
			.then(evalExamenes=>{
				arrays.push(evalExamenes)
				itemsProcessed++;
				if(itemsProcessed === array.length) {
					res.status(200).send({resp:'Exito', examen:arrays})
				}	
				
				}).catch(error =>{
					res.status(500).send({resp:'error',
						error: `${error}`});
				
			})
		})
		
	}).catch(error =>{
		res.status(500).send({resp:'error',
			error: `${error}`});
	});
	}

module.exports = {
	crearExamen,
	actualizarExamen,
	getExamen,
	creaPreguntaRespuesta,
	obtenerPreguntas,
	obtenerRespuestas,
	modificarPreguntaExamen,
	randomPreguntas,
	calificarExamen,
	getCalificacionAlumno
}


