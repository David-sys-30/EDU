import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubcategoriaModel } from '../../models/subCategorias.model';
import { CatalogosService } from '../../services/catalogos.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
	idCategoria:string;
}
export interface ModificarData {
	idSubcategoria:string,
	idCategoria:string,
	nombreCategoria:string
}

@Component({
	selector: 'app-subcategorias',
	templateUrl: './subcategorias.component.html',
	styleUrls: ['./subcategorias.component.css'],
	providers: [CatalogosService]
})
export class SubcategoriasComponent implements OnInit {
	public idCategoria;
	public subCategoria:SubcategoriaModel;
	constructor(public dialog: MatDialog,
		private _catalogosService:CatalogosService,
		private activatedRoute:ActivatedRoute
		) {
		this.activatedRoute.params.subscribe(parametros =>{
			this.idCategoria = parametros.idCategoria;
		});
	}

	public ngOnInit() {
		this._catalogosService.obtenerSubCategorias(this.idCategoria).subscribe(
			response=>{
				this.subCategoria = response.subCategoria;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}
	agregarSubcategoria():void{
		let dialogRef = this.dialog.open(AgregarSubcategoria,{
			width:'400px',
			data:{
				idCategoria:this.idCategoria
			}
		});
		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}

	openModificar(id,idCategoriacurso,nombre){
		let idSubcategoria = id;
		let idCategoria = idCategoriacurso;
		let nombreSubcategoria = nombre;
		let dialogRef = this.dialog.open(ModificarSubcategoria,{
			width:'400px',
			data:{
				idSubcategoriacurso:idSubcategoria,
				idCategoriacurso_Subcategoriacurso:idCategoria,
				nombreSubcategoriacurso:nombreSubcategoria
			}
		})
		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}

}


@Component({
	selector: 'app-agregarsubcategoria',
	templateUrl: './agregarSubcategoria.component.html',
	styleUrls: ['./subcategorias.component.css'],
	providers:[CatalogosService]
})
export class AgregarSubcategoria{

	public subCategoria:SubcategoriaModel;
	public idCategoria;

	constructor(
		private _catalogosService:CatalogosService,
		public dialogRef: MatDialogRef<AgregarSubcategoria>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {
		// console.log(data.idCategoria)
		this.idCategoria = data.idCategoria;
		this.subCategoria = new SubcategoriaModel('',this.idCategoria,'');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarSubcategoria(){
		// console.log(this.subCategoria)
		this._catalogosService.agregarSubcategoria(this.subCategoria).subscribe(
			response=>{
				let subCategoria = response.subCategoria;				
				if (!subCategoria) {
					console.log('Error al registrar Categoria');
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
	selector:'app-modificarsubcategoria',
	templateUrl:'./modificarSubcategoria.component.html',
	styleUrls:['./subcategorias.component.css'],
	providers:[CatalogosService]
})
export class ModificarSubcategoria{
	public subCategoria;
	constructor(private _catalogoService:CatalogosService,
		public dialogRef:MatDialogRef<ModificarSubcategoria>,
		@Inject(MAT_DIALOG_DATA) public data:ModificarData){
		this.subCategoria = this.data;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	modificarSubcategoria(){
		this._catalogoService.modificarSubcategoria(this.subCategoria)
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

