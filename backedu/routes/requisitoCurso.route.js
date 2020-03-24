'use strict'

let express = require('express');
let requisitoCurso = require('../constrollers/requisitoCurso.controller');
let api = express.Router();

api.post('/registraRequisito', requisitoCurso.registraRequisito);
api.put('/actualizaRequisito/:idRequisito', requisitoCurso.actualizaRequisito);
api.get('/obtenerRequisitos', requisitoCurso.obtenerRequisitos);
api.get('/joinRequisitos', requisitoCurso.joinRequisitos);
api.put('/getRequisito/:idSubcategoria', requisitoCurso.getRequisito);
api.post('/pruebas',requisitoCurso.pruebas);

module.exports = api;
