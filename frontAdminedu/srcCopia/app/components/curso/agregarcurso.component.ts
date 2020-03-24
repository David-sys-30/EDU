import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';


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
import swal from'sweetalert2';

@Component({
	selector: 'app-agregarCurso',
	templateUrl: './agregarCurso.component.html',
	styleUrls: ['./curso.component.css'],
	providers: [CatalogosService,CursoService]
})

export class AgregarcursoComponent implements OnInit{

	public curso:CursosModel;
	public categorias:CategoriaModel;
	public subCategorias:SubcategoriaModel;
	public requisitos=[];
	public requisitoCurso:RequisitoCursoModel;
	public aprendizaje:CategoriaaprendizajeModel;
	// public arr2;

	public arrRequisito = [];
	public valida1;

	public arrAprendizaje = [];
	public valida2;

	public filesToUpload: Array<File>;
	public url:string;
	public token;

	constructor(
		// public dialogRef:MatDialogRef<AgregarCurso>,
		private router: Router,
		private _catalogosService:CatalogosService,
		private _cursoService:CursoService,
		private _administradorService:AdministradorService
		){
		this._catalogosService.obtenerCategorias().subscribe(
			categorias=>{
				this.categorias = categorias.categorias;
				// console.log(this.categorias)
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
		this.url = GLOBAL.url;
		this.token = this._administradorService.getToken();
		console.log('token === '+this.token);
		this.curso = new CursosModel('','','','','','','','','','0');
		this.requisitoCurso = new RequisitoCursoModel('','','');
		this.aprendizaje = new CategoriaaprendizajeModel('','','');

	}

	ngOnInit(){

	}

	cargaSubcategoria(){
		let idCategoria = (<HTMLInputElement>document.getElementById('categoria')).value;
		this._catalogosService.obtenerSubCategorias(idCategoria).subscribe(
			response=>{
				this.subCategorias = response.subCategoria;
				// console.log(this.subCategorias)
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			}
			)
	}

	cargaRequisito(){
		let idSubcategoria = (<HTMLInputElement>document.getElementById('subCategoria')).value;
		let data = {
			'idSubcategoria':idSubcategoria
		}
		// console.log(data)
		this._catalogosService.obtenerRequisito(data).subscribe(
			response=>{
				this.requisitos = response.requisito
				// console.log(this.requisitos)
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	// getCheckboxes() {
		// 	this.arr2 = this.requisitos.filter(x => x.checked === true)
		// 	.map(x => x.idRequisito);		
		// }

		public addRequisito(){
			this.arrRequisito.push({descripcionRequisitoCurso:this.requisitoCurso.descripcionRequisitoCurso});
			this.valida1 = this.arrRequisito;
			this.requisitoCurso = new RequisitoCursoModel('','','');
		}

		eliminaRequisito(index){
			let requisito = this.arrRequisito.findIndex( record => record === index );
			this.arrRequisito.splice(requisito,1);
			console.log(this.arrRequisito);
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

		agregaCurso(){
			let data = {
				'curso' : this.curso,
				'requisitos': this.arrRequisito,
				'aprendizaje': this.arrAprendizaje
			}
			if (!this.filesToUpload) {
				if (data.curso.imagenCurso == '') {
					return swal("Opps!", 'Selecciona una imagen', "error");
				}
				data.curso.imagenCurso = this.curso.imagenCurso;				
			}
			this._cursoService.registraCurso(data).subscribe(
				response=>{
					console.log(response.curso[0]['idCurso']);
					this.makeFileRquest(this.url+'subeImagenCurso/'+response.curso[0]['idCurso'],
						[], this.filesToUpload).then(
						(result:any)=>{
							this.router.navigate(['/crearCurso']);
							swal("Exito", response.message, "success");
						}
						).catch(error=>{
							console.log(`${error}`);
						})
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

		// Imagen

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

		// End Imagen
	}