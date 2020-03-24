import { Component, OnInit, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { AdministradorService } from '../../services/administrador.service';
import { GrupoModel } from '../../models/grupo.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
  providers: [PersonaService, AdministradorService]
})
export class GruposComponent implements OnInit {

	public grupos;

  constructor(
  	private _administradorService:AdministradorService,
  	public _personaService:PersonaService,
  	public dialog: MatDialog) { }

  ngOnInit() {
  	this.getGrupos();
  }

  getGrupos(){
  	this._personaService.obtenGrupos().subscribe(
  		response=>{
  			this.grupos = response.grupos;
  		},error=>{
  			var errorMensaje = <any>error;
  			if (errorMensaje != null) {
  				var body = JSON.parse(error._body);
  			}
  		})
  }

  openDialog():void{
		let dialogRef = this.dialog.open(RegistraGrupo,{
			width:'400px'
		});

		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}

}

@Component({
	selector: 'app-registraGrupos',
	templateUrl: './reggrupos.component.html',
	styleUrls: ['./grupos.component.css'],
	providers: [PersonaService, AdministradorService]
})
export class RegistraGrupo {

	public group:GrupoModel;
	public identity;

	constructor(
		private _administradorService:AdministradorService,
		public _personaService:PersonaService,
		public dialogRef:MatDialogRef<RegistraGrupo>
		){
		this.identity = this._administradorService.getIdentity();
		this.group = new GrupoModel('','','','');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarGrupo(){
		this.group.idPersona =  this.identity[0].admin.idAdministrador;
		this._personaService.creaGrupo(this.group).subscribe(
			response=>{
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

}

@Component({
  selector: 'app-grupos',
  templateUrl: './detallegrupo.component.html',
  styleUrls: ['./grupos.component.css'],
  providers: [PersonaService, AdministradorService]
})
export class DetGrupoComponent implements OnInit {

	public grupo;
	public idGrupo;
	public usuarios;
	public todos;

  constructor(
  	private _administradorService:AdministradorService,
  	public _personaService:PersonaService,
  	private activatedRoute:ActivatedRoute) {
  	this.activatedRoute.params.subscribe(parametros =>{
  		this.idGrupo = parametros.idGrupo;
  	});
}

  ngOnInit() {
  	this.getGrupo();
  	this.getUsuarios();
  	this.getAllUsuarios();
  }

  getGrupo(){
  	this._personaService.obtenGrupo(this.idGrupo).subscribe(
  		response=>{
  			this.grupo = response.grupos[0];
  		},error=>{
  			var errorMensaje = <any>error;
  			if (errorMensaje != null) {
  				var body = JSON.parse(error._body);
  			}
  		})
  }

  getUsuarios(){
  	this._personaService.obtenUsuarioGrupo(this.idGrupo).subscribe(
  		response=>{
  			this.usuarios = response.Usuarios;
  		},error=>{
  			var errorMensaje = <any>error;
  			if (errorMensaje != null) {
  				var body = JSON.parse(error._body);
  			}
  		})
  }

  getAllUsuarios(){
  	this._personaService.obtenUsuarios().subscribe(
  		response=>{
  			this.todos = response.users;
  		},error=>{
  			var errorMensaje = <any>error;
  			if (errorMensaje != null) {
  				var body = JSON.parse(error._body);
  			}
  		})
  }

  Esconde() {
  	$(".users").show();
  	$(".now").hide();
  }

  Guarda() {
  	for (var x = 0; x < this.todos.length; x++) {
  		if ($("#"+this.todos[x].idUsuario).is(':checked')){
  			this._personaService.addUsuarioGrupo(this.idGrupo, this.todos[x].idUsuario).subscribe(
  				response=>{
		  		},error=>{
		  			var errorMensaje = <any>error;
		  			if (errorMensaje != null) {
		  				var body = JSON.parse(error._body);
		  			}
  				})
  		}
  	}
  	
  	location.reload();
  }

  Quita(idUsuario){
  	this._personaService.remUsuarioGrupo(this.idGrupo,idUsuario).subscribe(
  		response=>{
  			this.ngOnInit();
  		},error=>{
  			var errorMensaje = <any>error;
  			if (errorMensaje != null) {
  				var body = JSON.parse(error._body);
  			}
  		})
  }

}