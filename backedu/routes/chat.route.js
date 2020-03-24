'use strict'
let express = require('express');
let ChatController = require('../constrollers/chat.controller');
let api = express.Router();


api.post('/mensajesAlumno', ChatController.insertMensajeUsuario);
api.post('/mensajesPersona/:iduser', ChatController.insertMensajePersona);
api.post('/mensajesAlumnoToAlumno/', ChatController.insertMensajeUsuarioToUsuario);
api.get('/conversacionAlumno/:idUsuario/:idPersona/:idCurso', ChatController.getConversacionUsuario);
api.get('/getusuariopersonacurso/:idUsuario/:idPersona/:idCurso', ChatController.getidUsuarioPersona);
api.get('/getusuarioconversacion/:idEmisor/:idReceptor/:idCurso', ChatController.getConversacionUsuariotoUsuario);


module.exports = api;