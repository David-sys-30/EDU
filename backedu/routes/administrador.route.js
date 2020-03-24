'use strict'

let express = require('express');
let Administrador = require('../constrollers/administrador.controller');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Administrador')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idAdministrador}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let md_auth = require('../middlewares/authenticated');

let api = express.Router();

// api.post('/registraAdministrador', upload.single('imagenAdministrador'), Administrador.registraAdministrador);
api.post('/registraAdministrador', Administrador.registraAdministrador);
api.put('/actualizaAdministrador/:idAdministrador', md_auth.ensureAuth, Administrador.actualizaAdministrador);
api.post('/loginAdministrador', Administrador.loginAdministrador);
api.get('/getAdministradores', Administrador.getAdministradores);
api.post('/subeImagen/:idAdministrador', upload.single('image'), Administrador.subeImagen);
api.get('/getImagen/:imagenAdministrador', Administrador.getImageFile);

module.exports = api;