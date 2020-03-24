'use strict'

let Banner = require('../models/banners.model');
const CONN = require('./connection.controller');
let path = require('path');
var fs = require('fs');



function registraBanner(req, res){
	let banner = new Banner(
		req.body.tituloPublicidad, 
		req.body.descripcionPublicidad, 
		req.body.fechaPublicidad, 
		req.body.imagenPublicidad, 
		1);

		CONN('publicidad').insert(banner).then(idBanner=>{
				if (!idBanner) {
					res.status(500).send({resp:'Error', error: 'No se inserto el idBanner'});
				}else{
					res.status(200).send({
						resp:'Banner registrado',
						idBanner:idBanner
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});

}

function eliminaBanner(req,res){
	let idPublicdad = req.params.idPublicidad;
	CONN('publicidad').update('statusPublicidad',0).where('idPublicidad',idPublicdad).then(response=>{
		    res.status(200).send({ resp: 'Exito', banner: "Banner Desactivado" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
	})
}

function activaBanner(req,res){
	let idPublicdad = req.params.idPublicidad;
	CONN('publicidad').update('statusPublicidad',1).where('idPublicidad',idPublicdad).then(response=>{
		    res.status(200).send({ resp: 'Exito', banner: "Banner Activado" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
	})
}

function getBanners(req,res){
	CONN('publicidad').select().then(response=>{
		res.status(200).send({banners:response})
	}).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
    })
}

function getBannersAct(req,res){
	CONN('publicidad').select().where('statusPublicidad','1').then(response=>{
		res.status(200).send({banners:response})
	}).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
    })
}


function subeImagenBanner(req,res){
	let idBanner = req.params.idBanner;
	let foto = req.file;
	CONN('publicidad').where('idPublicidad',idBanner).update('imagenPublicidad',req.file.filename)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizo la foto'})
		}else{
			CONN('publicidad').select('imagenPublicidad').where('idPublicidad',idBanner)
			.then(image=>{
				if (!image) {
					res.status(500).send({resp:'Error',message:'error al devolver foto'})
				}
				else{
					res.status(200).send({image:image[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

var getImageFileBanner = (req,res)=>{
	var imagenFile = req.params.imagenPublicidad;
	var path_file = `./imgs/Banners/${imagenFile}`;
	// var path_file = `./imgs/Persona/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la Imagen'});
		}
	}); 
}


module.exports = {
	registraBanner,
	subeImagenBanner,
	getImageFileBanner,
	eliminaBanner,
	activaBanner,
	getBanners,
	getBannersAct
}