import { Component, OnInit, Inject } from '@angular/core';
import { TemasService } from '../../services/tema.service';
import { TemasModel } from '../../models/tema.model';
import { EvaluacionModel } from '../../models/evaluacion.model';
import { DragulaService } from 'ng2-dragula';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'ng5-slider';
import * as $ from 'jquery';
import swal from'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Data {
	idModulo_Tema:string
}

export interface DataAddEvaluacion{
	idTema:string,
	idModulo:string
}

export interface dataUpdateEvaluacion{
	idEvaluaciontema:string,
	evaluacionEvaluaciontema:string,
	idTema_Evaluaciontema:string,
	idModulo:string
}

export interface dataEditar{
	idTema:string,
	nombreTema:string,
	idModulo_Tema:string,
	descripcionTema:string,
	numeroTema:string,
	statusTema:string
}

@Component({
	selector: 'app-tema',
	templateUrl: './tema.component.html',
	styleUrls: ['./tema.component.css'],
	providers: [TemasService]
})
export class TemaComponent implements OnInit {
	public idModulo;
	public nombreModulo;
	public nombreCurso;
	public suma;
	public temas = [];
	constructor(private dragulaService: DragulaService,
		private _temaService:TemasService,
		public dialog: MatDialog,
		private activatedRoute:ActivatedRoute
		) {
		this.activatedRoute.params.subscribe(parametros =>{
			this.idModulo = parametros.idModulo;
			this.nombreModulo = parametros.nombreModulo;
			this.nombreCurso = parametros.nombreCurso;

		});

		this.dragulaService.dropModel("temas").subscribe(args => {
			args.targetModel.forEach(function(element,index){
				args.targetModel[index]['numeroTema'] = index+1
			})
			this._temaService.actualizaNumeroTema(args.targetModel).subscribe(
				result=>{
					//this.ngOnInit();
				},
				error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
					}
				}
				)
		});
	}

	agregaEvaluacion(idTema){
		let dialogRef = this.dialog.open(AddEvaluacionTema, {
			width: '400px',
			data:{
				idTema:idTema,
				idModulo:this.idModulo
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			this._temaService.obtenerTemas(this.idModulo).subscribe(
				result=>{
					this.temas = result.tema.sort(function (a, b) { return a.numeroTema - b. numeroTema});
					this._temaService.suma(this.idModulo).subscribe(
						suma=>{
							if (suma.suma == false) {
								this.suma = null
							}else{
								this.suma = suma.suma[0].suma;
							}
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
		});
	}

	modificaEvaluacion(idEvaluacion,evaluacion,idTema){
		let dialogRef = this.dialog.open(ModificarEvaluacionTema, {
			width: '400px',
			data:{
				idEvaluaciontema:idEvaluacion,
				evaluacionEvaluaciontema:evaluacion,
				idTema_Evaluaciontema:idTema,
				idModulo:this.idModulo
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			this._temaService.obtenerTemas(this.idModulo).subscribe(
				result=>{
					this.temas = result.tema.sort(function (a, b) { return a.numeroTema - b. numeroTema});
					this._temaService.suma(this.idModulo).subscribe(
						suma=>{
							this.suma = suma.suma[0].suma;
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
		});
	}

	public ngOnInit() {
		this._temaService.obtenerTemas(this.idModulo).subscribe(
			result=>{
				this.temas = result.tema.sort(function (a, b) { return a.numeroTema - b. numeroTema});
				this._temaService.suma(this.idModulo).subscribe(
					suma=>{
						if (suma.suma == false) {
							this.suma = null
						}else{
							this.suma = suma.suma[0].suma;
						}
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

	public openDialog(): void {
		let dialogRef = this.dialog.open(RegistraTema, {
			width: '400px',
			data:{
				idModulo_Tema:this.idModulo
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public editarTema(idTema, nombre, idModulo, descripcion, numero, status){
		let  dialogRef = this.dialog.open(ActualizaTema,{
			width: '400px',
			data:{
				idTema:idTema,
				nombreTema:nombre,
				idModulo_Tema:idModulo,
				descripcionTema:descripcion,
				numeroTema:numero,
				statusTema:status,
			}
		})
		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

}


/*====================================
=            Agregar Tema            =
====================================*/

@Component({
	selector: 'app-registraTema',
	templateUrl: './registraTema.component.html',
	styleUrls: ['./tema.component.css'],
	providers: [TemasService]
})
export class RegistraTema{
	
	public temas:TemasModel;
	public idModulo;

	constructor(
		public dialogRef: MatDialogRef<RegistraTema>,
		private _temaService:TemasService,
		@Inject(MAT_DIALOG_DATA) public data: Data
		){
		this.idModulo = data.idModulo_Tema;
		this.temas = new TemasModel('','',this.idModulo,'','','1');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarTema(){
		this._temaService.registrarTema(this.temas).subscribe(
			result=>{
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}
}

/*=====  End of Agregar Tema  ======*/




/*=======================================
=            Actualizar Tema            =
=======================================*/

@Component({
	selector: 'app-actualizaTema',
	templateUrl: './actualizaTema.component.html',
	styleUrls: ['./tema.component.css'],
	providers: [TemasService]
})
export class ActualizaTema{
	public temas;
	constructor(
		public dialogRef: MatDialogRef<ActualizaTema>,
		private _temaService:TemasService,
		@Inject(MAT_DIALOG_DATA) public data: dataEditar
		){
		this.temas = data;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	actualizaTema(){
		this._temaService.actualizaTema(this.temas).subscribe(
			result=>{
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

}

/*=====  End of Actualizar Tema  ======*/



/*=======================================
=            Evaluacion Tema            =
=======================================*/

@Component({
	selector: 'app-evaluacionTema',
	templateUrl: './evaluacionTema.component.html',
	styleUrls: ['./tema.component.css'],
	providers: [TemasService]
})
export class AddEvaluacionTema{
	public idTema;
	public idModulo;
	public value = 0;
	options: Options = {
		floor: 0,
		ceil: 100,
		step:1
	}
	public evaluacion:EvaluacionModel;

	constructor(
		public dialogRef: MatDialogRef<AddEvaluacionTema>,
		private _temaService:TemasService,
		@Inject(MAT_DIALOG_DATA) public data: DataAddEvaluacion
		){
		this.idTema = data.idTema;
		this.idModulo = data.idModulo;
		this.evaluacion = new EvaluacionModel('','',this.idTema);
	}

	guardar(){
		this.evaluacion.evaluacion = this.value.toString();
		this._temaService.agregaEvaluacion(this.evaluacion,this.idModulo).subscribe(
			response=>{
				if (response.resp == false) {
					return swal("Ups!", response.message, "error")	
				}
				else{
					return swal("Exito", 'Contenido Actualizado', "success"),
					this.dialogRef.close();
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}

/*=====  End of Evaluacion Tema  ======*/


/*=================================================
=            Modificar evaluacion Tema            =
=================================================*/

@Component({
	selector: 'app-modificaEvaluacionTema',
	templateUrl: './evaluacionTema.component.html',
	styleUrls: ['./tema.component.css'],
	providers: [TemasService]
})
export class ModificarEvaluacionTema{
	public idTema;
	public idModulo;
	public value;
	options: Options = {
		floor: 0,
		ceil: 100,
		step:1
	}
	public evaluacion:EvaluacionModel;

	constructor(
		public dialogRef: MatDialogRef<ModificarEvaluacionTema>,
		private _temaService:TemasService,
		@Inject(MAT_DIALOG_DATA) public data: dataUpdateEvaluacion
		){
		this.idTema = data.idTema_Evaluaciontema;
		this.idModulo = data.idModulo;
		this.value = Number(data.evaluacionEvaluaciontema);
		this.evaluacion = new EvaluacionModel(data.idEvaluaciontema,'',this.idTema);
	}

	guardar(){
		this.evaluacion.evaluacion = this.value.toString();
		this._temaService.modificaEvaluacion(this.evaluacion,this.idModulo).subscribe(
			response=>{
				if (response.resp == false) {
					return swal("Ups!", response.message, "error")	
				}
				else{
					return swal("Exito", 'Contenido Actualizado', "success"),
					this.dialogRef.close();
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}

/*=====  End of Modificar evaluacion Tema  ======*/

