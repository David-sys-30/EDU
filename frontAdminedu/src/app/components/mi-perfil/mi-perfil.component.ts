import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { AdministradorModel } from '../../models/administrador.model';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  providers:[AdministradorService]
})
export class MiPerfilComponent implements OnInit {
	public titulo:string;
	public identity;
	public token;
	public administrador:AdministradorModel;
	public alertUpdate;
	public url:string;
	public filesToUpload: Array<File>;

  constructor(private _administradorService:AdministradorService) {
  		this.titulo = 'Mi perfil';

		// LocalStorage
		this.identity = this._administradorService.getIdentity();
		this.token = this._administradorService.getToken();

		this.administrador = this.identity;
		this.url = GLOBAL.url;
   }

  ngOnInit() {
  }

}
	