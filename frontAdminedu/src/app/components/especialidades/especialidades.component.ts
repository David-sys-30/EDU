import { Component, OnInit, Inject } from '@angular/core';
import { EspecialidadModel } from '../../models/especialidades.model';

import { CatalogosService } from '../../services/catalogos.service';
import { AdministradorService } from '../../services/administrador.service';
import { PersonaService } from '../../services/persona.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import swal from'sweetalert2';
export interface DialogData {
	idCatalogoespecialidad:string;
	descripcionCatalogoespecialidad:string;
}

@Component({
	selector: 'app-especialidades',
	templateUrl: './especialidades.component.html',
	styleUrls: ['./especialidades.component.css'],
	providers: [CatalogosService, AdministradorService, PersonaService]
})
export class EspecialidadesComponent implements OnInit {

	public especialidades;

	public identity;
	public permisos;
	public ModificarEspeperm;
	public AnadirEspeperm;

	constructor(
		public dialog: MatDialog,
		public _catalogosService:CatalogosService,
		private _administradorService:AdministradorService,
		private _personaService:PersonaService
		) {
		this.identity = this._administradorService.getIdentity();
	}

	ngOnInit() {
		this._catalogosService.getEspecialidades().subscribe(
			response=>{
				this.especialidades = response.especialidades;
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
							this.ModificarEspeperm = 1
							break;

						case 24:
							this.AnadirEspeperm = 1
							break;
						
						default:
							// code...
							break;
					}
				}
			})
	}

	openDialog(){
		let dialogRef = this.dialog.open(InsertaEspecialidad, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}
	openModificar(id,descripcion):void{
		let dialogRef = this.dialog.open(modificarEspecialidad, {
			width: '400px',
			data:{
				idCatalogoespecialidad:id,
				descripcionCatalogoespecialidad:descripcion
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});

	}
}

@Component({
	selector: 'app-insertaEspecialidad',
	templateUrl: './insertarEspecialidad.component.html',
	styleUrls: ['./especialidades.component.css'],
	providers:[CatalogosService]
})
export class InsertaEspecialidad{

	public especialidad:EspecialidadModel;

	constructor(
		private _catalogosService:CatalogosService,
		public dialogRef: MatDialogRef<InsertaEspecialidad>) {
		this.especialidad = new EspecialidadModel('','');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	agregarEspecialidad(){
		this._catalogosService.insertarEspecialidad(this.especialidad).subscribe(
			response=>{
				this.dialogRef.close();
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			)
	}
	

}


@Component({
	selector: 'app-insertaEspecialidad',
	templateUrl: './modificarEspecialidad.component.html',
	styleUrls: ['./especialidades.component.css'],
	providers:[CatalogosService]
})

export class modificarEspecialidad{
	public especialidades:EspecialidadModel;
	constructor(private _catalogosService:CatalogosService,
		public dialogRef: MatDialogRef<modificarEspecialidad>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {
		this.especialidades = this.data;
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
		this._catalogosService.modificarEspecialidad(this.especialidades)
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


