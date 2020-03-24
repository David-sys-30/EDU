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
	selector: 'app-registraPerfilPersona',
	templateUrl: './registrarPerfilPersona.component.html',
	styleUrls: ['./asignar-perfiles.component.css'],
	providers: [PersonaService, PerfilesService, CursoService]
})

export class RegistraPerfilPersona  implements OnInit{
	public personas;
	public cursos;
	public left = [];
	public right = [];
	public lo:any;
	public arrPerfil = [];
	public idCursos = [];
	public idPersonasCursos = [];
	public personasCursos;
	public cursosMost = [];
	constructor(
		private _personaService:PersonaService,
		private _perfilesService:PerfilesService,
		private _cursoService:CursoService,
		private dragulaService: DragulaService
		){
		const Perfil: any = this.dragulaService.find('Perfil'); 
		if (Perfil !== undefined) {
			this.dragulaService.destroy('Perfil'); 
		};
		this.dragulaService.createGroup('Perfil', {
			copy: (lo, source) => {
				return source.id === 'left';
			},
			copyItem: (perfil: PerfilModel) => {
				$('#'+perfil.idPerfil).addClass('hol');
				return new PerfilModel(perfil.idPerfil,perfil.nombrePerfil);

			},
			accepts: (el, target, source, sibling) => {
				// To avoid dragging from right to left container
				
				return target.id === 'right';
			}
		});

		this._personaService.getPersonas().subscribe(
			response=>{
				this.personas = response.personas;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}

			})

		this._cursoService.obtenerPersonaCursos().subscribe(response=>{
			this.personasCursos = response.personacurso;

			function removeDuplicates(originalArray, prop) {
			     var newArray = [];
			     var lookupObject  = {};

			     for(var i in originalArray) {
			        lookupObject[originalArray[i][prop]] = originalArray[i];
			     }

			     for(i in lookupObject) {
			         newArray.push(lookupObject[i]);
			     }
			      return newArray;
			 }

			this.personasCursos = removeDuplicates(this.personasCursos, "idCurso_PersonaCurso");
			for(var i = 0;i < this.personasCursos.length;i++){
					this.idPersonasCursos.push(this.personasCursos[i].idCurso_PersonaCurso);
				}

		})
		this._cursoService.obtenerCursos().subscribe(
			response=>{
				this.cursos = response.curso;
				for(var i = 0;i < this.cursos.length;i++){
					this.idCursos.push(this.cursos[i].idCurso);
				}
				// console.log(this.idCursos)
				// console.log(this.idPersonasCursos);

				for (var i = 0; i<this.idPersonasCursos.length; i++) {
				    var arrlen = this.idCursos.length;
				    for (var j = 0; j<arrlen; j++) {
				        if (this.idPersonasCursos[i] == this.idCursos[j]) {
				            this.idCursos = this.idCursos.slice(0, j).concat(this.idCursos.slice(j+1, arrlen));
				        }
				    }
				}
				// console.log(this.idCursos)
				for(var c in this.idCursos){
					this._cursoService.obtenerCurso(this.idCursos[c]).subscribe(response=>{
						this.cursosMost.push(response.curso[0]);
						console.log(this.cursosMost)
					})
				}

				
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}

			})

		
	}


	ngOnInit(){

		this._perfilesService.getPerfiles().subscribe(
			respose=>{
				this.left = respose.perfiles;
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
		$('#'+index.idPerfil).removeClass('hol');
		this.right.splice(rol,1);
	}

	agregaPerfil(){
		let idPersona = $('#personas').val();
		let idCurso = $('#cursoPerfil').val();
		let perfil = [];
		this.right.forEach(function(element){
			perfil.push({idPerfil:element.idPerfil})
		})

		let data = {
			'idPersona' : idPersona,
			'perfil':perfil,
			'idCurso': idCurso
		}
		
		this._perfilesService.asignarPerfil(data).subscribe(
			response=>{
				swal("Exito", "Persona asignada con éxito", "success");
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			)		
	}
}