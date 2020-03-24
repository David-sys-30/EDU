import { Component, OnInit } from '@angular/core';
import {MensajesService} from '../../services/mensajes.service';
import { ActivatedRoute } from '@angular/router';
import { MensajeModel} from '../../models/mensajes.model';

import * as $ from 'jquery';


@Component({
  selector: 'app-chat-instructor',
  templateUrl: './chat-instructor.component.html',
  styleUrls: ['./chat-instructor.component.css'],
  providers:[MensajesService]
})
export class ChatInstructorComponent implements OnInit {
	public mensajes2;
	public params;
	public idPersona;
	public idUsuario;
	public idCurso;
	public mensajeModel;
	public idusuarioPersonaCurso;

  constructor(private _mensajesService: MensajesService,
  				private activatedRoute:ActivatedRoute) { 

  			this.activatedRoute.params.subscribe(parametros =>{
			this.idPersona = parametros.idUsuario;
			this.idUsuario = parametros.idPersona;
			this.idCurso = parametros.idCurso;
			this.mensajeModel = new MensajeModel("","",this.idPersona,this.idUsuario,this.idCurso,"0","","instructor")
			});

  	this._mensajesService.getMensajes(this.idPersona,this.idUsuario,this.idCurso).subscribe(result=>{
  		this.mensajes2 = result.Mensajes;

  	},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			});	
  		this._mensajesService.getidusuariopersonacurso(this.idPersona,this.idUsuario,this.idCurso).subscribe(iduser=>{
  		this.idusuarioPersonaCurso = iduser.id[0].idUsuarioPersonaCurso
  	})

  }

  ngOnInit() {

  }

  enviarMensajeInstructor(){
  
  	this._mensajesService.insertMensajeInstructor(this.mensajeModel,this.idusuarioPersonaCurso).subscribe(mensaje3=>{
  		
  		this._mensajesService.getMensajes(this.idPersona,this.idUsuario,this.idCurso).subscribe(result=>{
  		this.mensajes2 = result.Mensajes;

  	},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			});	
  	})
  }
 

}
