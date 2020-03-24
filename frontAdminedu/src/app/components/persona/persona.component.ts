import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PersonaModel } from '../../models/persona.model';
import { CatalogosService } from '../../services/catalogos.service';
import { AdministradorService } from '../../services/administrador.service';
import { EspecialidadModel } from '../../models/especialidades.model';
import { CatEspecialidadModel } from '../../models/catespecialidad.model';
import { CatPersonaModel } from '../../models/catpersona.model';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule} from '@angular/material';
import swal from'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers: [PersonaService, CatalogosService, AdministradorService]
})

export class PersonaComponent implements OnInit {

	public titulo:string;
	public persona:PersonaModel;
	public alertRegister;
	public url:string;

	public identity;
	public permisos;
	public DarBajaPersonaperm;
	public EditarPersonaperm;
	public CrearPersonaperm;


  constructor(
  	private _route: ActivatedRoute,
		private _router: Router,
		public _personaService:PersonaService,
		private _administradorService:AdministradorService,
		public dialog: MatDialog
  	) {
  	this.titulo = 'Persona';
	this.url = GLOBAL.url;
	this.identity = this._administradorService.getIdentity();
  }

  ngOnInit() {

  	this.getPersonas();

  	this._personaService.getPermisos(this.identity[0].admin.idAdministrador).subscribe(response=>{
				this.permisos = response.permisos;
				for (var i = 0; i < this.permisos.length; ++i) {
					switch (this.permisos[i].permiso.idRol_RolPerfil) {
						case 12:
							this.CrearPersonaperm = 1
							break;

						case 13:
							this.EditarPersonaperm = 1
							break;

						case 14:
							this.DarBajaPersonaperm = 1
							break;
						
						default:
							// code...
							break;
					}
				}
			})
  }

