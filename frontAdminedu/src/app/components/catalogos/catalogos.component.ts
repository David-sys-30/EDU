import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css'],
  providers: [AdministradorService, PersonaService]
})
export class CatalogosComponent implements OnInit {

	public identity;
	public permisos;
	public VerCategoriasperm;
	public VerEspecialidadesperm;

  constructor(private _administradorService:AdministradorService,
		private _personaService:PersonaService) {
  	this.identity = this._administradorService.getIdentity();
  }

  ngOnInit() {
  	this._personaService.getPermisos(this.identity[0].admin.idAdministrador).subscribe(response=>{
				this.permisos = response.permisos;
				for (var i = 0; i < this.permisos.length; ++i) {
					switch (this.permisos[i].permiso.idRol_RolPerfil) {
						case 15:
							this.VerCategoriasperm = 1
							break;

						case 17:
							this.VerEspecialidadesperm = 1
							break;
						
						default:
							// code...
							break;
					}
				}
			})
  }

}
