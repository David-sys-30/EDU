'use strict'

let express = require('express');
let Modulo = require('../constrollers/modulo.controller');
let api = express.Router();

api.post('/registraModulo', Modulo.registraModulo);
api.get('/obtenerModulos/:idCurso', Modulo.obtenerModulos);
api.get('/obtenerModulosing/:idModulo', Modulo.obtenerModulosing);
api.get('/obtenerModulosExamen/:idCurso', Modulo.obtenerModulosExamen);
api.post('/actualizaNumero', Modulo.actualizaNumero);
api.put('/actualizaModulo/:idModulo',Modulo.actualizaModulo);
api.put('/agregaEvaluacionModulo/:idCurso', Modulo.agregaEvaluacion);
api.put('/modificaEvaluacionModulo/:idEvaluacion/:idCurso', Modulo.modificaEvaluacion);
api.get('/sumaModulo/:idCurso', Modulo.sumaEvaluacion);
api.post('/registraCalifModulo', Modulo.registraCalifModulo);
api.get('/getCalifModulo/:idModulo', Modulo.getCalifMod);
api.get('/getIdEvalMod/:idModulo', Modulo.getIdEvalMod);

module.exports = api;