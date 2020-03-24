'use strict'

let express = require('express');
let categoriaCurso = require('../constrollers/categoriaCurso.controller');
let api = express.Router();

api.post('/registraCategoriaCurso', categoriaCurso.registraCategoria);
api.get('/getCategorias',categoriaCurso.obtenerCategorias);
api.put('/actualizaCategoria/:idCategoria',categoriaCurso.actualizaCategoria);
api.get('/getCategoria/:idCategoriacurso', categoriaCurso.obtenerCategoria);
api.put('/bajaCategoria/:idCategoria',categoriaCurso.bajaCategoria);
api.put('/altaCategoria/:idCategoria',categoriaCurso.altaCategoria);

module.exports = api;