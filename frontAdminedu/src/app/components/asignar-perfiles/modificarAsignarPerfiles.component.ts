import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PerfilesService } from '../../services/perfiles.service';
import { CursoService } from '../../services/curso.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule} from '@angular/material';
import swal from'sweetalert2';
import { DragulaService } from 'ng2-dragula';
import { PerfilModel } from '../../models/perfil.model';
import * as $ from 'jquery';

@Component({
	selector: 'app-modificar-perfiles',
	templateUrl: './modificarAsignarPerfiles.component.html',
	styleUrls: ['./asignar-perfiles.component.css'],
	providers: [PersonaService, PerfilesService, CursoService]
})

export class ModificarPerfilesComponent implements OnInit {

	public idPersona;
	public idCurso;
	public idCurso2;
	public idPersonaCur;
	public personas;
	public perfiles;
	public perfilesPersona;
	public idPerfilPersonaCurso;
	public left = [];
	public right = [];
	public nidCurso;
	public cursos;
	public modCurso;
	public perf;
	public arrPerfiles = [];
	public delPerfiles;


	constructor(
		private activatedRoute:ActivatedRoute,
		private _personaService:PersonaService,
		private _cursoService:CursoService,
		private _perfilesService:PerfilesService,
		private dragulaService: DragulaService,
		private _router: Router
		){
		this.activatedRoute.params.subscribe(parametros=>{
			this.idPersona = parametros.idPersona;
			this.idCurso = parametros.idCurso;
		})
		this.idCurso2 = this.idCurso;
		const Perfil: any = this.dragulaService.find('Perfil'); 
		if (Perfil !== undefined) {
			this.dragulaService.destroy('Perfil'); 
		};
		this.dragulaService.createGroup('Perfil', {
			copy: (lo, source) => {
				return source.id === 'left';
			},
			copyItem: (perfil: PerfilModel) => {
				$('#'+perfil.idPerfil).toggleClass('hol');
				return new PerfilModel(perfil.idPerfil,perfil.nombrePerfil);
			},
			accepts: (el, target, source, sibling) => {
				// To avoid dragging from right to left container
				
				return target.id === 'right';

			}
		});

		this._cursoService.obtenerCursos().subscribe(
			response=>{
				this.cursos = response.curso
			}
			,error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
		
	}

	eliminaPerfil(index){
		let perfil = this.right.findIndex( record => record === index );
		$('#'+index.idPerfil).removeClass('hol');
		this.right.splice(perfil,1);
		
	}

	ngOnInit(){
		this._personaService.getPersona(this.idPersona).subscribe(
			response=>{
				this.personas = response.persona[0];
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
		this._perfilesService.getPerfiles().subscribe(
			respose=>{
				this.left = respose.perfiles;
				    this._perfilesService.getPersonaperfil(this.idPersona,this.idCurso).subscribe(
					response=>{
						this.perfilesPersona = response.personaCurso;
						this.idPerfilPersonaCurso = this.perfilesPersona[0].idCurso;
						
						$('#nombrePerfil').val(response.nombrePerfil)
						this.perfilesPersona.forEach(function(element){
							$('#'+element.idPerfil).addClass('hol');
						})
					},
					error=>{
						var errorMensaje = <any>error;
						if (errorMensaje != null) {
							var body = JSON.parse(error._body);
						}
					})				
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})		

	}

	public actualizarCurso(){
		this.activatedRoute.params.subscribe(parametros=>{
			this.idPersona = parseInt(parametros.idPersona);
			this.idCurso = parseInt(parametros.idCurso);
		})
		this.nidCurso = parseInt($('#selectcurso').val());
		this.idPersonaCur = this.perfilesPersona[0].idPersonaCurso;
		this.modCurso = {idPersona:this.idPersona,idCurso:this.idCurso, idPersonaCurso:this.idPersonaCur, nidCurso:this.nidCurso};
		this._personaService.modificaCurso(this.modCurso).subscribe(
			response=>{
				this.actualizaPerfiles();
				this._router.navigate(['/modificar-perfiles/'+this.idPersona+'/'+this.nidCurso]);
			}
			,error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	public actualizaPerfiles(){
		this.activatedRoute.params.subscribe(parametros=>{
			this.idPersona = parseInt(parametros.idPersona);
		})
		this.idPersonaCur = this.perfilesPersona[0].idPersonaCurso;
		this.perf = {idPersona:this.idPersona,idPersonaCurso:this.idPersonaCur,perfil:this.right};
		this._personaService.modificaPerfiles(this.perf).subscribe(
			response=>{
				// this.ngOnInit();				
				this.getPersPerf();
				this.right = [];
			}
			,error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})

	}

	public getPersPerf(){
		this._perfilesService.getPersonaperfil(this.idPersona,this.idCurso).subscribe(
					response=>{
						this.perfilesPersona = response.personaCurso;
						this.idPerfilPersonaCurso = this.perfilesPersona[0].idCurso;
						
						$('#nombrePerfil').val(response.nombrePerfil)
						this.perfilesPersona.forEach(function(element){
							$('#'+element.idPerfil).addClass('hol');
						})
					},
					error=>{
						var errorMensaje = <any>error;
						if (errorMensaje != null) {
							var body = JSON.parse(error._body);
						}
					})		
	}

	public eliminarBase(idPersPerf,idPer_PersPerf){
		this._personaService.eliminarPerfiles(idPersPerf,idPer_PersPerf).subscribe(
			response=>{
				this.ngOnInit();
			}
			,error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})

	}
}