  getPersonas(){
    this._route.params.forEach((params: Params)=>{
      this._personaService.getPersonas().subscribe(response=>{
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

  AltaPersona(idPersona){
		var idPersona = idPersona;
		this._personaService.daraltapersona(idPersona).subscribe(result=>{
			swal("Exito", "Persona dada de alta", "success");
			this.ngOnInit();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})
	}

	BajaPersona(idPersona){
		var idPersona = idPersona;
		this._personaService.darbajapersona(idPersona).subscribe(result=>{
			this._personaService.getPerfilPersona(idPersona).subscribe(result=>{
				if(result.personaperfil.length != 0){
					swal("Exito", "Al dar de baja a un instructor deberá asignar uno nuevo a cada curso del instructor dado de baja", "success");
					this._personaService.eliminarPersonaCurso(idPersona).subscribe(response=>{
						console.log(response);
					})
				}else{
					swal("Exito", "Persona dada de baja", "success");
				}
				
			})
			
			this.ngOnInit();
		},error=>{
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		})
	}

}


@Component({
  selector: 'app-regpersona',
  templateUrl: './regpersona.component.html',
  styleUrls: ['./regpersona.component.css'],
  providers:[PersonaService, CatalogosService]
})
export class RegpersonaComponent implements OnInit {

  	public persona:PersonaModel;
	public especialidad:EspecialidadModel;
	public catespecialidad:CatEspecialidadModel;
	public alertRegister;

	@Output() aparecer = new EventEmitter;

	constructor(
		private _personaService:PersonaService,
		public _catalogoService:CatalogosService,
		private _route: ActivatedRoute,
		private _router: Router) {
		this.persona = new PersonaModel('','','','','','','','','','');
		this.catespecialidad = new CatEspecialidadModel('','','');
	}

	ngOnInit() {
		this.getEspecialidades();
	}

	getEspecialidades() {
	  	this._route.params.forEach((params:Params) =>{
	  		this._catalogoService.getEspecialidades().subscribe(
	  			response=>{
					if (!response) {
						this._router.navigate(['/']);
					}else{
						this.especialidad = response.especialidades;
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						this.alertRegister = body.message;
					}
				}
	  		);
	  	});
	  }
	
	onSubmitRegister(){
		let Json = {"persona": this.persona, "especialidad": this.catespecialidad};
		this._personaService.registraPersona(Json).subscribe(
			response=>{
				if (!response) {
					this.alertRegister = 'Error al registrarse';
				}else{
					swal("Exito", response.message, "success");
					this._router.navigate(['/persona']);
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.alertRegister = body.message;
				}
			}
			);
	}

}

@Component({
  selector: 'app-editpersona',
  templateUrl: './editpersona.component.html',
  styleUrls: ['./editpersona.component.css'],
  providers:[PersonaService, CatalogosService]
})
export class EditpersonaComponent implements OnInit {

	public especialidad:EspecialidadModel;
	public catpersona:CatPersonaModel;
	public persona:PersonaModel[];
	public catespecialidad:CatEspecialidadModel[];
	public filesToUpload: Array<File>;
	public token;
	public alertRegister;
	public url:string;

	@Output() aparecer = new EventEmitter;

	constructor(
		private _personaService:PersonaService,
		public _catalogoService:CatalogosService,
		private _route: ActivatedRoute,
		private _router: Router) {
		this.catpersona = new CatPersonaModel('','','','','','','','','','','','','');
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getEspecialidades();
		this.getPersona();

		function archivo(evt) {
	      var files = evt.target.files;
	        for (var i = 0, f; f = files[i]; i++) {         
	           //Solo admitimos imágenes.
	           if (!f.type.match('image.*')) {
	           	continue;
	           }
	           var reader = new FileReader();	           
	           reader.onload = (function(theFile) {
	           	return function(e) {
	               // Creamos la imagen.
	               document.getElementById("list").style.visibility = "visible";
	               document.getElementById("list").innerHTML = ['<img style="width: 50%" class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
	           };
	       })(f);
	       reader.readAsDataURL(f);
	   }
	}
	document.getElementById('files').addEventListener('change', archivo, false);
	}

	onSubmitRegister(){
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
		let JPersona = {
			"idPersona":this.catpersona.idPersona,
			"nombrePersona":this.catpersona.nombrePersona,
			"apellidopaternoPersona":this.catpersona.apellidopaternoPersona,
			"apellidomaternoPersona":this.catpersona.apellidomaternoPersona,
			"correoPersona":this.catpersona.correoPersona,
			"descripcionPersona":this.catpersona.descripcionPersona,
			"imagenPersona":this.catpersona.imagenPersona,
			"statusPersona":this.catpersona.statusPersona,
			"telefonoPersona":this.catpersona.telefonoPersona,
			"contrasenaPersona":this.catpersona.contrasenaPersona
		};

		let JEsp = {
			"idCatalogoespecialidadPersona":this.catpersona.idCatalogoespecialidadPersona,
			"idCatalogoespecialidad_CatalogoespecialidadPersona":this.catpersona.idCatalogoespecialidad_CatalogoespecialidadPersona,
			"idPersona_CatalogoespecialidadPersona":this.catpersona.idPersona_CatalogoespecialidadPersona
		};

		let Json = {"persona": JPersona, "especialidad": JEsp};
		this._personaService.modificaPersona(Json).subscribe(
			response=>{
				if (!response) {
					swal("Fallo todo", response.message, "error");
				}else{
					if (!this.filesToUpload) {
						if (this.catpersona.imagenPersona != 'default.png') {
							this.catpersona.imagenPersona = this.catpersona.imagenPersona;
						}	
						
					}else{
						this.makeFileRquest(this.url+'subeImagenPersona/'+this.catpersona.idPersona,
							[], this.filesToUpload).then(
							(result:any)=>{
								this.catpersona.imagenPersona = result.image.imagenPersona
								
								let urlImagen = this.url+'getImagenPersona/'+this.catpersona.imagenPersona;
								document.getElementById('imagenPersona').setAttribute('src',urlImagen);
								document.getElementById('list').style.visibility = "hidden";
							}
							).catch(error=>{
							})
						}
						swal("Exito", response.message, "success");
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
					}
				}
				)
		}
	  });
	}

	getEspecialidades() {
	  	this._route.params.forEach((params:Params) =>{
	  		this._catalogoService.getEspecialidades().subscribe(
	  			response=>{
					if (!response) {
						this._router.navigate(['/']);
					}else{
						this.especialidad = response.especialidades;
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						this.alertRegister = body.message;
					}
				}
	  		);
	  	});
	  }

	getPersona() {
		this._route.params.forEach((params: Params)=>{
			let idPersona=params["idPersona"];
			this._personaService.getPersona(idPersona).subscribe(response=>{
				if(!response){
					this._router.navigate(['/']);
				}else{
					this.catpersona = response.persona[0];
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

	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRquest(url:string,params:Array<string>, files:Array<File>){
		let token = this.token;
		return new Promise(function(resolve,reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append('imagenPersona',files[i],files[i].name)
			}
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));	
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('PUT',url,true);
			xhr.setRequestHeader('Authorization',token);
			xhr.send(formData);
		})
	}

}