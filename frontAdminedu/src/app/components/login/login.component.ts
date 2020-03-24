import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdministradorModel } from '../../models/administrador.model';
import { AdministradorService } from '../../services/administrador.service';
import { PersonaModel } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';
import swal from'sweetalert2';
import * as $ from 'jquery';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [PersonaService, AdministradorService]
})
export class Login implements OnInit {
	public title = 'Administrador';
	public administrador:AdministradorModel;
	public persona:PersonaModel;
	public identity;
	public errorMessage;
	public token;
	public alertRegister;
	

	@Output() sendIdentity = new EventEmitter;
	@Output() sendToken = new EventEmitter;
	@Output() aparecerRegistro = new EventEmitter;
constructor(private _personaService:PersonaService, private _administradorService:AdministradorService){
		this.persona = new PersonaModel('','','','','','','','','','');
		this.administrador = new AdministradorModel('','','','','','','','','');
		
	}
	ngOnInit(){
		this.identity = this._personaService.getIdentityP();
		this.token = this._personaService.getTokenP();
		this.identity = this._administradorService.getIdentity();
		this.token = this._administradorService.getToken();
		$('#loginadmin').css('display','none');
		$('#loginpersona').css('display','none');

	}
	public recuperaContrasena(){
		$('#loginadmin').css('display','none')
		$('#loginpersona').css('display','none')
		$('#rowlogin').css('display','none')
		$('#recuperaContrasena').css('display','block')
	}


	public apareceadmin(){
		$('#loginadmin').css('display','block')
		$('#loginpersona').css('display','none')
		$('#rowlogin').css('display','none')
		$('#recuperaContrasena').css('display','none')
	}
	public aparecepersona(){
		$('#loginadmin').css('display','none')
		$('#loginpersona').css('display','block')
		$('#rowlogin').css('display','none')
		$('#recuperaContrasena').css('display','none')
	}
	public aparecelogin(){
		$('#loginadmin').css('display','none')
		$('#loginpersona').css('display','none')
		$('#rowlogin').css('display','block')
		$('#recuperaContrasena').css('display','none')
	}
	public onSubmitPersona(){
		this._personaService.singUp(this.persona).subscribe(
			response=>{		
				
				
				if (!response.usuario.idAdministrador) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					

					// Conseguir el token para enviarselo a cada peticion http
					this._personaService.singUp(this.persona,'true').subscribe(
						response =>{
							let identity = []
							identity.push({admin:response.personaCurso,permisos:response.permisos,instructor:1})
							this.identity = identity;
							localStorage.setItem('identity', JSON.stringify(identity));
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.persona = new PersonaModel('','','','','','','','','','');
								this.alertRegister = '';
								this.sendIdentity.emit(this._personaService.getIdentityP());
								this.sendToken.emit(this._personaService.getTokenP());
								location.reload();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
					swal({
  							type: 'error',
 							title: 'Error',
  							text: 'Correo y/o contraseña incorrecto vuelve a intentarlo',
 
						})
				}
			}
			);		
	}
		public onSubmitAdministrador(){
		// Conseguir los datos del usuario Identificado
		this._administradorService.singUp(this.administrador).subscribe(
			response=>{	
				let identity = response.administrador[0];
				this.identity = identity;
				if (!this.identity.idAdministrador) {
					alert('El administrador no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					this._administradorService.singUp(this.administrador,'true').subscribe(
						response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.administrador = new AdministradorModel('','','','','','','','','');
								this.alertRegister = '';
								this.sendIdentity.emit(this._administradorService.getIdentity());
								this.sendToken.emit(this._administradorService.getToken());
								location.reload();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
					swal({
  							type: 'error',
 							title: 'Error',
  							text: 'Correo y/o contraseña incorrecto vuelve a intentarlo',
 
						})
				}
			}
			);		
	}

	public onSubmitRecuperar(){

	}


}

@Component({
	selector: 'app-loginpersona',
	templateUrl: './loginPersona.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AdministradorService, PersonaService]
})
export class LoginComponentPersona implements OnInit {

	public title = 'Administrador';
	public administrador:AdministradorModel;
	public persona:PersonaModel;
	public identity;
	public errorMessage;
	public token;
	public alertRegister;
	

	@Output() sendIdentity = new EventEmitter;
	@Output() sendToken = new EventEmitter;
	@Output() aparecerRegistro = new EventEmitter;
constructor(private _personaService:PersonaService){
		this.persona = new PersonaModel('','','','','','','','','','');
		
	}

	ngOnInit(){
		this.identity = this._personaService.getIdentityP();
		this.token = this._personaService.getTokenP();
	}
	public recargar(){
		//location.reload()
	}
	public onSubmitPersona(){
		// Conseguir los datos del usuario Identificado
		this._personaService.singUp(this.persona).subscribe(
			response=>{		
				
				
				if (!response.usuario.idAdministrador) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					

					// Conseguir el token para enviarselo a cada peticion http
					this._personaService.singUp(this.persona,'true').subscribe(
						response =>{
							let identity = []
							identity.push({admin:response.personaCurso,permisos:response.permisos,instructor:1})
							this.identity = identity;
							localStorage.setItem('identity', JSON.stringify(identity));
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.persona = new PersonaModel('','','','','','','','','','');
								this.alertRegister = '';
								this.sendIdentity.emit(this._personaService.getIdentityP());
								this.sendToken.emit(this._personaService.getTokenP());
								
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
				}
			}
			);		
	}



}

@Component({
	selector: 'app-loginadministrador',
	templateUrl: './loginAdministrador.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AdministradorService, PersonaService]
})
export class LoginComponentAdministrador implements OnInit {

public title = 'Administrador';
	public administrador:AdministradorModel;
	public persona:PersonaModel;
	public identity;
	public errorMessage;
	public token;
	public alertRegister;
	

	@Output() sendIdentity = new EventEmitter;
	@Output() sendToken = new EventEmitter;
	@Output() aparecerRegistro = new EventEmitter;

		constructor(private _administradorService:AdministradorService){
		this.administrador = new AdministradorModel('','','','','','','','','');
		
	}

	ngOnInit(){
		this.identity = this._administradorService.getIdentity();
		this.token = this._administradorService.getToken();
	}
	public recargar(){
		//location.reload()
	}
	public onSubmitAdministrador(){
		// Conseguir los datos del usuario Identificado
		this._administradorService.singUp(this.administrador).subscribe(
			response=>{	
				let identity = response.administrador[0];
				this.identity = identity;
				if (!this.identity.idAdministrador) {
					alert('El administrador no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					this._administradorService.singUp(this.administrador,'true').subscribe(
						response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.administrador = new AdministradorModel('','','','','','','','','');
								this.alertRegister = '';
								this.sendIdentity.emit(this._administradorService.getIdentity());
								this.sendToken.emit(this._administradorService.getToken());
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
				}
			}
			);		
	}

	public registerAdmin(){
		let registro = true;
		this.aparecerRegistro.emit(registro);

	}




}





