import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { AdministradorModel } from '../../models/administrador.model';
import { GLOBAL } from '../../services/global';
import swal from'sweetalert2';


@Component({
	selector: 'app-actualiza-administrador',
	templateUrl: './actualiza-administrador.component.html',
	styleUrls: ['./actualiza-administrador.component.css'],
	providers:[AdministradorService]
})
export class ActualizaAdministradorComponent implements OnInit {
	public titulo:string;
	public identity;
	public token;
	public administrador:AdministradorModel;
	public alertUpdate;
	public url:string;
	public filesToUpload: Array<File>;


	constructor(
		private _administradorService:AdministradorService
		) {
		
		this.titulo = 'Actualizar mis datos';

		// LocalStorage
		this.identity = this._administradorService.getIdentity();
		this.token = this._administradorService.getToken();

		this.administrador = this.identity;
		this.url = GLOBAL.url;
		
	}

	ngOnInit() {
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
	               document.getElementById("list").innerHTML = ['<img style="width: 50%" class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
	           };
	       })(f);
	       reader.readAsDataURL(f);
	   }
	}
	document.getElementById('files').addEventListener('change', archivo, false);
}
onSubmit(){
		// console.log(this.administrador);
		this._administradorService.updateAdmin(this.administrador).subscribe(
			response=>{
				if (!response.administrador) {
					this.alertUpdate = 'El usuario no se ha actualizado';
				}else{
					// this.administrador = response.administrador[0];
					if (!this.filesToUpload) {
						if (this.administrador.imagenAdministrador != 'default.png') {
							this.administrador.imagenAdministrador = this.administrador.imagenAdministrador;
						}
						localStorage.setItem('identity', JSON.stringify(this.administrador));
						// document.getElementById('nombreAdministrador').innerHTML = this.administrador.nombreAdministrador
					}else{
						this.makeFileRquest(this.url+'subeImagen/'+this.administrador.idAdministrador,
							[], this.filesToUpload).then(
							(result:any)=>{
								this.administrador.imagenAdministrador = result.image.imagenAdministrador
								localStorage.setItem('identity', JSON.stringify(this.administrador));
								let urlImagen = this.url+'getImagen/'+this.administrador.imagenAdministrador;
								document.getElementById('imagenAdministrador').setAttribute('src',urlImagen);
								console.log(this.administrador);
							}
							).catch(error=>{
								console.log(`${error}`);
							})
						}

						// this.alertUpdate = 'El usuario se ha actualizado';
						swal("Exito", response.message, "success");
					}
				},error=>{
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
						this.alertUpdate = body.message;
						console.log(error)
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
				formData.append('image',files[i],files[i].name)
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
			xhr.open('POST',url,true);
			xhr.setRequestHeader('Authorization',token);
			xhr.send(formData);
		})
	}

}
