'use strict'

let express = require('express');
let evaluacion = require('../constrollers/evaluacion.curso.controller');
let api = express.Router();


api.get('/getEvaluacionCurso/:idCurso', evaluacion.getEvalCurso);
api.get('/getEvCurso/:idUsuarioPersonaCurso_Evaluacion', evaluacion.getEvCurso);
api.post('/registraEvalCurso/:idUsuarioPersonaCurso_Evaluacion', evaluacion.registraEvalCurso);
api.put('/actualizaEvalCurso/:idUsuarioPersonaCurso_Evaluacion', evaluacion.actualizaEvalCurso);


module.exports = api;