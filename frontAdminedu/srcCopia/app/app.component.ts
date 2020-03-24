import { Component, OnInit } from '@angular/core';
import { AdministradorService } from './services/administrador.service';
import { AdministradorModel } from './models/administrador.model';
import { GLOBAL } from './services/global';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AdministradorService]
})
export class AppComponent implements OnInit {
	public title = 'Administrador';
	public administrador:AdministradorModel;
	public identity;
	public token;
	public url;
	public registro = false;
	public login = true;
	

	constructor(private _administradorService:AdministradorService){
		this.administrador = new AdministradorModel('','','','','','','','','');
		this.url = GLOBAL.url;
	}
	public getIdentity(identity){
		this.identity = identity;
	}
	public getToken(token){
		this.token = token;
	}

	ngOnInit(){
		this.identity = this._administradorService.getIdentity();
		this.token = this._administradorService.getToken();
		console.log(this.identity);
		console.log(this.token);
	}
	public logOut(nada){
		
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.identity = nada;
		this.token = nada;
	}
	public ocultar(registro){
		this.registro = registro;
		this.login = false;
		
	}
	public regresaLogin(login){
		this.registro=false;
		this.login = login;
		

	}
	

		
}
