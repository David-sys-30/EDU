import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import {ModulosService} from '../../services/modulo.service';
import { PersonaModel } from '../../models/persona.model';
import { AdministradorService } from '../../services/administrador.service';
import { CursoService } from '../../services/curso.service';
import { TemasService } from '../../services/tema.service';
import {ContenidoService} from '../../services/contenido.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule} from '@angular/material';
import swal from'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  providers: [PersonaService,CursoService,TemasService,ModulosService,AdministradorService,ContenidoService]
})
export class AlumnosComponent implements OnInit {

	public titulo:string;
	public identity;
	public persona:PersonaModel;
	public alertRegister;
	public url:string;
	public alumnos;
	public cursos;
	public cur;
	public alumnosreales;
	public perfil;
	public curso;
	public modulos;
	public aprendizajes;
	public requisitos;
	public caltemas;
	public caltemas0 = [];
	public caltemas1 = [];
	public caltemas2 = [];
	public caltemas3= [];
	public calTemasFi = [];
	public calModFi = [];
	public calmod;
	public sum;
	public sum2;
	public sum3;
	public sum4;
	public avance;
	public duracion;
	public califsModulo = [];
	public popidPersona;
	public califCurso;
	public contenido;


  constructor(
  	private _personaservice:PersonaService,
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _contenidoService:ContenidoService,
  	private _cursoService:CursoService,
  	private _temasService:TemasService,
  	private _moduloService:ModulosService,
		public _personaService:PersonaService,
		private _administradorService:AdministradorService,
		public dialog: MatDialog
		) {
  	this.titulo = 'Alumnos';
	this.url = GLOBAL.url;
	this.identity = this._administradorService.getIdentity();
  }

  ngOnInit() {
  	this.getAlumnos();
  	this.caltemas = {"0": "", "1": "", "2": "", "3": ""};
  	this.calmod = {"0": "", "1": "", "2": "", "3": ""};
  	this.sum = 0;
  	this.sum2 = 0;
  	this.sum3 = 0;
  	this.sum4 = 0; 	
  }

  getIdUsuario(idcurso){
  	this._route.params.forEach((params: Params)=>{
  		let id=params["idPersona"];
  		// this._personaservice.getUsuarioPersonaCurso(this.identity.idAdministrador,idcurso,id).subscribe(response=>{
    //     this.popidPersona = response.idUsuarioPersonaCurso;
    //   })
  		
  	})
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

	mostrarAlumnos(idCurso, Curso) {

		$(".cursitos").hide();
		$(".alumnitos").show();
		$("#back").show();
		for (var i = 0; i < this.alumnos.length; ++i) {
			if (this.alumnos[i].curso == idCurso) {
				this.alumnosreales = this.alumnos[i].alumnos;
			}
		}
		this.cur = Curso;
		this.getModulos(idCurso);
	}

	mostrarPerfil(Alumno,idCurso,idUsuario) {
		this._route.params.forEach((params: Params)=>{
			let idPersona=params["idPersona"];

			this.getIdUsuario(idCurso);
			this._personaservice.getUsuarioPersonaCurso(idPersona,idCurso,idUsuario).subscribe(response=>{
				this.popidPersona = response.idUsuarioPersonaCurso;
				this._cursoService.obtenerCalifCurso(this.popidPersona).subscribe(response=>{
					if(response.CalifCurso == ""){

					}else{
						this.getCalifTemas();
						this.califCurso = response.CalifCurso[0].califCurso;
					}
					
				})
			})
			
		$(".alumnitos").hide();
		$(".perfil").show();
		$("#back").hide();
		$("#back2").show();
		$(".temas").hide();
		this.perfil = Alumno;
		this.avance = 0;
		this.caltemas1 = [9,8,9];
		this.caltemas2 = [8,6,5];
		this.caltemas3 = [7,8,9];
		this.caltemas = {"0": this.caltemas0, "1": this.caltemas1, "2": this.caltemas2, "3": this.caltemas3};
		this.duracion = 100 / this.modulos.length;
		if (this.perfil.avanceUsuarioPersonaCurso == null) {
			this.perfil.avanceUsuarioPersonaCurso = 0;
		}
		})	
	}

	volver() {
		$(".cursitos").show();
		$(".alumnitos").hide();
		$("#back").hide();
	}

	volver2() {
		$(".alumnitos").show();
		$(".perfil").hide();
		$("#back").show();
		// $("#back2").hide();
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
				this.modulos = response.contenido;
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

	public getCalifMod(){
		for(var a in this.modulos){
			this._moduloService.obtenerCalifModulos(this.modulos[a].modulo.idModulo).subscribe(response=>{
				if(response.modulos[0].califModulo.length != 0){
					this.califsModulo.push({idModulo:response.modulos[0].modulo[0].idModulo,califModulo:response.modulos[0].califModulo[0].califModulo});						
				}
			})			
		}
	}

	getCalifTemas(){
		var a;
		var b;
		var contador;
		let conta2 = 0;
		let numTem;
		let c = 2;
		let m1 = false;
		let m2 = false;
		let m3 = false;
		let m4 = false;
		for (a = 0; a < this.modulos.length;++a){
			for(b = 0; b < this.modulos[a].modulo.temas.length;++b){
				numTem = this.modulos[a].modulo.temas.length
				contador = a;
				this._temasService.obtenerCalifTemas(this.modulos[a].modulo.temas[b].idTema).subscribe(response=>{
					if(response.temas[0].califTema == ""){

					}else{
						this.calTemasFi.push({idTema:response.temas[0].evalTema[0].idTema_Evaluaciontema,califTema:response.temas[0].califTema[0].califTema,idModulo:response.temas[0].tema[0].idModulo_Tema})
					}
				},
				error => {
					var errorMessage = <any>error; 
					if(errorMessage != null){
						var body = JSON.parse(error._body);
					}
			});
			}
		}
	}

	muestraTemas(idmodulo){
		$(".temas"+idmodulo).toggle('2000');
	}

	muestraDocumentos(idTema){
		this._contenidoService.getdocumentos(1,idTema).subscribe(response=>{
            this.contenido = response.contenidoeval[0];
          })
		$(".ll"+idTema).toggle('2000');
	}

	ocultaDocumentos(idTema){
		$(".ll"+idTema).toggle('2000');
	}

}

