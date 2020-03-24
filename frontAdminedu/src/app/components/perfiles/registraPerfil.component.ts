import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { PerfilesService } from '../../services/perfiles.service';
import { RolModel } from '../../models/rol.model';
import {Router} from "@angular/router"
import swal from'sweetalert2';
import * as $ from 'jquery';

@Component({
	selector: 'app-registraperfil',
	templateUrl: './registraPerfil.component.html',
	styleUrls: ['./perfiles.component.css'],
	providers: [PerfilesService]
})
export class RegistraPerfil implements OnInit {

	// public roles:RolModel;
	public left = [];
	public right = [];
	public lo:any;

	constructor(
		private _perfilesService:PerfilesService,
		private dragulaService: DragulaService,
		private router: Router
		) {
		this._perfilesService.getRoles().subscribe(
			respose=>{
				this.left = respose.roles;
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	ngOnInit() {
		const Rol: any = this.dragulaService.find('Rol'); 
		if (Rol !== undefined) {
			this.dragulaService.destroy('Rol'); 
		};
		this.dragulaService.createGroup('Rol', {
			copy: (lo, source) => {
				return source.id === 'left';
			},
			copyItem: (rol: RolModel) => {
				$('#'+rol.idRol).addClass('hol');
				return new RolModel(rol.idRol,rol.nombreRol);
			},
			accepts: (el, target, source, sibling) => {
				// To avoid dragging from right to left container
				this.lo = el;
				return target.id === 'right';
			}
		});
	}

	eliminaPerfil(index){
		let rol = this.right.findIndex( record => record === index );
		$('#'+index.idRol).removeClass('hol');
		this.right.splice(rol,1);
	}

	guarda(){
		let nombrePerfil = $('#nombrePerfil').val();
		let data = {
			nombrePerfil:nombrePerfil,
			roles:this.right
		}


		if(nombrePerfil.length != 0){
			if(this.right.length != 0){
				this._perfilesService.registraPerfil(data).subscribe(
					response=>{
					swal({
						type: 'success',
						title: 'Exito',
						text: 'Perfil agregado correctamente'
 
					}).then(result =>{
						this.router.navigate(['verPerfiles'])
					})
					

			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
			}else{
				swal({
						type: 'error',
						title: 'Error',
						text: 'Agrega al menos un permiso'
 
					})
			}
		}else{
			swal({
					type: 'error',
					title: 'Error',
					text: 'Agrega un nombre al perfil'
 
				})
		
	}
		}

}
