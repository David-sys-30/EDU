import { Component, OnInit, Inject } from '@angular/core';
import { TemasService } from '../../services/tema.service';
import { TemasModel } from '../../models/tema.model';
import { DragulaService } from 'ng2-dragula';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Data {
	idModulo_Tema:string
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
			// console.log(args.targetModel);
			this._temaService.actualizaNumeroTema(args.targetModel).subscribe(
				result=>{
					this.ngOnInit();
				},
				error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						console.log(error)
					}
				}
				)
		});
	}

	public ngOnInit() {
		this._temaService.obtenerTemas(this.idModulo).subscribe(
			result=>{
				this.temas = result.tema;
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
					console.log(error)
				}
			})
	}
}


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
				console.log(result.message);
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
