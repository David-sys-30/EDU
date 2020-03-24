'use strict'

let express = require('express');
let Contenido = require('../constrollers/contenido.controller');
let multer = require('multer');

let storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Contenido/videos')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idContenido}-${file.originalname}`);
  }
});
let uploadVideo = multer({ storage: storageVideo });

let storageDocumento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Contenido/documentos')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idContenido}-${file.originalname}`);
  }
});
let uploadDocumento = multer({ storage: storageDocumento });


let api = express.Router();

// api.post('/registraAdministrador', upload.single('imagenAdministrador'), Administrador.registraAdministrador);
api.post('/registraContenido', Contenido.registraContenido);
api.post('/registraTareas', Contenido.registraTareas);
api.get('/obtenerContenido/:idTema',Contenido.obtenerContenido);
api.get('/obtenerTareas/:idTema',Contenido.obtenerTareas);
api.put('/actualizaTarea/:idContenido',Contenido.actualizaTarea);
api.put('/actualizaDocumento/:idContenido',Contenido.actualizaDocumento);
api.put('/subeVideo/:idContenido', uploadVideo.single('video'), Contenido.subeVideo);
api.get('/getVideo/:rutaContenido', Contenido.getVideo);
api.put('/subeDocumento/:idContenido', uploadDocumento.single('documento'), Contenido.subeVideo);
api.get('/getDocumento/:rutaContenido', Contenido.getDocumento);
api.get('/getEvaluacion/:idTema', Contenido.getEvaluacion);
api.get('/getEvaluacionContenido/:idContenido', Contenido.obtenerIdEvaluacionContenido);
api.get('/getDocumentos/:idUsuario/:idTema', Contenido.getDocumentos);
api.get('/getDocumentoAlumno/:rutaContenido', Contenido.getDocumentoAlumno);
api.put('/actualizacalificacion/:idMaterialevalusuario', Contenido.actualizaCalificacionTarea);
module.exports = api;

