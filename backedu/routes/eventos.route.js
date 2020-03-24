'use strict'

let express = require('express');
let Eventos = require('../constrollers/eventos.controller');
let api = express.Router();

api.get('/getEventos/:idUsuario', Eventos.getEventos);
api.post('/registraEvento/:idUsuarioPersonaCurso/:nombreEvento', Eventos.registraEvento);

module.exports = api;