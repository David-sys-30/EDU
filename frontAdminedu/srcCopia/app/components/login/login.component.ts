import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdministradorModel } from '../../models/administrador.model';
import { AdministradorService } from '../../services/administrador.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AdministradorService]
})
export class LoginComponent implements OnInit {

	public title = 'Administrador';
	public administrador:AdministradorModel;
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

	public onSubmit(){
		console.log(this.administrador);
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
								console.log(error)
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
					console.log(error)
				}
			}
			);		
	}

	public registerAdmin(){
		let registro = true;
		this.aparecerRegistro.emit(registro);


	}



}

