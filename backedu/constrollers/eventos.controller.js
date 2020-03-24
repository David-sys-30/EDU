'use strict'

const CONN = require('./connection.controller');
let Evento = require('../models/evento.model');

function getEventos(req,res){
	let idUsuario = req.params.idUsuario;
	let arrays = [];
	let itemsProcessed = 0;
	CONN('usuariopersonacurso')
	.where('idUsuario_UsuarioPersonaCurso', idUsuario)
	.select('idUsuarioPersonaCurso')
	.then(idUsuarioPersonaCurso=>{
		idUsuarioPersonaCurso.forEach(function(element,index,array){
			CONN('eventosusuariocurso').where('idUsuarioPersonaCurso_eventos',element.idUsuarioPersonaCurso)
			.select().then(eventos=>{
				if(eventos.length > 0){
					arrays.push(eventos)
				}
				itemsProcessed++
					if(itemsProcessed === array.length) {
						res.status(200).send(arrays);
					}	

			})
		})
		// res.status(200).send({idUsuarioPersonaCurso:idUsuarioPersonaCurso})
	})
	.catch(error=>{
		res.status(500).send({resp:'error',error:`${error}`});
	})
}


function registraEvento(req, res){
	let idUsuarioPersonaCurso = req.params.idUsuarioPersonaCurso;
	let nombreEvento = req.params.nombreEvento;
	let evento = new Evento(
		idUsuarioPersonaCurso,
		req.body.fechaInicioEvento, 
		req.body.fechaFinEvento, 
		nombreEvento, 
		1);
		CONN('eventosusuariocurso').where('idUsuarioPersonaCurso_eventos',idUsuarioPersonaCurso)
		.andWhere('nombreEvento',nombreEvento)
		.select().then(evento2=>{
			if (evento2.length > 0) {
				res.status(404).send({resp:'Error',message:'Evento Duplicado'})
			}else{
				console.log(evento)
		CONN('eventosusuariocurso').insert(evento).then(idEvento=>{
			console.log(idEvento)
				if (!idEvento) {
					res.status(500).send({resp:'Error', error: 'No se insertó el Evento'});
				}else{
					res.status(200).send({
						resp:'Evento registrado',
						idEvento:idEvento
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}
	})
		
}


module.exports = {
	getEventos,
	registraEvento
}