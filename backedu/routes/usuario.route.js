'use strict'

let express = require('express');
let Usuario = require('../constrollers/usuario.controller');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Usuarios')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idUsuario}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });
let md_auth = require('../middlewares/authenticated');

let api = express.Router();

api.post('/loginUsuario', Usuario.loginUsuario);
api.post('/registraUsuario', Usuario.registraUsuario);
api.put('/actualizaUsuario/:idUsuario', md_auth.ensureAuth, Usuario.actualizaUsuario);
api.put('/subeImagenUsuario/:idUsuario', upload.single('imagenUsuario'), Usuario.subeImagenUsuario);
api.get('/getImageFileUsuario/:imagenUsuario', Usuario.getImageFileUsuario);
api.get('/getUsuario/:idUsuario', Usuario.getUsuario);
api.post('/adquirirCursos', Usuario.adquirirCursos);
api.get('/goku/:idUsuario', Usuario.goku);
api.put('/vistoTema/:idUsuario/:idTema/:numeroModulo', Usuario.vistoTema);
api.get('/getVistos/:idUsuario', Usuario.getVistos);
api.get('/buscarUsuario/:idReg', Usuario.buscarUsuario);

api.get('/getUsuarioCorreo/:correoUsuario', Usuario.getUsuarioCorreo);
api.get('/getNotificacionesUsuario/:idUsuario', Usuario.getNotificaciones);
api.get('/verNotificacionesUsuario/:idNotifUsuario', Usuario.verNotificaciones);
api.post('/correoRecuperarContrasena/:idUsuario/:correoUsuario', Usuario.correoRecuperarContrasena);
api.put('/cambiarContrasena/:idUsuario/:contrasenaUsuario', Usuario.cambiarContraseña);
api.get('/getUserCod/:codPass', Usuario.getUserCod);
api.get('/getUsuarioCorreo/:correoUsuario', Usuario.getUsuarioCorreo);
api.put('/expirarLink/:codConf', Usuario.expirarLink);
api.get('/getAllUsers', Usuario.getAllUsers);



module.exports = api;