'use strict'

let express = require('express');
let Curso = require('../constrollers/curso.controller');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Curso')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idCurso}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let storageDocsAlumnos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Contenido/DocsAlumnos')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idUsuarioPersonaCurso_Materialevalusuario}-${file.originalname}`);
  }
});

let uploadDocsAlumnos = multer({ storage: storageDocsAlumnos });




let api = express.Router();

api.post('/registraCurso', Curso.registraCurso);
api.get('/obtenerCursos', Curso.obtenerCursos);
api.get('/obtenerCursosIndex', Curso.obtenerCursosIndex); //alumno
api.get('/obtenerCursosPersona', Curso.obtenerCursosPersona);
api.get('/obtenerCurso/:idCurso/:idUsuario',Curso.obtenerCurso);
api.get('/obtenerCurso/:idCurso',Curso.obtenerCurso2);
api.put('/editarCurso/:idCurso',Curso.editarCurso);
api.post('/subeImagenCurso/:idCurso', upload.single('image'), Curso.subeImagen);
api.get('/getImagenCurso/:imagenCurso', Curso.getImageFile);
api.get('/eliminaRequisito/:idRequisito',Curso.eliminaRequisito);
api.get('/eliminaAprendizaje/:idAprendizaje', Curso.eliminaAprendizaje);
api.get('/vistaCurso/:idCurso', Curso.vistaCurso);
api.post('/subeDocTarea/:idUsuarioPersonaCurso_Materialevalusuario/:idEvaluacioncontenido_Materialevalusuario', uploadDocsAlumnos.single('doc'), Curso.subeDocTarea);


api.get('/obteneridMod/:idModulo',Curso.obteneridMod);
api.get('/obteneridTema/:idTema',Curso.obteneridTema);
api.get('/obteneridCalifTema/:idEvaluaciontema',Curso.obteneridCalifTema);
api.get('/obteneridCalifModulo/:idEvaluacionmodulo',Curso.obteneridCalifModulo);
api.get('/obtenerAvanceCurso/:idCurso/:idUsuario',Curso.obtenerAvanceCurso);
api.put('/actualizarAvanceCurso/:idUsuarioPersonaCurso/:avanceUsuarioPersonaCurso', Curso.actualizarAvanceCurso);

api.post('/registraCalifCurso/:idUsuarioPersonaCurso', Curso.registrarCalif);
api.get('/obtenerCalifCurso/:idUsuarioPersonaCurso', Curso.getCalifCurso);
api.put('/activarCurso/:idCurso', Curso.activarCurso);
api.put('/desactivarCurso/:idCurso', Curso.desactivarCurso);
api.get('/obtenerevalMod/:idCurso',Curso.obtenerevalMod);
api.get('/getCursosSIns',Curso.getCursosSIns);


module.exports = api;