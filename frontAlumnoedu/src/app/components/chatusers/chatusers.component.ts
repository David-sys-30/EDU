import { Component, OnInit } from '@angular/core';
import {MensajeUsersModel} from '../../models/mensajesusers.model'
import{MensajesService} from '../../services/mensajes.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatusers',
  templateUrl: './chatusers.component.html',
  styleUrls: ['./chatusers.component.css'],
  providers: [MensajesService,UsuarioService]
})
export class ChatusersComponent implements OnInit {


public idReceptor;
public idEmisor;
public idcurso;
public mensajeUserModel;
public mensajes2

  constructor(private _mensajesService: MensajesService,
  			  private _usuariorService:UsuarioService,
  			  private activatedRoute:ActivatedRoute) {
  			  this.activatedRoute.params.subscribe(parametros =>{
			this.idReceptor = parametros.idreceptor;
			this.idEmisor = parametros.idemisor;
			this.idcurso = parametros.idcurso;
			this.mensajeUserModel = new MensajeUsersModel("","",this.idEmisor,this.idReceptor,this.idcurso,"0","")
			}); }

  ngOnInit() {
    this._mensajesService.getMensajesAlumnos(this.idEmisor,this.idReceptor,this.idcurso).subscribe(result=>{
      this.mensajes2 = result.Mensajes
    })

  }
  enviarMensajeAlumnotoAlumno(){
  	this._mensajesService.insertMensajeAlumnoToAlumno(this.mensajeUserModel).subscribe(mensaje =>{
  		this._mensajesService.getMensajesAlumnos(this.idEmisor,this.idReceptor,this.idcurso).subscribe(result=>{
      this.mensajes2 = result.Mensajes
      
    })

  	})


  }
}
