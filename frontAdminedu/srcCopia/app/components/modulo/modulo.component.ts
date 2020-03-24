import { Component, OnInit, Inject } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';
import { ModulosService } from '../../services/modulo.service';
import { ModulosModel } from '../../models/modulo.model';
import { ExamenService } from '../../services/examen.service';
import { ExamenModel } from '../../models/examen.model';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Data {
	idCurso_Modulo:string
}

export interface viewExamen{
	idExamen:string
}

export interface dataEditar{
	idModulo:string,
	nombreModulo:string,
	numeroModulo:string,
	idCurso_Modulo:string,
	statusModulo:string,
	duracionModulo:string
}

export interface idModulo{
	idModulo:string,
	nombreCurso:string,
	nombreModulo:string
}

@Component({
	selector: 'app-modulo',
	templateUrl: './modulo.component.html',
	styleUrls: ['./modulo.component.css'],
	providers: [ModulosService,ExamenService]
})
export class ModuloComponent implements OnInit {
	public idCurso;
	public nombreCurso;
	public modulos = [];
	public examenes;
	public valida;

	constructor(
		private dragulaService: DragulaService,
		private _moduloService:ModulosService,
		private _examenService:ExamenService,
		public dialog: MatDialog,
		private activatedRoute:ActivatedRoute
		) {
		this.activatedRoute.params.subscribe(parametros =>{
			this.idCurso = parametros.idCurso;
			this.nombreCurso = parametros.nombreCurso;

		});
		this.dragulaService.dropModel("modulos").subscribe(args => {
			args.targetModel.forEach(function(element,index){
				args.targetModel[index]['numeroModulo'] = index+1
			})
			// console.log(args.targetModel);
			this._moduloService.actualizaNumero(args.targetModel).subscribe(
				result=>{
					// this.ngOnInit();
				},
				error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						console.log(error)
					}
				}
				)
		});
	}

	public ngOnInit() {
		this._moduloService.obtenerModulos(this.idCurso).subscribe(
			result=>{
				this.modulos = result.modulo;
				// console.log(result)
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	openExamen(idExamen){
		let dialogRef = this.dialog.open(VerExamen, {
			width:'1000px',
			data:{
				idExamen:idExamen
			}
		})

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public openDialog(): void {
		let dialogRef = this.dialog.open(RegistraModulo, {
			width: '400px',
			data:{
				idCurso_Modulo:this.idCurso
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public addExamen(idModulo,nombre){
		let dialogRef = this.dialog.open(AgregaExamen,{
			width: '600px',
			data:{
				idModulo:idModulo,
				nombreCurso:this.nombreCurso,
				nombreModulo:nombre
			}
		})
		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public editarModulo(idModulo, nombre, numero, idCurso, status, duracion){
		let  dialogRef = this.dialog.open(EditaModulo,{
			width: '400px',
			data:{
				idModulo:idModulo,
				nombreModulo:nombre,
				numeroModulo:numero,
				idCurso_Modulo:idCurso,
				statusModulo:status,
				duracionModulo:duracion
			}
		})
		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

}

@Component({
	selector: 'app-registrarModulo',
	templateUrl: './registrarModulo.component.html',
	styleUrls: ['modulo.component.css'],
	providers: [ModulosService]
})

export class RegistraModulo implements OnInit{

	public modulo:ModulosModel;
	public idCurso;
	constructor(
		public dialogRef: MatDialogRef<RegistraModulo>,
		private _moduloService:ModulosService,
		@Inject(MAT_DIALOG_DATA) public data: Data
		){
		this.idCurso = data.idCurso_Modulo;
		this.modulo = new ModulosModel('','','',this.idCurso,'1','');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarModulo(){
		this._moduloService.registrarModulo(this.modulo).subscribe(
			result=>{
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	ngOnInit(){
		
	}
}


@Component({
	selector: 'app-modulo',
	templateUrl: './editarModulo.component.html',
	styleUrls: ['./modulo.component.css'],
	providers: [ModulosService]
})

export class EditaModulo implements OnInit {
	
	public modulo;
	constructor(
		public dialogRef: MatDialogRef<EditaModulo>,
		private _moduloService:ModulosService,
		@Inject(MAT_DIALOG_DATA) public data: dataEditar
		){
		this.modulo = data;
	}
	onNoClick(): void {
		this.dialogRef.close();
	}

	actualizaModulo(){
		this._moduloService.actualizaModulo(this.modulo).subscribe(
			result=>{
				console.log(result.message);
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	ngOnInit(){

	}
}




/*======================================
=            Agregar Examen            =
======================================*/

@Component({
	selector: 'app-addexamen',
	templateUrl: '../examen-modulo/addExamen.component.html',
	providers: [ExamenService]
})

export class AgregaExamen {
	public idModulo;
	public nombreCurso;
	public nombreModulo;
	public examen:ExamenModel;
	public duracion = [15,30,45,60,75,90,105,120];
	value: number = 0;
	options: Options = {
		floor: 0,
		ceil: 10
	}
	constructor(
		public dialogRef: MatDialogRef<AgregaExamen>,
		private router: Router,
		private _examenService:ExamenService,
		@Inject(MAT_DIALOG_DATA) public data: idModulo){
		this.idModulo = this.data.idModulo;
		this.examen = new ExamenModel('','','','','','1');
		this.nombreCurso = this.data.nombreCurso;
		this.nombreModulo = this.data.nombreModulo
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	addExamen(){
		this.examen.duracionExamen = $('#duracion').val();
		this.examen.evaluacionExamen = this.value.toString();
		this.examen.idModulo_Examen = this.idModulo;
		this._examenService.crearExamen(this.examen).subscribe(
			response=>{
				// console.log(response.examen);
				this.router.navigate(['/examen-modulo/'+response.examen+'/'+this.nombreCurso+'/'+this.nombreModulo+'/'+this.idModulo]);
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			}
			)
	}
}

/*=====  End of Agregar Examen  ======*/




/*==================================
=            Ver Examen            =
==================================*/

@Component({
	selector: 'app-viewexamen',
	templateUrl: '../examen-modulo/verExamen.component.html',
	providers: [ExamenService]
})

export class VerExamen implements OnInit{
	// this.router.navigate(['/examen-modulo/'+response.examen+'/'+this.nombreCurso+'/'+this.nombreModulo]);
	public examen:ExamenModel;
	public preguntas;
	public respuestas;
	constructor(
		public dialogRef: MatDialogRef<VerExamen>,
		private router: Router,
		private _examenService:ExamenService,
		@Inject(MAT_DIALOG_DATA) public data:viewExamen){
		this.examen = new ExamenModel('','','','','','');
		this._examenService.randomPreguntas(this.data.idExamen).subscribe(
			response=>{
				console.log(response)
				this.examen = response.examen[0];
				this.preguntas = response.preguntas;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	ngOnInit(){
		
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

/*=====  End of Ver Examen  ======*/


