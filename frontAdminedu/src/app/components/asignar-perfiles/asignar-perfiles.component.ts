import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule} from '@angular/material';
import swal from'sweetalert2';

@Component({
  selector: 'app-asignar-perfiles',
  templateUrl: './asignar-perfiles.component.html',
  styleUrls: ['./asignar-perfiles.component.css'],
  providers: [PersonaService]
})

export class AsignarPerfilesComponent implements OnInit {

	public titulo:string;
	public alertRegister;
	public url:string;
	public persona;

  constructor(
  	private _route: ActivatedRoute,
		private _router: Router,
		public _personaService:PersonaService,
		public dialog: MatDialog
  	) {
  	this.titulo = 'Persona';
	this.url = GLOBAL.url;
  }

  ngOnInit() {
  	this.getPersonas();
  }

  getPersonas(){
    this._route.params.forEach((params: Params)=>{
      this._personaService.getPersonasPerfiles().subscribe(response=>{
        if(!response.personas){
          this._router.navigate(['/']);
        }else{
          this.persona = response.personas;
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
        }
      }
      ); 
    });
  }
}

@Component({
  selector: 'app-editpersona',
  templateUrl: './editasignar-perfiles.component.html',
  styleUrls: ['./editasignar-perfiles.component.css'],
  providers:[PersonaService]
})
export class EditasignarperfilesComponent implements OnInit {

	public alertRegister;
	public url:string;
	public persona;
	public cursos;
	public perfil;
	public cursito;


	@Output() aparecer = new EventEmitter;

	constructor(
		private _personaService:PersonaService,
		private _route: ActivatedRoute,
		private _router: Router) {
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getPersona();
	}

	getPersona() {
		this._route.params.forEach((params: Params)=>{
			let idPersona=params["idPersona"];
			this._personaService.getPersonaperfiles(idPersona).subscribe(response=>{
				if(!response){
					this._router.navigate(['/']);
				}else{
					this.persona = response.persona[0];
					this.cursos = response.cursosPersona;
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					var body = JSON.parse(error._body);
				}
			}
			);
		});
	}

	getPerfiles(idCurso) {
		document.getElementById("edit").style.visibility = "visible";
		this._route.params.forEach((params: Params)=>{
			let idPersona=params["idPersona"];
			this._personaService.getPersonaperfil(idPersona, idCurso).subscribe(response=>{
				if(!response){
					this._router.navigate(['/']);
				}else{
					this.perfil = response.personaCurso;
					this.cursito = idCurso;
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					var body = JSON.parse(error._body);
				}
			}
			);
		});
	}

	enviamePrro() {
		this._router.navigate(['/modificar-perfiles/'+this.persona.idPersona+'/'+this.cursito]);
	}

}