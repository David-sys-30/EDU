'use strict'

let express = require('express');
let Persona = require('../constrollers/persona.controller');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Persona')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idPersona}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let md_auth = require('../middlewares/authenticated');

let api = express.Router();


api.post('/loginPersona', Persona.loginPersona);
api.post('/registraPersona',Persona.registraPersona);
api.put('/actualizarPersona/:idPersona', Persona.actualizarPersona);
api.put('/actualizarPersona2/:idPersona', Persona.actualizarPersona2);
api.put('/subeImagenPersona/:idPersona', upload.single('imagenPersona'), Persona.subeImagenPersona);
api.get('/getImagenPersona/:imagenPersona', Persona.getImageFilePersona);
api.get('/getPersonas',Persona.getPersonas);
api.get('/getPersona/:idPersona',Persona.getPersona);
api.post('/asignarPerfil', Persona.asignarPerfil);
api.get('/getPersonasperfiles', Persona.getPersonasperfiles);
api.get('/getPersonaperfiles/:idPersona', Persona.getPersonaperfiles);
api.get('/getPersonaperfil/:idPersona/:idCurso', Persona.getPersonaperfil);
api.put('/actualizarCurso', Persona.actualizarCurso);
api.put('/actualizarPerfiles', Persona.actualizarPerfiles);
api.delete('/eliminarPerfil/:idPersonaPerfil/:idPerfil_PersonaPerfil', Persona.eliminarPerfil);
api.get('/getPersonaCurso/:idPersona', Persona.getPersonaCurso);
api.get('/getAlumnosCurso/:idPersona', Persona.getAlumnosCurso);
api.get('/getAlumnosCursoMensajes/:idPersona/:idCurso', Persona.getAlumnosCursoMensajes);
api.get('/getNotificacionesPersona/:idPersona', Persona.getNotificacionesPersona);
api.get('/verNotificacionesPersona/:idNotifPersona', Persona.verNotificacionesPersona);
api.get('/getPersonaPermisos/:idPersona', Persona.getPersonaPermisos);
api.get('/getUsuarioPersonaCurso/:idPersona/:idCurso/:idUsuario', Persona.getUsuarioPersonaCurso);
api.put('/darAltaPersona/:idPersona', Persona.darAltaPersona);
api.put('/darBajaPersona/:idPersona', Persona.darBajaPersona);

api.post('/correoRecuperarContrasenaPersona/:idPersona/:correoPersona', Persona.correoRecuperarContrasenaPersona);
api.put('/cambiarContrasenaPersona/:idPersona/:contrasenaPersona', Persona.cambiarContraseñaPersona);
api.get('/getUserCodPersona/:codPass', Persona.getUserCodPersona);
api.get('/getUsuarioCorreoPersona/:correoPersona', Persona.getPersonaCorreo);
api.put('/expirarLinkPersona/:codConf', Persona.expirarLinkPersona);
api.get('/getPerfilPersona/:idPersona', Persona.getPerfilPersona);
api.delete('/eliminarPersonaCurso/:idPersona', Persona.eliminarPersonaCurso);


module.exports = api;