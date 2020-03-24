'use strict'

let evalCurso = require('../models/evaluacionCurso.model');
const CONN = require('./connection.controller');

function getEvCurso(req, res) {
    let idUsuarioPersonaCurso_Evaluacion = req.params.idUsuarioPersonaCurso_Evaluacion;
    CONN('evaluacion').select('cursoEvaluacion')
        .where('idUsuarioPersonaCurso_Evaluacion', idUsuarioPersonaCurso_Evaluacion)
        .then(ev => {
            res.status(200).send({ resp: 'Exito', evalCurso: ev })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}


function getEvalCurso(req,res){
	let idCurso = req.params.idCurso;
	let evalUsuariosCurso = [];
	let evalTotalCurso = 0;
	let contador1 = 0;
	let contador2 = 0;
	CONN('personacurso')
	.where('idCurso_PersonaCurso', idCurso)
	.select('idPersonaCurso')
	.then(idPersonaCurso=>{
		CONN('usuariopersonacurso')
		.where('idPersonaCurso_UsuarioPersonCurso', idPersonaCurso[0].idPersonaCurso)
		.select('idUsuarioPersonaCurso')
		.then(idUsuarioPersonaCurso=>{
			idUsuarioPersonaCurso.forEach(function(element,index,array){
				CONN('evaluacion')
				.where('idUsuarioPersonaCurso_Evaluacion',element.idUsuarioPersonaCurso)
				.select('cursoEvaluacion')
				.then(result=>{
					evalUsuariosCurso.push(result)
					contador1++
                    if (contador1 === array.length) {
                    	for (var i in evalUsuariosCurso){
                    		evalTotalCurso = evalTotalCurso + evalUsuariosCurso[i][0].cursoEvaluacion
                    	}
                    	evalTotalCurso = evalTotalCurso / evalUsuariosCurso.length
                  	 res.status(200).send({evalTotalCurso:evalTotalCurso})	
                    }
				})
			})
			
		})
		
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}

function registraEvalCurso(req, res){
	let idUsuarioPersonaCurso_Evaluacion = req.params.idUsuarioPersonaCurso_Evaluacion;
	let evalCur = new evalCurso(
		idUsuarioPersonaCurso_Evaluacion, 
		req.body.instructorEvaluacion, 
		req.body.cursoEvaluacion, 
		req.body.plataformaEvaluacion, 
		req.body.comentarioEvaluacion);
			CONN('evaluacion').insert(evalCur).then(ideval=>{
				if (!ideval) {
					res.status(500).send({resp:'Error', error: 'No se envió tu evaluación'});
				}else{
					res.status(200).send({
						resp:'Evaluación registrada',
						ideval:ideval
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});

}

function actualizaEvalCurso (req,res){
	let idUsuarioPersonaCurso_Evaluacion = req.params.idUsuarioPersonaCurso_Evaluacion;
	let evalCur = new evalCurso(
		idUsuarioPersonaCurso_Evaluacion, 
		req.body.instructorEvaluacion, 
		req.body.cursoEvaluacion, 
		req.body.plataformaEvaluacion, 
		req.body.comentarioEvaluacion);
	CONN('evaluacion').where('idUsuarioPersonaCurso_Evaluacion', idUsuarioPersonaCurso_Evaluacion)
	.update(evalCur).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('evaluacion').select().where('idUsuarioPersonaCurso_Evaluacion',idUsuarioPersonaCurso_Evaluacion).then(evalu=>{
				if (!evalu) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',evaluacion:evalu,message:'Evaluación actualizada correctamente'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
		console.log(`${error}`);
	})
}

module.exports = {
	getEvalCurso,
	registraEvalCurso,
	actualizaEvalCurso,
	getEvCurso
}