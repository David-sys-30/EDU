import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { PerfilesService } from '../../services/perfiles.service';
import { RolModel } from '../../models/rol.model';
import * as $ from 'jquery';
import swal from'sweetalert2';

@Component({
	selector: 'app-perfiles',
	templateUrl: './perfiles.component.html',
	styleUrls: ['./perfiles.component.css'],
	providers: [PerfilesService]
})
export class PerfilesComponent implements OnInit {
	public perfiles;
	constructor(
		private _perfilesService:PerfilesService
		) {
		
	}

	ngOnInit() {
		this._perfilesService.getPerfiles().subscribe(
			response=>{
				this.perfiles = response.perfiles
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	AltaPerfil(idPerfil){
		var idPerfil = idPerfil;
		this._perfilesService.daraltaperfil(idPerfil).subscribe(result=>{
			swal("Exito", "Perfil dado de alta", "success");
			this.ngOnInit();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})
	}

	BajaPerfil(idPerfil){
		var idPerfil = idPerfil;
		this._perfilesService.darbajaperfil(idPerfil).subscribe(result=>{
			swal("Exito", "Perfil dado de baja", "success");
			this.ngOnInit();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})
	}

}
