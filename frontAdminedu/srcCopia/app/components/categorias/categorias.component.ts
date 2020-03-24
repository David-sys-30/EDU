import { Component, OnInit, Inject } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { CategoriaModel } from '../../models/categoria.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
	idCategoriacurso:string;
	nombreCategoriacurso:string;
}

@Component({
	selector: 'app-categorias',
	templateUrl: './categorias.component.html',
	styleUrls: ['./categorias.component.css'],
	providers:[CatalogosService]
})
export class CategoriasComponent implements OnInit {

	public categorias:CategoriaModel;
	public nombreCategoria;
	public idCategoria;
	

	constructor(public dialog: MatDialog,private _catalogosService:CatalogosService) {
		this._catalogosService.obtenerCategorias().subscribe(
			response=>{
				this.categorias = response.categorias;
				// console.log(this.categorias[0]);
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			}
			)
	}

	public ngOnInit() {
		this._catalogosService.obtenerCategorias().subscribe(
			response=>{
				this.categorias = response.categorias;
				// console.log(this.categorias[0]);
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			}
			)
	}
	public openDialog(): void {
		let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public openModificar(id,nombre):void{
		this.nombreCategoria = nombre;
		this.idCategoria = id;
		let dialogRef = this.dialog.open(ModificarCategoria, {
			width: '400px',
			data:{
				idCategoria:this.idCategoria,
				nombreCategoria:this.nombreCategoria
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

}

@Component({
	selector: 'app-emergente',
	templateUrl: './emergente.component.html',
	styleUrls: ['./categorias.component.css'],
	providers:[CatalogosService]
})
export class DialogOverviewExampleDialog{

	public categorias:CategoriaModel;

	constructor(
		private _catalogosService:CatalogosService,
		public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {
		this.categorias = new CategoriaModel('','');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarCategoria(){
		console.log(this.categorias)
		this._catalogosService.registraCategoria(this.categorias).subscribe(
			response=>{
				let categoria = response.categoria;				
				if (!categoria) {
					console.log('Error al registrar Categoria');
				}else{
					console.log(response.message);
					console.log(response)
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
	selector: 'app-modificar',
	templateUrl: './modificarCategoria.component.html',
	styleUrls: ['./categorias.component.css'],
	providers:[CatalogosService]
})
export class ModificarCategoria{

	public categorias:CategoriaModel;
	constructor(private _catalogosService:CatalogosService,
		public dialogRef: MatDialogRef<ModificarCategoria>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {
		this.categorias = this.data;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	modificarCategoria(){
		this._catalogosService.modificarCategoria(this.categorias)
		.subscribe(response=>{
			console.log(response.message);
			this.dialogRef.close();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
				console.log(error)
			}
		});
}
}


