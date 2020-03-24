'use strict'

let express = require('express');
let Banner = require('../constrollers/banners.controller');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Banners')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idBanner}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let api = express.Router();

api.post('/registraBanner', Banner.registraBanner);
api.post('/subeImagenBanner/:idBanner', upload.single('image'), Banner.subeImagenBanner);
api.get('/getImagenBanner/:imagenPublicidad', Banner.getImageFileBanner);
api.put('/eliminaBanner/:idPublicidad', Banner.eliminaBanner);
api.put('/activaBanner/:idPublicidad', Banner.activaBanner);
api.get('/getBanners', Banner.getBanners);
api.get('/getBannersAct', Banner.getBannersAct);

module.exports = api;