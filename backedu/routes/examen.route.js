'use strict'

let express = require('express');
let ExamenController = require('../constrollers/examen.controller');
let api = express.Router();

api.post('/crearExamen',ExamenController.crearExamen);
api.put('/actualizarExamen/:idExamen', ExamenController.actualizarExamen);
api.get('/getExamen/:idModulo/:idExamen?', ExamenController.getExamen);
api.post('/creaPreguntaRespuesta',ExamenController.creaPreguntaRespuesta);
api.get('/obtenerPreguntas/:idExamen',ExamenController.obtenerPreguntas);
api.get('/obtenerRespuestas/:idPregunta', ExamenController.obtenerRespuestas);
api.put('/modificarPreguntaExamen/:idPregunta', ExamenController.modificarPreguntaExamen);
api.get('/randomPreguntas/:idExamen', ExamenController.randomPreguntas);
api.post('/evalExamen/:idUsuarioPersonaCurso_Examenevalusuario/:idExamen_examenevalusuario', ExamenController.calificarExamen);
// api.get('/getcalificacionpersona/:idExamen/:idUsuarioPersona',ExamenController.getCalificacionAlumno)
api.get('/getcalificacionpersona/:idUsuario',ExamenController.getCalificacionAlumno)

module.exports = api;