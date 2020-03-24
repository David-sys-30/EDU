'use strict'

let express = require('express');
let subCategoria = require('../constrollers/subCategoriacurso.controller');
let api = express.Router();

api.post('/registraSubcategoria', subCategoria.registraSubcategoria);
api.get('/obtenerSubCategorias/:idCategoria', subCategoria.obtenerSubCategorias);
api.put('/actualizaSubcategoria/:idSubcategoriacurso',subCategoria.actualizaSubcategoria);

module.exports = api;