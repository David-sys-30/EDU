'use strict'

let express = require('express');
let Especialidad = require('../constrollers/especialidad.controller');

let api = express.Router();

api.post('/insertaEspecialidad', Especialidad.insertaEspecialidad);
api.put('/modificaEspecialidad/:idCatalogoEspecialidad', Especialidad.modificaEspecialidad);
api.get('/obtenerEspecialidades',Especialidad.obtenerEspecialidades)
api.get('/obtenerEspecialidad/:idCatalogoEspecialidad',Especialidad.obtenerEspecialidad)

module.exports = api;