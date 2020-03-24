import { Component, OnInit, Input, Inject } from '@angular/core';
import { ContenidoService } from '../../../services/contenido.service';
import { AdministradorService } from '../../../services/administrador.service';
import { ContenidoModel } from '../../../models/contenido.model';
import { GLOBAL } from '../../../services/global';
import swal from'sweetalert2';
import * as $ from 'jquery';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ModificarData{	
	idContenido:string,
	idCategoriacontenido_Contenido:string,
	nombreContenido:string,
	idFormatodocumento_Contenido:string,
	rutaContenido:string,
	idTema_Contenido:string,
	statusContenido:string	
}

@Component({
	selector: 'app-documento',
	templateUrl: './documento.component.html',
	styleUrls: ['./documento.component.css'],
	providers: [ContenidoService]
})
export class DocumentoComponent implements OnInit {

	@Input() idTema;
	public fileList;
	public documento;
	public type;
	public muestra;
	public nombreDocumento;
	public tamano;
	public filesToUpload:Array<File>;
	public contenido:ContenidoModel;
	public url;
	public token;
	public contenidoDocumento = [];

	constructor(public dialog:MatDialog,
		private _contenidoService:ContenidoService,
		private _administradorService:AdministradorService) {
		this.token = this._administradorService.getToken();
		this.contenido = new ContenidoModel('','documento','','','','','1');
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this._contenidoService.obtenerContenido(this.idTema).subscribe(
			response=>{
				this.contenidoDocumento = response.contenido;
				// console.log(response)
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			});
	}

	guardarDocumento(){
		let separa = this.type.split('/');
		console.log(separa)
		let tipo = separa[1];
		this.contenido.idFormatodocumento_Contenido = tipo;
		this.contenido.idTema_Contenido = this.idTema;

		this._contenidoService.registraContenido(this.contenido).subscribe(
			response=>{
				console.log(response.contenido);
				this.makeFileRquest(this.url+'subeDocumento/'+response.contenido[0],
					[], this.filesToUpload).then(
					(result:any)=>{
						swal("Exito", result.message, "success");
						this.fileList = null;
						this.filesToUpload = null;
						(<HTMLInputElement>document.getElementById('custom-input')).value = '';
						this.ngOnInit();
					})
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
		let dialogRef = this.dialog.open(ModificarDocumento,{
			width: '800px',
			data:{idContenido:idContenido,
				idCategoriacontenido_Contenido:idCategoriacontenido_Contenido,
				nombreContenido:nombreContenido,
				idFormatodocumento_Contenido:idFormatodocumento_Contenido,
				rutaContenido:rutaContenido,
				idTema_Contenido:idTema_Contenido,
				statusContenido:statusContenido}


			})
		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}


	fileChangeListener($event) {
		this.fileList = $event.target.files;
		this.filesToUpload = <Array<File>>$event.target.files;
		// console.log(this.fileList)

		if (this.fileList.length > 0) {
			let file: File = this.fileList[0];
			// console.log('video seleccionado', file);
			let myReader: FileReader = new FileReader();
			let that = this;
			this.muestra = true;
			myReader.onloadend = (loadEvent: any) => {
				// console.log('video', myReader.result);
				this.documento = myReader.result;
				this.type = file.type;
				this.muestra = false;
				this.nombreDocumento = file.name;
				this.tamano = file.size/1024/1024;

				// console.log(this.type)
			};
			myReader.readAsDataURL(file);
		}
	}

	cancelar(){
		this.fileList = null;
		this.filesToUpload = null;
		(<HTMLInputElement>document.getElementById('custom-input')).value = '';
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
	templateUrl: '../modificarDocumento.component.html',
	styleUrls: ['../contenido.component.css'],
	providers: [ContenidoService]
})

export class ModificarDocumento{
	public contenido;
	public evaluacion;
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
		public dialogRef:MatDialogRef<ModificarDocumento>,
		@Inject(MAT_DIALOG_DATA) public data:ModificarData){
		this.url = GLOBAL.url;
		this.contenido = this.data;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	actualizaProyecto(){
		if (this.type) {
			let separa = this.type.split('/');
			let tipo = separa[1];
			this.contenido.idFormatodocumento_Contenido = tipo;	
		}
		this._contenidoService.actualizaDocumento(this.contenido).subscribe(
			response=>{
				console.log(response.contenido);
				if (!this.fileList) {
					return swal("Exito", 'Contenido Actualizado', "success"),
					this.dialogRef.close();
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
