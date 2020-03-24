import { Component, OnInit } from '@angular/core';
import { AdministradorService } from './services/administrador.service';
import { AdministradorModel } from './models/administrador.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PersonaService } from './services/persona.service';

import { GLOBAL } from './services/global';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AdministradorService, PersonaService]
})
export class AppComponent implements OnInit {
	public title = 'Administrador';
	public administrador:AdministradorModel;
	
	public identity;
	public token;
	public url;
	public registro = false;
	public login = true;
	public permisos = [];

	public CrearCursos;
	public Practicas = 1;
	public MisAlumnos = 1;
	public VerCatalagos;
	public CrearPersona;
	public CrearPerfiles;
	public VerPerfiles;

	public notif;
	public nonotif;
	public notnum;
	

	constructor(private _administradorService:AdministradorService,
		private _personaService:PersonaService){
		this.administrador = new AdministradorModel('','','','','','','','','');
		
		this.url = GLOBAL.url;
		this.identity = this._administradorService.getIdentity();
		// console.log(this.identity)
		this.token = this._administradorService.getToken();

	}
	public getIdentity(identity){
		this.identity = identity;
		console.log(this.identity)
	}
	public getToken(token){
		this.token = token;
	}

	ngOnInit(){

		var arrPermisos = [];
		var atmp= []
		if(this.identity != null){
			if(this.identity.idAdministrador){
				this.CrearCursos = 1
				this.Practicas = 1
				this.MisAlumnos = 1
				this.VerCatalagos = 1
				this.CrearPersona = 1
				this.CrearPerfiles = 1
				this.VerPerfiles = 1
				this.administrador = this.identity;
			}
				else	if(this.identity.length == 1){
			this.administrador = this.identity[0].admin;

			this._personaService.getPermisos(this.administrador.idAdministrador).subscribe(response=>{
				this.permisos = response.permisos;
				for (var i = 0; i < this.permisos.length; ++i) {
					switch (this.permisos[i].permiso.idRol_RolPerfil) {
						case 1:
							this.CrearCursos = 1
							break;

						case 7:
							this.CrearPerfiles = 1
							break;

						case 15:
							this.VerCatalagos = 1
							break;

						case 17:
							this.VerCatalagos = 1
							break;

						case 23:
							this.CrearPersona = 1
							break;

						case 11:
							this.VerPerfiles = 1
							break;
						
						default:
							// code...
							break;
					}
				}
			})

			if (this.identity.length != 1) {
				this.CrearCursos = 1
				this.Practicas = 1
				this.MisAlumnos = 1
				this.VerCatalagos = 1
				this.CrearPersona = 1
				this.CrearPerfiles = 1
				this.VerPerfiles = 1
				
			}
			
			//  arrPermisos = atmp.filter((valorActual, indiceActual, arreglo) => {	
			// return arreglo.findIndex(
			// 	valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
			// });
			
			// for (var k = 0; k < arrPermisos.length; ++k) {
			// 	if (arrPermisos[k].nombreRol == "Crear Curso") {
			// 		this.CrearCursos = 1
			// 	}
			// 	else{
			// 		if (arrPermisos[k].nombreRol == "Practicas") {
			// 			this.Practicas = 1
			// 		}
			// 		else{
			// 			if (arrPermisos[k].nombreRol == "Mis Alumnos") {
			// 				this.MisAlumnos = 1
			// 			}
			// 			else{
			// 				if (arrPermisos[k].nombreRol == "Ver Catalogos") {
			// 					this.VerCatalagos = 1
			// 				}
			// 				else{
			// 					if (arrPermisos[k].nombreRol == "Crear Persona") {
			// 						this.CrearPersona = 1
			// 					}
			// 					else{
			// 						if (arrPermisos[k].nombreRol == "Crear Perfiles") {
			// 							this.CrearPerfiles = 1
			// 						}
			// 						else{
			// 							if (arrPermisos[k].nombreRol == "Ver Perfiles") {
			// 								this.VerPerfiles = 1
			// 							}
			// 						}
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}

			// }

  
			
			
		}else{this.administrador = this.identity;}
		}

		// this.administrador = this.identity[0].admin;
		// this.administrador = this.identity;
		// console.log(this.identity);
		 // console.log(this.administrador);
		
		if(this.identity){
			
			this.getNotif(this.administrador.idAdministrador);

		}
	}

	public getNotif(idUsuario){
	    this._administradorService.getNotificacionesPersona(idUsuario).subscribe(respo=>{
	      this.notif = respo.Vistos;
	      this.nonotif = respo.NoVistos;
	      this.notnum = this.nonotif.length;
	    })
	}

	public Redirige(idNotifPersona, url){
		this._administradorService.verNotificacionesPersona(idNotifPersona).subscribe(response =>{
			console.log(response);
		})
	    window.location.href = url;
	}

	public logOut(nada){
		
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.identity = nada;
		this.token = nada;
		
		// console.log(this.identity)

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
