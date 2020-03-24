import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdministradorModel } from '../../models/administrador.model';
import { AdministradorService } from '../../services/administrador.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public administradorRegistro:AdministradorModel;
	public alertRegister;

	@Output() aparecerLogin = new EventEmitter;

	constructor(private _administradorService:AdministradorService) {
		this.administradorRegistro = new AdministradorModel('','','','','','','','default.png','1');
	}

	ngOnInit() {
	}

	public onSubmitRegister(){
		this._administradorService.register(this.administradorRegistro).subscribe(
			response=>{
				let administrador = response.idAdministrador;
				this.administradorRegistro = administrador;
				if (!administrador) {
					this.alertRegister = 'Error al registrarse';
				}else{
					this.alertRegister = 'Administrador registrado con exito';
					this.administradorRegistro = new AdministradorModel('','','','','','','','default.png','1');
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.alertRegister = body.message;
				}
			}
			);
	}
	public loginAdmin(){
		let login=true;
		this.aparecerLogin.emit(login);

	}

}
