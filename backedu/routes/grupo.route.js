'use strict'

let express = require('express');
let grupo = require('../constrollers/grupo.controller');
let api = express.Router();

api.post('/registraGrupo', grupo.registraGrupo);
api.get('/getGrupos',grupo.obtenerGrupos);
api.get('/getAllUsuarios',grupo.obtenerAllUsuarios);
api.put('/actualizaGrupo/:idGrupo',grupo.actualizaGrupo);
api.get('/getUsuarios/:idGrupo', grupo.obtenerUsuarios);
api.put('/agregarUsuario/:idGrupo/:idUsuario', grupo.agregarUsuario);
api.put('/removerUsuario/:idGrupo/:idUsuario', grupo.removerUsuario);
api.get('/getGrupo/:idGrupo',grupo.obtenerGrupo);

module.exports = api;