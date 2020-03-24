import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { PerfilesService } from '../../services/perfiles.service';
import { RolModel } from '../../models/rol.model';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"
import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
	selector: 'app-modificarPerfiles',
	templateUrl: './modificarPerfil.component.html',
	styleUrls: ['./perfiles.component.css'],
	providers: [PerfilesService]
})
export class ModificaPerfil implements OnInit {

	public left = [];
	public roles;
	public right = [];
	public lo:any;
	public idPerfil;
	constructor(
		private activatedRoute:ActivatedRoute,
		private _perfilesService:PerfilesService,
		private dragulaService: DragulaService,
		private router: Router
		) {
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

	ngOnInit() {
		this._perfilesService.getRoles().subscribe(
			respose=>{
				this.left = respose.roles;
				this.activatedRoute.params.subscribe(parametros =>{
					this.idPerfil = parametros.idPerfil;
					this._perfilesService.getPerfil(parametros.idPerfil).subscribe(
						response=>{
							this.roles = response.perfil;
							$('#nombrePerfil').val(response.nombrePerfil)
							this.roles.forEach(function(element){
								$('#'+element.idRol).addClass('hol')
							})
						},
						error=>{
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						})
				})
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	eliminaPerfil(index){
		let rol = this.right.findIndex( record => record === index );
		$('#'+index.idRol).removeClass('hol');
		this.right.splice(rol,1);
	}

	eliminarBase(rol){
		swal({
			title: '¿Seguro que quieres eliminar este Rol?',
			text: 'Si usted elimina el Rol "'+rol.nombreRol+'" se eliminara de forma permanente.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Confirmar'
		}).then((result) => {
			if (result.value) {
				this._perfilesService.eliminaRol(rol.idRolPerfil)
				.subscribe(result=>{
					swal(
						'Eliminado!',
						result.message,
						'success'
						)
					this.ngOnInit();
					$('#'+rol.idRol).removeClass('hol');
				},
				error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
					}
				})	
			}
		})
		
	}

	guarda(){
		
				let nombrePerfil = $('#nombrePerfil').val();
				let data = {
					perfil:{
						idPerfil:this.idPerfil,
						nombrePerfil:nombrePerfil
					},
					roles:this.right
				}
				if(nombrePerfil.length != 0){
			
				this._perfilesService.modificaPerfil(data).subscribe(
					response=>{
								this.ngOnInit();
						this.right = [];
					swal({
						type: 'success',
						title: 'Exito',
						text: 'Perfil modificado correctamente'
 
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
					text: 'Agrega un nombre al perfil'
 
				});
		
	}
		







				
		

	}
}
