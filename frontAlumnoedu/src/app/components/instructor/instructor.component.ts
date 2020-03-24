import { Component, OnInit } from '@angular/core';
import {InstructorService} from '../../services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../services/global.service';
import { UsuarioService } from '../../services/usuario.service';
import { CursosService } from '../../services/cursos.service';
import { timer } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  providers: [InstructorService, UsuarioService,CursosService]
})
export class InstructorComponent implements OnInit {
	public idPersona;
	public instructor;
	public url;
	public cursosPersona;
public cursos;
	public curso;
		public identity;

	
	public arrayItems = [];
	public cursosadquiridos= [];
  constructor(
  	private _InstructorService:InstructorService,
  	public activatedRoute:ActivatedRoute,
  	private _usuarioService:UsuarioService,
  	private _cursosService:CursosService) {
  		this.activatedRoute.params.subscribe(parametros =>{
			this.idPersona = parametros.idPersona;

		});
		this.url = GLOBAL.url;
		this._InstructorService.obtenerInstructor(this.idPersona).subscribe(
			response=>{
				this.instructor = response.persona[0]
				this.cursosPersona = response.cursosPersona
			})
  	 }

  ngOnInit() {
  	this._cursosService.getCursos().subscribe(
			response=>{
				this.cursos = response.curso
					
				timer(1000).subscribe(x=>{
		  		this.checkCarrito();
		  		this.identity = this._usuarioService.getIdentity();
		  		this.checkCarrito2(this.identity);
		  		for(var j in this.cursos){
					for(var h in this.identity.idCurso){
						
						if(this.cursos[j].idCurso == this.identity.idCurso[h].idCurso){
							this.cursosadquiridos.push(this.cursos[j])
						}
					}
				}


		  	})

			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})	

			

  	

}

 public getItemstoCart(curso,persona){
	this.arrayItems.push({curso,persona});
  }

	public addtoCart(){
		let  item = JSON.stringify(this.arrayItems);
		localStorage.setItem('Carrito', item);
		document.getElementById(this.curso.idCurso).setAttribute('disabled',"");		
	}

	 checkCarrito(){
		for(var x in this.cursos){
			for(var y in this.arrayItems){
				if(this.cursos[x].idCurso == this.arrayItems[y].curso.idCurso){
					document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
					// $("#"+this.cursos[x].idCurso).css("background-color", "green");
					// $("#"+this.cursos[x].idCurso).html('Adquirido');
				}
			}
			
			if (this.identity != null) {
				for(var t in this.identity.idCurso){
				if(this.identity.idCurso[t].idCurso == this.cursos[x].idCurso){
					document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
					// $("#"+this.cursos[x].idCurso).css("background-color", "green");
					// $("#"+this.cursos[x].idCurso).html('Adquirido'); 
				}	
			}
			}

		}
	}

	checkCarrito2(identidad){
	 	
		for(var x in this.cursos){

			for(var y in this.arrayItems){
				if(this.cursos[x].idCurso == this.arrayItems[y].curso.idCurso){
					document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
					$("#"+this.cursos[x].idCurso).css("background-color", "green");
					$("#"+this.cursos[x].idCurso).html('Adquirido');

				}else{
				document.getElementById(this.cursos[x].idCurso).removeAttribute("disabled");
				$("#"+this.cursos[x].idCurso).css("background-color", "#1686F5");
				$("#"+this.cursos[x].idCurso).html('<i class="fas fa-briefcase nav-item active carrito nav-icons "></i>&nbsp; Agregar');
				}
			}
			if (identidad != null) {				
				for(var t in identidad.idCurso){
				if(identidad.idCurso[t].idCurso == this.cursos[x].idCurso){
					document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
					$("#"+this.cursos[x].idCurso).css("background-color", "green");
					$("#"+this.cursos[x].idCurso).html('Adquirido');
				}	
			}
			}else{
				document.getElementById(this.cursos[x].idCurso).removeAttribute("disabled");
				$("#"+this.cursos[x].idCurso).css("background-color", "#1686F5");
				$("#"+this.cursos[x].idCurso).html('<i class="fas fa-briefcase nav-item active carrito nav-icons "></i>&nbsp; Agregar');
			}

		}
	}



}

