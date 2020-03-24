import { Component, OnInit, Inject } from '@angular/core';
import { RequisitosModel } from '../../models/requisitos.model';
import { CatalogosService } from '../../services/catalogos.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CategoriaModel } from '../../models/categoria.model';
import { SubcategoriaModel } from '../../models/subCategorias.model';

export interface ModificarData {
	idRequisito:string,
	idCategoria:string,
	idSubcategoria:string,
	nombreCategoria:string
}

@Component({
	selector: 'app-requisitos',
	templateUrl: './requisitos.component.html',
	styleUrls: ['./requisitos.component.css'],
	providers: [CatalogosService]
})
export class RequisitosComponent implements OnInit {

	public requisitos:RequisitosModel;
	constructor(
		private _catalogoService:CatalogosService,
		public dialog: MatDialog
		) { }

	public ngOnInit() {
		this._catalogoService.obtenerRequisitos().subscribe(
			response=>{
				this.requisitos = response.requisitos;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	openDialog():void{
		let dialogRef = this.dialog.open(RegistraRequisito,{
			width:'400px'
		});

		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}

	openModificar(idRequisito,idCategoria,idSubcategoria,descripcion){
		let dialogRef = this.dialog.open(ActualizaRequisito,{
			width:'400px',
			data:{
				idRequisito:idRequisito,
				idCategoria:idCategoria,
				idSubcategoriacurso_Requisito:idSubcategoria,
				descripcionRequisito:descripcion
			}
		});

		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}

}

@Component({
	selector: 'app-registraRequisito',
	templateUrl: './registraRequisito.component.html',
	styleUrls: ['./requisitos.component.css'],
	providers: [CatalogosService]
})
export class RegistraRequisito {
	public requisitos:RequisitosModel;
	public categorias:CategoriaModel;
	public subCategorias:SubcategoriaModel;
	constructor(
		private _catalogoService:CatalogosService,
		public dialogRef:MatDialogRef<RegistraRequisito>
		){
		this._catalogoService.obtenerCategorias().subscribe(
			response=>{
				this.categorias = response.categorias;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
		this.requisitos = new RequisitosModel('','','','','','');
	}

	cargaSubcategoria(){
		let idCategoria = (<HTMLInputElement>document.getElementById('categoria')).value;
		this._catalogoService.obtenerSubCategorias(idCategoria).subscribe(
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

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarRequisito(){
		this.requisitos.idSubcategoriacurso_Requisito = (<HTMLInputElement>document.getElementById('subCategoria')).value;
		this._catalogoService.agregarRequisito(this.requisitos).subscribe(
			response=>{
				let requisito = response.requisito;
				if (!requisito) {
					console.log('Error al registrar el requisito');
				}else{
					console.log(response.message);
				}
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

}

@Component({
	selector: 'app-actualizaRequisito',
	templateUrl: './actualizaRequisito.component.html',
	styleUrls: ['./requisitos.component.css'],
	providers: [CatalogosService]
})

export class ActualizaRequisito{
	public requisitos;
	public categorias:CategoriaModel;
	public subCategorias:SubcategoriaModel;
	constructor(private _catalogoService:CatalogosService,
		public dialogRef:MatDialogRef<ActualizaRequisito>,
		@Inject(MAT_DIALOG_DATA) public data:ModificarData){
		this.requisitos = this.data;
		this._catalogoService.obtenerCategorias().subscribe(
			response=>{
				this.categorias = response.categorias;
				this._catalogoService.obtenerSubCategorias(this.requisitos.idCategoria).subscribe(
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
	}

	cargaSubcategoria(){
		let idCategoria = (<HTMLInputElement>document.getElementById('categoria')).value;
		this._catalogoService.obtenerSubCategorias(idCategoria).subscribe(
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

	onNoClick(): void {
		this.dialogRef.close();
	}

	modificarRequisito(){
		// console.log(this.requisitos);
		this._catalogoService.modificarRequisito(this.requisitos)
		.subscribe(response=>{
			console.log(response.message);
			this.dialogRef.close();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
				console.log(error)
			}
		})
	}
}
