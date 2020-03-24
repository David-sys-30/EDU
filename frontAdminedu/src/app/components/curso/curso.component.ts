import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';


import { PruebasModel } from '../../models/pruebas.model';
import { CursosModel } from '../../models/curso.model';
import { CategoriaModel } from '../../models/categoria.model';
import { SubcategoriaModel } from '../../models/subCategorias.model';
import { RequisitosModel } from '../../models/requisitos.model';
import { RequisitoCursoModel } from '../../models/requisitoCurso.model';
import { CategoriaaprendizajeModel } from '../../models/categoriaaprendizajeCurso.model';
import { ModulosService } from '../../services/modulo.service';
import { CatalogosService } from '../../services/catalogos.service';
import { CursoService } from '../../services/curso.service';
import { AdministradorService } from '../../services/administrador.service'
import { GLOBAL } from '../../services/global';
import { PersonaService } from '../../services/persona.service';
import { AdministradorModel } from '../../models/administrador.model';
import swal from'sweetalert2';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'app-curso',
	templateUrl: './curso.component.html',
	styleUrls: ['./curso.component.css'],
	providers: [CursoService, PersonaService,ModulosService]
})
export class CursoComponent implements OnInit {
	
	public cursos:CursosModel;
	public url:string;

	public identity;
	public permisos;
	public ActivarCursoperm;
	public EditarCursoperm;
	public DesactivarCursoperm;
	public DarDeBajaCursoperm;
	public suma;
	public evals = [];


	constructor(private _administradorService:AdministradorService,
		private _moduloService:ModulosService,
		private _cursoService:CursoService,
		private _personaService:PersonaService) {
		// this.pruebas = new PruebasModel('','');
		this.url = GLOBAL.url;
		this.identity = this._administradorService.getIdentity();
	}

	ngOnInit() {
		this._cursoService.obtenerCursos().subscribe(result=>{
			this.cursos = result.curso;
			
			for (var d in this.cursos){
					this._moduloService.suma(this.cursos[d].idCurso).subscribe(
					suma=>{
						if (suma.suma == false) {
							// this.suma = null
						}else{
							this.evals.push(suma);
							
						}
					},
					error=>{
						var errorMensaje = <any>error;
						if (errorMensaje != null) {
							var body = JSON.parse(error._body);
						}
					})
		}this.evals = [];

		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})




		this._personaService.getPermisos(this.identity[0].admin.idAdministrador).subscribe(response=>{
				this.permisos = response.permisos;
				for (var i = 0; i < this.permisos.length; ++i) {
					switch (this.permisos[i].permiso.idRol_RolPerfil) {
						case 2:
							this.ActivarCursoperm = 1
							break;

						case 3:
							this.EditarCursoperm = 1
							break;

						case 4:
							this.DesactivarCursoperm = 1
							break;

						case 5:
							this.DarDeBajaCursoperm = 1
							break;
						
						default:
							// code...
							break;
					}
				}
			})


	}
	public ActivarCurso(idCurso){
		var idcurso = idCurso
		this._cursoService.activacurso(idcurso).subscribe(result=>{
			swal("Exito", "Curso Activado", "success");
			this.ngOnInit()
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})
	}

	public DesactivarCurso(idCurso){
		var idcurso = idCurso
		this._cursoService.desactivacurso(idcurso).subscribe(result=>{
			swal("Exito", "Curso Desactivado", "success");
			this.ngOnInit()
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})
	}

}




