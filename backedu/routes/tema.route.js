'use strict'

let express = require('express');
let Tema = require('../constrollers/tema.controller');
let api = express.Router();

api.post('/registraTema', Tema.registraTema);
api.get('/obtenerTemas/:idModulo', Tema.obtenerTemas);
api.post('/actualizaNumeroTema', Tema.actualizaNumeroTema);
api.put('/actualizaTema/:idTema', Tema.actualizaTema);
api.put('/agregaEvaluacionTema/:idModulo', Tema.agregaEvaluacion);
api.put('/modificaEvaluacion/:idEvaluacion/:idModulo', Tema.modificaEvaluacion);
api.get('/sumaTema/:idModulo', Tema.sumaEvaluacion);
api.post('/registraCalifTema', Tema.registraCalifTema);
api.get('/getCalifTema/:idTema', Tema.getCalifTema);
api.get('/getIdEvalTema/:idTema', Tema.getIdEvalTema);

// api.get('/evaluacionTema/:idTema', Tema.evaluacionTema);

module.exports = api;