import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PersonaModel } from '../../models/persona.model';
import { CursoService } from '../../services/curso.service';
import { TemasService} from '../../services/tema.service';
import {ModulosService} from '../../services/modulo.service'
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule} from '@angular/material';
import swal from'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.component.html',
  styleUrls: ['./practicas.component.css'],
  providers: [PersonaService,CursoService, TemasService,ModulosService]
})
export class PracticasComponent implements OnInit {

	public titulo:string;
	public persona:PersonaModel;
	public alertRegister;
	public url:string;
	public alumnos;
	public cursos;
	public cur;
	public alumnosreales;
	public idCurso;
	public curso;
	public curso2;
	public modulos;
	public aprendizajes;
	public requisitos;
	public temas;
	public temas2;
	public contenidos;
	public getmodulo;
	public idTema;
	public califsTema = [];
	public califsModulo = [];
	public promedioModulo;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _cursoService:CursoService,
  	public _personaService:PersonaService,
  	private _temaService:TemasService,
  	private _moduloService:ModulosService,
	public dialog: MatDialog
		) {
  	this.titulo = 'Practicas';
	this.url = GLOBAL.url; 
  }

  ngOnInit() {
  	this.getAlumnos();
  }

  getAlumnos() {
		this._route.params.forEach((params: Params)=>{
			let idPersona=params["idPersona"];
			this._personaService.obtenerAlumnos(idPersona).subscribe(response=>{
				if(!response){
					this._router.navigate(['/']);
				}else{
					this.cursos = response.cursosPersona;
					this.alumnos = response.alumnosxCurso;
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					var body = JSON.parse(error._body);
				}
			}
			);
		});
	}

	mostrarAlumnos(idCurso,idModulo,idTema) {
		this.idTema = idTema;
		 this.getmodulo = idModulo;
		$(".modulitos").hide();
		$(".alumnitos").show();
		$("#back").show();
		
		for (var i = 0; i < this.alumnos.length; ++i) {
			if (this.alumnos[i].curso == idCurso) {
				this.alumnosreales = this.alumnos[i].alumnos;
			}
		}
	}

	mostrarModulos(idCurso) {
		$(".cursitos").hide();
		$(".modulitos").show();
		$("#back2").show();
		this.getModulos(idCurso);
	}

	volver() {
		$(".modulitos").show();
		$(".alumnitos").hide();
		$("#back").hide();
	}

	volver2() {
		$(".cursitos").show();
		$(".modulitos").hide();
		$("#back2").hide();
	}

	getMisCursos() {
		this._route.params.forEach((params: Params)=>{
			let idPersona=params["idPersona"];
			this._personaService.getPersonaCurso(idPersona).subscribe(response=>{
				if(!response){
					this._router.navigate(['/']);
				}else{
					this.cursos = response;
					
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					var body = JSON.parse(error._body);
				}
			}
			);
		});
	}

	getModulos(idCurso2){
					this._cursoService.vistaCurso(idCurso2).subscribe(
			response=>{
				this.curso = response.curso[0];
				this.modulos = response.contenido.sort(function(a, b) {return a.modulo.numeroModulo - b.modulo.numeroModulo});
				this.requisitos = response.requisitos;
				this.aprendizajes = response.aprendizajes;
				this.getCalifMod();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})

	}

	public getCalifTema(idModulo){
		for(var x in this.modulos){
          if(idModulo == this.modulos[x].modulo.idModulo){
             this.temas2=this.modulos[x].modulo.temas;
             for(var g in this.modulos[x].modulo.temas){
               this._temaService.obtenerCalifTemas(this.modulos[x].modulo.temas[g].idTema).subscribe(response=>{
                 if(response.temas[0].califTema.length == 0){
                 }else{
                 	this.califsTema.push({idTema:response.temas[0].tema[0].idTema ,califTema:response.temas[0].califTema[0].califTema});
                 }
               });
             }  
          }
        }
	}

	public getCalifMod(){
		for(var a in this.modulos){
			this._moduloService.obtenerCalifModulos(this.modulos[a].modulo.idModulo).subscribe(response=>{
				if(response.modulos[0].califModulo.length != 0){
					this.califsModulo.push({idModulo:response.modulos[0].modulo[0].idModulo,califModulo:response.modulos[0].califModulo[0].califModulo});
				}
			})			
		}
	}



}
