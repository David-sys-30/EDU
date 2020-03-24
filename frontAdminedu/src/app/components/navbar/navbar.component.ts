import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { AdministradorModel } from '../../models/administrador.model';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
	providers:[AdministradorService]
})
export class NavbarComponent implements OnInit {
	public identity;
	public token;
	public administrador:AdministradorModel;
	public url:string;

	@Output() cerrarsesion = new EventEmitter();

	constructor(private _administradorService:AdministradorService) {
  	// LocalStorage
  	this.identity = this._administradorService.getIdentity();
  	this.token = this._administradorService.getToken();

  	this.administrador = this.identity;
  	this.url = GLOBAL.url;
  }

  public logOut(){
  	let nada = null;
  	this.cerrarsesion.emit(nada);
    location.reload();
  }

  ngOnInit() {
  }

}
