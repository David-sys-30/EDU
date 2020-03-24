import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';
import { CursosService } from '../../services/cursos.service';
import { GLOBAL } from '../../services/global.service';
import { TemaService } from '../../services/tema.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { timer } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import swal from'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  providers:[UsuarioService, CursosService, TemaService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MiPerfilComponent implements OnInit {
public titulo:string;
	public identity;
	public token;
	public usuario;
	public alertUpdate;
	public url:string;
	public filesToUpload: Array<File>;
	public finurl: string;
	public curso = [];
	public cursos2 = []
	public curso2;
	public fecha;
	public datere:string;
	public array = [];
	public idUsuarioPersonaCurso;
	public fechaterm;
	public fechainic;
	public initdate;
	public finishdate;
	public localdate;
	public avance;
	public modulos;
	public temas;
	public all = [];
	public calificaciones = [];
	public allCalifReales;
	public locurl: string;
	public win:Window;
	public image;
	public charImg;
	public califCursos = [];
	public dataSource;
	public displayedColumns;
	public nomcom;
	public califFinal;
	public califCursosFin;
	public califTemas = [];
	

	constructor(
		private _cursoService:CursosService,
		private _usuariorService:UsuarioService,
		private _route: ActivatedRoute,
  		private _router: Router,
  		private _temaService:TemaService
		) {

		// LocalStorage
		this.identity = this._usuariorService.getIdentity();
		this.token = this._usuariorService.getToken();

		this.usuario = this.identity;
		this.url = GLOBAL.url;
		this.finurl = _router.url;
		this.win = window;
		this.locurl = window.location.href;
		
	}

	ngOnInit() {


		this.nomcom = this.identity.usuario[0].apellidopaternoUsuario + " " +this.identity.usuario[0].apellidomaternoUsuario + " " +this.identity.usuario[0].nombreUsuario;
		 
		  this.displayedColumns = ['nombreCurso', 'fechaexp', 'califCurso'];

		if(this.identity){
    		    	if (this.identity.usuario.length == null){
				this.image = this.identity.imagenUsuario;
	    	this.charImg = this.image.substring(0,5);
		    }else{
		    	this.image = this.identity.usuario[0].imagenUsuario;
		    	this.charImg = this.image.substring(0,5);
		    }
    	}
    	
		this.miPerfil();	

		function archivo(evt) {
	      var files = evt.target.files; // FileList object
	        //Obtenemos la imagen del campo "file". 
	        for (var i = 0, f; f = files[i]; i++) {         
	           //Solo admitimos imágenes.
	           if (!f.type.match('image.*')) {
	           	continue;
	           }
	           var reader = new FileReader();	           
	           reader.onload = (function(theFile) {
	           	return function(e) {
	               // Creamos la imagen.
	               document.getElementById("list").innerHTML = ['<img class="profile-img-card" style="margin-bottom: 2vw;" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');

	           };
	       })(f);
	       reader.readAsDataURL(f);
	   }
	}
	document.getElementById('files').addEventListener('change', archivo, false);

	
	for( var x in this.usuario['idCurso']){
		this.getCurso(this.usuario['idCurso'][x]['idCurso'], this.usuario['usuario'][0]['idUsuario'])
	}
}

	getCalifCursos(idUsuarioPersonaCurso){
		this._cursoService.obtenerCalifCurso(idUsuarioPersonaCurso).subscribe(response=>{
			if(response.CalifCurso.length != 0){
				this.califCursos.push({idUsuarioPersonaCurso:idUsuarioPersonaCurso,califCurso:response.CalifCurso[0].califCurso});

				
			}
			
			
		})
		return this.califCursos;
	}

	getCalifCursoFinal(idUsuarioPersonaCurso){
		this._cursoService.obtenerCalifCurso(idUsuarioPersonaCurso).subscribe(response=>{
			if(response.CalifCurso.length != 0){
				this.califFinal = response.CalifCurso[0].califCurso;
			}
			
			
		})
	}
onSubmit(){
		this._usuariorService.updateUser(this.usuario['usuario'][0]).subscribe(

			response=>{
				if (!response.usuario) {
					this.alertUpdate = 'El usuario no se ha actualizado';
				}else{
					if (!this.filesToUpload) {
						if (this.usuario['usuario'][0]['imagenUsuario'] != 'default.png') {
							this.usuario['usuario'][0]['imagenUsuario'] = this.usuario['usuario'][0]['imagenUsuario'];

						}
						localStorage.setItem('identity', JSON.stringify(this.usuario));
					}else{
						this.makeFileRquest(this.url+'subeImagenUsuario/'+ this.usuario['usuario'][0]['idUsuario'],
							[], this.filesToUpload).then(
							(result:any)=>{
								this.usuario['usuario'][0]['imagenUsuario'] = result.image.imagenUsuario;								
								localStorage.setItem('identity', JSON.stringify(this.usuario));
								let urlImagen = this.url+'getImageFileUsuario/'+this.usuario['usuario'][0]['imagenUsuario'];
								document.getElementById('imagenUsuario').setAttribute('src',urlImagen);
															
							}
							).catch(error=>{
							})
						}
						swal("Exito", response.message, "success");
						document.getElementById('list').innerHTML = "";
						
						// this._router.navigate(['/']);
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						this.alertUpdate = body.message;
					}
				}
				)
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
				formData.append('imagenUsuario',files[i],files[i].name)
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


	getCurso(idCurso,idUsuario) {
		this._cursoService.getCurso(idCurso,idUsuario).subscribe(
			response=>{
				this.fechaterm = response.usuarioPersonaCurso[0].fechaTerminoUsuarioPersonaCurso;
				this.fechainic = response.usuarioPersonaCurso[0].fechainicioUsuarioPersonaCurso;
				let date2 = new Date(this.fechaterm);
				let date3 = new Date(this.fechainic);
				var m = date2.getMonth()+1;
				var n = date3.getMonth()+1;
				this.finishdate = m + "/" + date2.getDate() + "/"  + date2.getFullYear();
				this.initdate = n + "/" + date3.getDate() + "/" + date3.getFullYear();
				
				this.fecha = response.usuarioPersonaCurso[0].fechainicioUsuarioPersonaCurso;
				this.idUsuarioPersonaCurso =  response.usuarioPersonaCurso[0].idUsuarioPersonaCurso;
				
				this.califCursosFin = this.getCalifCursos(this.idUsuarioPersonaCurso);
				this.curso.push({curso:response.curso[0],fechaexp:this.finishdate,fechain:this.initdate,usuarioPersonaCurso:response.usuarioPersonaCurso,calif:this.califCursosFin});
				
					let date = new Date(this.fecha);
	              var m = date.getMonth()+1;
	           //end test 
	             // this.datere = m + " " + date.getDate() + "," + " " + date.getFullYear();
	             this.datere = m + "/" + date.getDate() + "/"  + date.getFullYear();
	             this.array[0] = this.datere;
	             this.fecha = this.array[0];


			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					
				}
			})
    }

    convertirFecha(fecha){
    	let date = new Date(fecha);
    	var m = date.getMonth()+1;
    	this.datere = m + "/" + date.getDate() + "/"  + date.getFullYear();

    	return this.datere
	             // this.array[0] = this.datere;
	             // this.fecha = this.array[0];
    }

    checkFechas(){
    	let date3 = new Date();
		var m = date3.getMonth()+1;
		this. localdate = m + "/" + date3.getDate() + "/"  + date3.getFullYear();
    	var date = new Date(this.localdate);
    	var m = date.getMonth()+1;
    	

    	for(var f in this.curso){    		
    		var date2 = new Date(this.curso[f].fechaexp);
    		var m2 = date2.getMonth()+1;
    		if( date.getFullYear() >= date2.getFullYear()){
    			if(m >= m2){
    				if(date.getDate() >= date2.getDate()){
    					document.getElementById('btnexp'+this.curso[f].curso.idCurso).setAttribute('disabled',"");
    					document.getElementById('btnexp'+this.curso[f].curso.idCurso).style.display = 'block';
    					document.getElementById('abrircur'+this.curso[f].curso.idCurso).style.display = 'none';
    					
    				}
    			}
    			
    		}
    	} 
    }

    misCursos(){
    	$("#misCur").show();
    	document.getElementById('misCalif').style.display = 'none';    	
    	document.getElementById('miPer').style.display = 'none';
    	document.getElementById('miCurricula').style.display = 'none';
    	document.getElementById('contenido').style.display = 'none';

    	

		this.checkFechas();
    	   	
    }

    miPerfil(){
    	$("#misCur").hide();
    	document.getElementById('misCalif').style.display = 'none';
    	document.getElementById('contenido').style.display = 'none';
    	document.getElementById('miCurricula').style.display = 'none';
    	document.getElementById('miPer').style.display = 'block';
    }

    misCal(){
    	$("#misCur").hide();
    	document.getElementById('miPer').style.display = 'none';
    	document.getElementById('contenido').style.display = 'none';
    	document.getElementById('miCurricula').style.display = 'none';
    	document.getElementById('misCalif').style.display = 'block';
    	
    }

    miCurricula(){
    	$("#misCur").hide();
    	document.getElementById('miPer').style.display = 'none';
    	document.getElementById('contenido').style.display = 'none';
    	document.getElementById('misCalif').style.display = 'none';
    	document.getElementById('miCurricula').style.display = 'block';

    	// this.dataSource = this.curso;
    	this.checkFechas();

    	
    	for(var f in this.curso){ 
    		// if(this.curso[f].usuarioPersonaCurso[0].avanceUsuarioPersonaCurso == 100) {
    			this.cursos2.push(this.curso[f]);
    				 		this.dataSource = this.cursos2;	
    		// }  	
    	}    	
    	

    	function removeDuplicates(originalArray, prop) {
		     var newArray = [];
		     var lookupObject  = {};

		     for(var i in originalArray) {
		        lookupObject[originalArray[i][prop]] = originalArray[i];
		     }

		     for(i in lookupObject) {
		         newArray.push(lookupObject[i]);
		     }
		      return newArray;
		 }
    	
    }

 




    async verDetalles(idCurso){
    	let calTemas = [];
    	let ind = 0;
    	document.getElementById('misCalif').style.display = 'none';
    	document.getElementById('miPer').style.display = 'none';
    	document.getElementById('contenido').style.display = 'block';


    		this._cursoService.vistaCurso(idCurso).subscribe(
			response=>{
				this.curso2 = response.curso[0];
				this.modulos = response.contenido;
				

				for (var f in this.modulos){
					for(var z in this.modulos[f].modulo.temas){
						this._temaService.obtenerCalifTemas(this.modulos[f].modulo.temas[z].idTema).subscribe(response=>{
							if(response.temas[0].califTema.length == 0){

							}else{
							this.califTemas.push(response.temas[0]);
							}
							
						}) 
					}
					this._cursoService.obteneridMod(this.modulos[f].modulo.idModulo).subscribe(
						idEvalMod=>{
							if(idEvalMod.idEvalMod.length <= 0){

							}else{

							this._cursoService.obteneridCalifModulo(idEvalMod.idEvalMod[0].idEvaluacionmodulo).subscribe(
								califMod=>{
										document.getElementById('modulo'+this.modulos[ind].modulo.idModulo).innerHTML = califMod.califModulo[0].califModulo;		
										ind++;
								})
							}
							// this._cursoService.obteneridCalifModulo()
						})
				}
				for (var i = 0; i < this.modulos.length; ++i) {
					this._temaService.obtenerTemas(this.modulos[i].modulo.idModulo).subscribe(
						respuesta=>{
							for (var x = 0; x < respuesta.tema.length ; ++x) {								
								this.all.push(respuesta.tema[x].idTema)
								this._cursoService.obteneridTema(respuesta.tema[x].idTema).subscribe(
									response=>{
										
										if(response.idEvalTema.length <= 0){

										}else{
										this._cursoService.obteneridCalifTema(response.idEvalTema[0].idEvaluaciontema).subscribe(
											calif=>{
												calTemas.push({temas:calif.califTema[0]});
											})
										}
									});
							}
						},
						error=>{
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						}
						)
				}
				this.allCalifReales = {temas:calTemas};
	


			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			});

    }

   //  async changeCalTema(){
   //  	let b = 0;
   //  	for (var a in this.all){
   //  		for( b; b < this.allCalifReales.temas.length; b++ ){
   //  			//document.getElementById(this.all[a]).setAttribute('id',this.allCalifReales.temas[b].temas.idEvaluacionTema_CalifTema);	
   //  			document.getElementById('tema'+this.all[a]).innerHTML = this.allCalifReales.temas[b].temas.califTema
   //  			b++;
   //  			break;
    		
   //  		}
				
			// }
   //  }


	
	checkExpiracy(){
		if(this.localdate == this.finishdate){
			document.getElementById('btnexp').style.display = 'block';
		}
	}

}