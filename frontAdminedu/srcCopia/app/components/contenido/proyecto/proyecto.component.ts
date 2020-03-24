import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { ContenidoService } from '../../../services/contenido.service';
import { AdministradorService } from '../../../services/administrador.service';
import { ContenidoModel } from '../../../models/contenido.model';
import { GLOBAL } from '../../../services/global';
import swal from'sweetalert2';
import * as $ from 'jquery';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface ModificarData{
	contenido:{
		idContenido:string,
		idCategoriacontenido_Contenido:string,
		nombreContenido:string,
		idFormatodocumento_Contenido:string,
		rutaContenido:string,
		idTema_Contenido:string,
		statusContenido:string
	},
	evaluacion:{
		idEvaluacioncontenido:string,
		porcentajeEvaluacioncontenido:string
	}
}

@Component({
	selector: 'app-proyecto',
	templateUrl: './proyecto.component.html',
	styleUrls: ['./proyecto.component.css'],
	providers: [ContenidoService]
})
export class ProyectoComponent implements OnInit {

	@Output() cambioEvaluacion = new EventEmitter();
	@Input() idTema;
	value: number = 0;
	options: Options = {
		floor: 0,
		ceil: 10
	}
	public fileList;
	public proyecto;
	public type;
	public muestra;
	public nombreProyecto;
	public tamano;
	public filesToUpload:Array<File>;
	public contenido:ContenidoModel;
	public url;
	public token;
	public contenidoProyecto = [];

	constructor(public dialog:MatDialog,
		private _contenidoService:ContenidoService,
		private _administradorService:AdministradorService) {
		this.contenido = new ContenidoModel('','proyecto','','','','','1');
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this._contenidoService.obtenerTareas(this.idTema).subscribe(
			response=>{
				this.contenidoProyecto = response.contenido;
				// console.log(response)
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			});
	}

	cancelar(){
		this.fileList = null;
		this.filesToUpload = null;
		(<HTMLInputElement>document.getElementById('custom-input')).value = '';
	}


	guardarProyecto(){
		let separa = this.type.split('/');
		let tipo = separa[1];
		this.contenido.idFormatodocumento_Contenido = tipo;
		this.contenido.idTema_Contenido = this.idTema;
		let data = {
			contenido:this.contenido,
			evaluacion:this.value
		}
		this._contenidoService.registraTareas(data).subscribe(
			response=>{
				// console.log(response);
				if (response.resp == false) {
					return swal("Ups!", response.message, "error");
				}else{
					this.makeFileRquest(this.url+'subeDocumento/'+response.contenido[0],
						[], this.filesToUpload).then(
						(result:any)=>{
							swal("Exito", result.message, "success");
							this.cambioEvaluacion.emit(true);
							this.fileList = null;
							this.filesToUpload = null;
							(<HTMLInputElement>document.getElementById('custom-input')).value = '';
							this.ngOnInit();
						})
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						console.log(error)
					}
				})

	}

	openModificar(idContenido:string,
		idCategoriacontenido_Contenido:string,
		nombreContenido:string,
		idFormatodocumento_Contenido:string,
		rutaContenido:string,
		idTema_Contenido:string,
		statusContenido:string,
		idEvaluacion:string,
		porcentaje:string){
		let dialogRef = this.dialog.open(ModificarProyecto,{
			width: '800px',
			data:{
				contenido:{
					idContenido:idContenido,
					idCategoriacontenido_Contenido:idCategoriacontenido_Contenido,
					nombreContenido:nombreContenido,
					idFormatodocumento_Contenido:idFormatodocumento_Contenido,
					rutaContenido:rutaContenido,
					idTema_Contenido:idTema_Contenido,
					statusContenido:statusContenido
				},
				evaluacion:{
					idEvaluacioncontenido:idEvaluacion,
					porcentajeEvaluacioncontenido:porcentaje
				}
			}
		})
		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
			this.cambioEvaluacion.emit(true)
		})
	}

	fileChangeListener($event) {
		this.fileList = $event.target.files;
		this.filesToUpload = <Array<File>>$event.target.files;
		console.log(this.fileList)

		if (this.fileList.length > 0) {
			let file: File = this.fileList[0];
			// console.log('video seleccionado', file);
			let myReader: FileReader = new FileReader();
			let that = this;
			this.muestra = true;
			myReader.onloadend = (loadEvent: any) => {
				// console.log('video', myReader.result);
				this.proyecto = myReader.result;
				this.type = file.type;
				this.muestra = false;
				this.nombreProyecto = file.name;
				this.tamano = file.size/1024/1024;

				console.log(this.type)
			};
			myReader.readAsDataURL(file);
		}
	}

	makeFileRquest(url:string,params:Array<string>, files:Array<File>){
		let token = this.token;
		return new Promise(function(resolve,reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append('documento',files[i],files[i].name)
			}
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));	
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('PUT',url,true);
			xhr.setRequestHeader('Authorization',token);

			xhr.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					var percentage = (e.loaded / e.total) * 100;
					console.log(percentage + "%");
					$('.progress-bar').css("width",percentage + "%");
				}
			};

			xhr.onerror = function(e) {
				console.log('Error');
				console.log(e);
			};
			xhr.onload = function() {
				console.log(this.statusText);
			};
			xhr.send(formData);
		})
	}

}


