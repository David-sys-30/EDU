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

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'app-curso',
	templateUrl: './curso.component.html',
	styleUrls: ['./curso.component.css'],
	providers: [CursoService]
})
export class CursoComponent implements OnInit {
	
	public cursos:CursosModel;
	public url:string;
	constructor(private _cursoService:CursoService) {
		// this.pruebas = new PruebasModel('','');
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this._cursoService.obtenerCursos().subscribe(result=>{
			this.cursos = result.curso;
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
				console.log(error)
			}
		})
	}

}




