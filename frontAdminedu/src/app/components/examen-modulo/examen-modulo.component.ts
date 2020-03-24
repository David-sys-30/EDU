import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Options } from 'ng5-slider';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { ExamenService } from '../../services/examen.service';
import { ExamenModel } from '../../models/examen.model';
import { PreguntaModel } from '../../models/preguntaExamen.model';
import { RespuestaModel } from '../../models/respuestaExamen.model';

export interface updateExamen{
	idExamen:string,
	idModulo:string
}

@Component({
	selector: 'app-examen-modulo',
	templateUrl: './examen-modulo.component.html',
	styleUrls: ['./examen-modulo.component.css'],
	providers: [ExamenService]
})
export class ExamenModuloComponent implements OnInit {
	public nombreCurso;
	public nombreModulo;
	public idExamen;
	public nueva = true;
	public pregunta:PreguntaModel;
	public preguntas;
	public respuestas = [];
	public idModulo;
	public examen:ExamenModel;

	constructor(
		private _examenService:ExamenService,
		public dialog: MatDialog,
		private activatedRoute:ActivatedRoute) {
		this.activatedRoute.params.subscribe(parametros =>{
			this.idExamen = parametros.idExamen;
			this.nombreCurso = parametros.nombreCurso;
			this.nombreModulo = parametros.nombreModulo;
			this.idModulo = parametros.idModulo;
			this.examen = new ExamenModel('','','','','','');
			this.pregunta = new PreguntaModel('',this.idExamen,'','1');
		});
	}

	ngOnInit() {
		this._examenService.getExamen(this.idModulo, this.idExamen).subscribe(
			result=>{
				this.examen = result.examen[0];
				this._examenService.obtenerPreguntas(this.idExamen).subscribe(
					response=>{
						this.preguntas = response.preguntas
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
			}
			)
	}

	openModificar(idExamen,idModulo){
		let dialogRef = this.dialog.open(EditaExamen, {
			width:'1000px',
			data:{
				idExamen:idExamen,
				idModulo:idModulo
			}
		})

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	nuevaPregunta(){
		this.nueva = true;
		this.pregunta = new PreguntaModel('',this.idExamen,'','1');
	}

	cargaRepuestas(idPregunta){
		this._examenService.obtenerRespuestas(idPregunta).subscribe(
			response=>{
				this.pregunta = response.pregunta[0];
				this.respuestas = response.respuestas;
				this.nueva = false;
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	modificarPreguntaExamen(){
		let incorrecta1 = $('#incorrecta1').val();
		let incorrecta2 = $('#incorrecta2').val();
		let incorrecta3 = $('#incorrecta3').val();
		let retroincorrecta1 = $('#retroincorrecta1').val();
		let retroincorrecta2 = $('#retroincorrecta2').val();
		let retroincorrecta3 = $('#retroincorrecta3').val();
		let correcta = $('#correcta').val();
		let retrocorrecta = $('#retrocorrecta').val();

		let idCorrecta = $('#correcta').attr('name').split('.');
		idCorrecta = idCorrecta[1];
		let idIncorrecta1 = $('#incorrecta1').attr('name').split('.');
		idIncorrecta1 = idIncorrecta1[1];
		let idIncorrecta2 = $('#incorrecta2').attr('name').split('.');
		idIncorrecta2 = idIncorrecta2[1];
		let idIncorrecta3 = $('#incorrecta3').attr('name').split('.');
		idIncorrecta3 = idIncorrecta3[1];

		let data = {
			'pregunta':this.pregunta,
			'respuestas':[{
				idRespuesta:idIncorrecta1,
				respuesta:incorrecta1,
				status:0,
				retro:retroincorrecta1
			},
			{
				idRespuesta:idIncorrecta2,
				respuesta:incorrecta2,
				status:0,
				retro:retroincorrecta2
			},
			{
				idRespuesta:idIncorrecta3,
				respuesta:incorrecta3,
				status:0,
				retro:retroincorrecta3
			},
			{
				idRespuesta:idCorrecta,
				respuesta:correcta,
				status:1,
				retro:retrocorrecta
			}]
		}

		this._examenService.modificarPreguntaExamen(data).subscribe(
			response=>{
				this.ngOnInit();
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})

	}

	guardarExamen(){
		let incorrecta1 = $('#incorrecta1').val();
		let incorrecta2 = $('#incorrecta2').val();
		let incorrecta3 = $('#incorrecta3').val();
		let retroincorrecta1 = $('#retroincorrecta1').val();
		let retroincorrecta2 = $('#retroincorrecta2').val();
		let retroincorrecta3 = $('#retroincorrecta3').val();
		let correcta = $('#correcta').val();
		let retrocorrecta = $('#retrocorrecta').val();
		let data = {
			'pregunta':this.pregunta,
			'respuestas':[{
				respuesta:incorrecta1,
				status:0, 
				retro:retroincorrecta1
			},
			{
				respuesta:incorrecta2,
				status:0,
				retro:retroincorrecta2
			},
			{
				respuesta:incorrecta3,
				status:0, 
				retro:retroincorrecta3
			},
			{
				respuesta:correcta,
				status:1,
				retro:retrocorrecta
			}]
		}
		this._examenService.creaPreguntaRespuesta(data).subscribe(
			response=>{
				this.ngOnInit();
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
		
	}
}

/*======================================
=            Editar Examen            =
======================================*/

@Component({
	selector: 'app-updateExamen',
	templateUrl: './addExamen.component.html',
	providers: [ExamenService]
})

export class EditaExamen implements OnInit{
	public idExamen;
	public nombreCurso;
	public nombreModulo;
	public idModulo;
	public examen:ExamenModel;
	public duracion = [15,30,45,60,75,90,105,120];
	public value: number = 0;
	options: Options = {
		floor: 0,
		ceil: 10
	}
	constructor(
		public dialogRef: MatDialogRef<EditaExamen>,		
		private _examenService:ExamenService,
		@Inject(MAT_DIALOG_DATA) public data: updateExamen){
		this.idExamen = this.data.idExamen;
		this.idModulo = this.data.idModulo
		this.examen = new ExamenModel('','','','','','');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit(){
		this._examenService.getExamen(this.idModulo, this.idExamen).subscribe(
			result=>{
				this.examen = result.examen[0];
				this.value = result.examen[0]['evaluacionExamen'];
				

			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			)
	}

	addExamen(){
		this.examen.duracionExamen = $('#duracion').val();
		this.examen.evaluacionExamen = this.value.toString();
		
		
		this._examenService.actualizarExamen(this.examen).subscribe(
			response=>{
					this.dialogRef.close();
				},error=>{
						var errorMensaje = <any>error;
						if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						}
						)
				}
			}

			/*=====  End of Editar Examen  ======*/
