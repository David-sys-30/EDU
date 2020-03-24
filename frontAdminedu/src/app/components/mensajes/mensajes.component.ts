import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PersonaModel } from '../../models/persona.model';
import { CursoService } from '../../services/curso.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as $ from 'jquery';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
  providers: [PersonaService,CursoService]
})
export class MensajesComponent implements OnInit {
	public titulo:string;
	public persona:PersonaModel;
	
	public url:string;
	public alumnos;
	public cursos;
	
	public alumnosreales;
	public idCurso;
	public curso;
	public idPersona;
	

	
  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _cursoService:CursoService,
  	public _personaService:PersonaService,
	) { 
  	this.titulo = 'Mensajes';
	this.url = GLOBAL.url; }

  ngOnInit() {
  	this.getAlumnos();
  }
  getAlumnos() {
		this._route.params.forEach((params: Params)=>{
			this.idPersona=params["idPersona"];
			this._personaService.obtenerAlumnos(this.idPersona).subscribe(response=>{
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

	mostrarAlumnos(idCurso) {
		 
		$(".cursitos").hide();
		$(".alumnitos").show();
		$("#back").show();
		this.idCurso = idCurso;
		for (var i = 0; i < this.alumnos.length; ++i) {
			if (this.alumnos[i].curso == idCurso) {
				this.alumnosreales = this.alumnos[i].alumnos;
			}
		}
		
	}

	

	volver() {
		$(".cursitos").show();
		$(".alumnitos").hide();
		$("#back").hide();
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

	


}



