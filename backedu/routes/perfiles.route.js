'use strict'

let express = require('express');
let Perfiles = require('../constrollers/perfiles.controller');
let api = express.Router();

api.get('/getRoles', Perfiles.getRol);
api.get('/getPerfiles', Perfiles.getPerfiles);
api.get('/getPerfil/:idPerfil', Perfiles.getPerfil);
api.post('/registraPerfil', Perfiles.registraPerfil);
api.put('/modificaPerfil/:idPerfil', Perfiles.modificaPerfil);
api.get('/eliminaRol/:idRol', Perfiles.eliminaRol);
api.put('/darAltaPerfil/:idPerfil', Perfiles.darAltaPerfil);
api.put('/darBajaPerfil/:idPerfil', Perfiles.darBajaPerfil);

module.exports = api;