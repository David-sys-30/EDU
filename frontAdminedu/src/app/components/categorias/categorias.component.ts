import { Component, OnInit, Inject } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { CategoriaModel } from '../../models/categoria.model';
import { AdministradorService } from '../../services/administrador.service';
import { PersonaService } from '../../services/persona.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import swal from 'sweetalert2';

export interface DialogData {
	idCategoriacurso:string;
	nombreCategoriacurso:string;
}

@Component({
	selector: 'app-categorias',
	templateUrl: './categorias.component.html',
	styleUrls: ['./categorias.component.css'],
	providers:[CatalogosService, AdministradorService, PersonaService]
})
export class CategoriasComponent implements OnInit {

	public categorias:CategoriaModel;
	public nombreCategoria;
	public idCategoria;

	public identity;
	public permisos;
	public ModificarCategoperm;
	public AnadirCategoperm;
	

	constructor(public dialog: MatDialog,private _catalogosService:CatalogosService,
		private _administradorService:AdministradorService,
		private _personaService:PersonaService) {
		this.identity = this._administradorService.getIdentity();
		this._catalogosService.obtenerCategorias().subscribe(
			response=>{
				this.categorias = response.categorias;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			)
	}

	public ngOnInit() {
		this._catalogosService.obtenerCategorias().subscribe(
			response=>{
				this.categorias = response.categorias;
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			)

		this._personaService.getPermisos(this.identity[0].admin.idAdministrador).subscribe(response=>{
				this.permisos = response.permisos;
				for (var i = 0; i < this.permisos.length; ++i) {
					switch (this.permisos[i].permiso.idRol_RolPerfil) {
						case 18:
							this.ModificarCategoperm = 1
							break;

						case 24:
							this.AnadirCategoperm = 1
							break;
						
						default:
							// code...
							break;
					}
				}
			})
	}
	public openDialog(): void {
		let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public bajaCategoria(idCategoria){
		this._catalogosService.bajaCategoria(idCategoria).subscribe(response=>{
			console.log(response);
			this.ngOnInit();
		})
	}

	public altaCategoria(idCategoria){
		this._catalogosService.altaCategoria(idCategoria).subscribe(response=>{
			console.log(response);
			this.ngOnInit();
		})
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
		this._catalogosService.registraCategoria(this.categorias).subscribe(
			response=>{
				let categoria = response.categoria;				
				if (!categoria) {
				}else{
				}
				this.dialogRef.close();
				
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
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
		swal({
  		title: '¿Seguro?',
  		text: "Se modificará permanentemente.",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sí, estoy seguro'
	}).then((result) => {
		if (result.value) {
		this._catalogosService.modificarCategoria(this.categorias)
		.subscribe(response=>{
			this.dialogRef.close();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		});
	}
	});
}
}


