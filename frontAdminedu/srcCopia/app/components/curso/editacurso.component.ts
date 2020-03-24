import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


import { PruebasModel } from '../../models/pruebas.model';
import { CursosModel } from '../../models/curso.model';
import { CategoriaModel } from '../../models/categoria.model';
import { SubcategoriaModel } from '../../models/subCategorias.model';
import { RequisitosModel } from '../../models/requisitos.model';
import { RequisitoCursoModel } from '../../models/requisitoCurso.model';
import { CategoriaaprendizajeModel } from '../../models/categoriaaprendizajeCurso.model';

import { CatalogosService } from '../../services/catalogos.service';
import { CursoService } from '../../services/curso.service';
import { AdministradorService } from '../../services/administrador.service'
import { GLOBAL } from '../../services/global';
import swal from 'sweetalert2';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'app-editacurso',
	templateUrl: './editaCurso.component.html',
	styleUrls: ['./curso.component.css'],
	providers: [CursoService,CatalogosService]
})
export class EditaCurso implements OnInit {
	public url:string;

	public curso:CursosModel;
	public requisitoCurso:RequisitoCursoModel;
	public aprendizaje:CategoriaaprendizajeModel;
	public categorias:CategoriaModel;
	public idCategoria;
	public idSubCategoria;
	public subCategorias:SubcategoriaModel;
	public idCurso;
	public requisitos;
	public aprendizajes;
	public arrRequisitos = [];
	public arrAprendizaje = [];
	public valida1;
	public valida2;
	public tipoCurso = [{valor:1,descripcion:'Normal'}
	,{valor:2,descripcion:'Certificación'}];
	public filesToUpload: Array<File>;
	public token;

	constructor(private activatedRoute:ActivatedRoute,
		private _cursoService:CursoService,
		private _catalogosService:CatalogosService,
		private _administradorService:AdministradorService,
		private router: Router){
		this.activatedRoute.params.subscribe(parametros =>{
			this.idCurso = parametros.idCurso;
			this.curso = new CursosModel('','','','','','','','','','');
			this.requisitoCurso = new RequisitoCursoModel('','','');
			this.aprendizaje = new CategoriaaprendizajeModel('','','');
			this.url = GLOBAL.url;
			this.token = this._administradorService.getToken();
		});
	}
	public ngOnInit(){
		this._cursoService.obtenerCurso(this.idCurso).subscribe(
			result=>{
				this.curso = result.curso[0];
				this.idCategoria = result.categoria[0];
				this.idSubCategoria = result.subCategoria[0];
				this.requisitos = result.requisitos;
				this.aprendizajes = result.aprendizajes;
				this._catalogosService.obtenerCategorias().subscribe(
					response=>{
						this.categorias = response.categorias;
						this._catalogosService.obtenerSubCategorias(this.idCategoria.idCategoriacurso).subscribe(
							response=>{
								this.subCategorias = response.subCategoria;
							},error=>{
								var errorMensaje = <any>error;
								if (errorMensaje != null) {
									var body = JSON.parse(error._body);
									console.log(error)
								}
							}
							)
					},error=>{
						var errorMensaje = <any>error;
						if (errorMensaje != null) {
							var body = JSON.parse(error._body);
							console.log(error)
						}
					})
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	cargaSubcategoria(){
		let idCategoria = (<HTMLInputElement>document.getElementById('categoria')).value;
		this._catalogosService.obtenerSubCategorias(idCategoria).subscribe(
			response=>{
				this.subCategorias = response.subCategoria;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			}
			)
	}

	addRequisito(){
		this.arrRequisitos.push({descripcionRequisitoCurso:this.requisitoCurso.descripcionRequisitoCurso});
		this.valida1 = this.arrRequisitos;
		this.requisitoCurso = new RequisitoCursoModel('','','');
	}

	eliminaRequisito(index){
		let requisito = this.arrRequisitos.findIndex( record => record === index );
		this.arrRequisitos.splice(requisito,1);
		// console.log(this.arrRequisitos);
	}

	addAprendizaje(){
		this.arrAprendizaje.push({descripcionCategoriaaprendizajeCurso:this.aprendizaje.descripcionCategoriaaprendizajeCurso});
		this.valida2 = this.arrAprendizaje;
		this.aprendizaje = new CategoriaaprendizajeModel('','','');
		// console.log(this.arrAprendizaje)
	}

	eliminaAprendizaje(index){
		let aprendizaje = this.arrAprendizaje.findIndex( record => record === index );
		this.arrAprendizaje.splice(aprendizaje,1);
		console.log(this.arrAprendizaje);
	}

	editarCurso(){
		let data = {
			'curso' : this.curso,
			'requisitos': this.arrRequisitos,
			'aprendizaje': this.arrAprendizaje
		}
		// console.log(data.curso.imagenCurso)
		this._cursoService.editarCurso(data).subscribe(
			response=>{
				if (!this.filesToUpload) {					
					return swal("Exito", 'Curso Actualizado', "success"),this.ngOnInit(),
					this.arrRequisitos = [],
					this.arrAprendizaje = [],
					this.valida1 = this.arrRequisitos,
					this.valida2 = this.arrAprendizaje;

				}else{
					this.makeFileRquest(this.url+'subeImagenCurso/'+data.curso.idCurso,
						[], this.filesToUpload).then(
						(result:any)=>{
							// this.router.navigate(['/crearCurso']);
							return swal("Exito", 'Curso Actualizado', "success"),this.ngOnInit(),
							this.arrRequisitos = [],
							this.arrAprendizaje = [],
							this.valida1 = this.arrRequisitos,
							this.valida2 = this.arrAprendizaje;
						}
						).catch(error=>{
							console.log(`${error}`);
						})
					}
				},
				error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						console.log(error)
					}
				}
				)
	}

	eliminaRequisitoBase(idRequisito,descripcion){
		swal({
			title: '¿Seguro que quieres eliminar este Requisito?',
			text: 'Si usted elimina el Requisito "'+descripcion+'" se eliminara de forma permanente.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Confirmar'
		}).then((result) => {
			if (result.value) {
				this._cursoService.eliminaRequisito(idRequisito)
				.subscribe(result=>{
					swal(
						'Eliminado!',
						result.message,
						'success'
						)
					this.ngOnInit();
				},
				error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						console.log(error)
					}
				})
			}
		})
	}

	eliminaAprendizajeBase(idAprendizaje,descripcion){
		swal({
			title: '¿Seguro que quieres eliminar este Requisito?',
			text: 'Si usted elimina el Requisito "'+descripcion+'" se eliminara de forma permanente.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Confirmar'
		}).then((result) => {
			this._cursoService.eliminaAprendizaje(idAprendizaje)
			.subscribe(result=>{
				swal(
					'Eliminado!',
					result.message,
					'success'
					)
				this.ngOnInit();
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
		})
	}

	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRquest(url:string,params:Array<string>, files:Array<File>){
		let token = this.token;
		return new Promise(function(resolve,reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append('image',files[i],files[i].name)
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
			xhr.open('POST',url,true);
			xhr.setRequestHeader('Authorization',token);
			xhr.send(formData);
		})
	}
}