@Component({
	selector: 'app-modificartarea',
	templateUrl: '../modificarTareas.component.html',
	styleUrls: ['../contenido.component.css'],
	providers: [ContenidoService]
})

export class ModificarProyecto{
	public contenido;
	public evaluacion;
	public value;
	options: Options = {
		floor: 0,
		ceil: 10
	}
	public fileList;
	public proyecto;
	public type;
	public muestra;
	public nombreProyecto;
	public tamano;
	public filesToUpload:Array<File>;
	public url;
	public token;
	constructor(private _contenidoService:ContenidoService,
		public dialogRef:MatDialogRef<ModificarProyecto>,
		@Inject(MAT_DIALOG_DATA) public data:ModificarData){
		this.url = GLOBAL.url;
		this.contenido = this.data.contenido;
		this.evaluacion = this.data.evaluacion;
		this.value = this.evaluacion.porcentajeEvaluacioncontenido; 
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	actualizaProyecto(){
		this.evaluacion.porcentajeEvaluacioncontenido = this.value;
		if (this.type) {
			let separa = this.type.split('/');
			let tipo = separa[1];
			this.contenido.idFormatodocumento_Contenido = tipo;	
		}
		let data = {
			contenido:this.contenido,
			evaluacion:this.evaluacion
		}
		this._contenidoService.actualizaTarea(data).subscribe(
			response=>{
				console.log(response.contenido);
				if (!this.fileList) {
					if (response.resp == false) {
						return swal("Ups!", response.message, "error");
					}
					else{
						return swal("Exito", 'Contenido Actualizado', "success"),
						this.dialogRef.close();
					}
				}else{
					this.makeFileRquest(this.url+'subeDocumento/'+response.contenido,
						[], this.filesToUpload).then(
						(result:any)=>{
							swal("Exito", result.message, "success");
							this.dialogRef.close();
						})
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						console.log(error)
					}
				})

	}

	fileChangeListener($event) {
		this.fileList = $event.target.files;
		this.filesToUpload = <Array<File>>$event.target.files;
		console.log(this.fileList)

		if (this.fileList.length > 0) {
			let file: File = this.fileList[0];
			// console.log('video seleccionado', file);
			let myReader: FileReader = new FileReader();
			let that = this;
			this.muestra = true;
			myReader.onloadend = (loadEvent: any) => {
				// console.log('video', myReader.result);
				this.proyecto = myReader.result;
				this.type = file.type;
				this.muestra = false;
				this.nombreProyecto = file.name;
				this.tamano = file.size/1024/1024;

				// console.log(this.type)
			};
			myReader.readAsDataURL(file);
		}
	}

	makeFileRquest(url:string,params:Array<string>, files:Array<File>){
		let token = this.token;
		return new Promise(function(resolve,reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append('documento',files[i],files[i].name)
			}
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));	
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('PUT',url,true);
			xhr.setRequestHeader('Authorization',token);

			xhr.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					var percentage = (e.loaded / e.total) * 100;
					console.log(percentage + "%");
					$('.progress-bar').css("width",percentage + "%");
				}
			};

			xhr.onerror = function(e) {
				console.log('Error');
				console.log(e);
			};
			xhr.onload = function() {
				console.log(this.statusText);
			};
			xhr.send(formData);
		})
	}
}







