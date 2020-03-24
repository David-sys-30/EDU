import { Component, OnInit,  PipeTransform, Pipe, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { CursosService } from '../../services/cursos.service';
import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global.service';
import {InstructorService} from '../../services/instructor.service';
import * as $ from 'jquery';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }
	transform(url) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}


@Component({
	selector: 'app-vista-curso',
	templateUrl: './vista-curso.component.html',
	styleUrls: ['./vista-curso.component.css'],
	providers: [CursosService, UsuarioService, InstructorService]
})
export class VistaCursoComponent implements OnInit, AfterViewInit {

	ngAfterViewInit() {
		document.getElementById('app').onload=function(){
			document.getElementById('app').style.display = 'block';
		};
		// document.getElementById('imga').onload=function(){
		// 	document.getElementById('imga').style.display = 'block';
		// };

	}

	public identity;
	public idCurso;
	public curso;
	public curso2;
	public modulos;
	public aprendizajes;
	public requisitos;
	public temas;
	public contenidos;
	public isCollapsed = false;
	public arrayItems = [];
	public url;
	public personaCurso;
	public personaCurso2;
	public idUsuarioPersonaCurso;
	public instructor;
	constructor(
		private _usuarioService:UsuarioService,
		
		private router: Router,
		private _cursoService:CursosService,
		public activatedRoute:ActivatedRoute,
		private _instructorService:InstructorService
		) {
		this.identity = this._usuarioService.getIdentity();
		this.url = GLOBAL.url;
		this.activatedRoute.params.subscribe(parametros =>{
			this.idCurso = parametros.idCurso;
		});
		this._cursoService.vistaCurso(this.idCurso).subscribe(
			response=>{
				this.curso = response.curso[0];
				
				this.checkCarrito();	
				this.checkCarrito2(this.identity);
				this.modulos = response.contenido;
				this.requisitos = response.requisitos;
				this.aprendizajes = response.aprendizajes;
				

			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})


	}

	ngOnInit() {
		
		window.scrollTo(0,0);

		if(localStorage.getItem('Carrito') == null){
			
		}else{
		if(localStorage.getItem('Carrito').length != 0){
			
			var parsed =(JSON.parse(localStorage.getItem('Carrito')));
			for(var x in parsed){
			  this.arrayItems.push(parsed[x]);
			  	  
				
			}
		}
	
		}
		// $(window).scroll(function() {
		// 	clearTimeout( $.data( this, "TestScroll" ) );
		// 	$.data( this, "TestScroll", setTimeout(function() {
		// 	}, 250) );
		// });
		
		this._cursoService.getCurso(this.idCurso,this.identity.usuario[0].idUsuario).subscribe(
			response=>{
				this.personaCurso2 = response.personaCurso[0].idPersona_PersonaCurso
				
				this._instructorService.obtenerInstructor(this.personaCurso2).subscribe(
			response=>{
				this.instructor = response.persona[0]
				
			});
			})
		
		
	}
	getCurso(idCurso,idUsuario) {
		this._cursoService.getCurso(idCurso,idUsuario).subscribe(
			response=>{
				this.curso2 = response.curso[0]
				this.personaCurso = response.personaCurso[0]
				// this.idUsuarioPersonaCurso =  response.usuarioPersonaCurso[0].idUsuarioPersonaCurso;
				this.getItemstoCart(this.curso2,this.personaCurso);			
				this.addtoCart();
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
		document.getElementById('btnshow').style.display = 'none';
		document.getElementById('btnhide').style.display = 'block';
		document.getElementById('btnshow2').style.display = 'none';
		document.getElementById('btnhide2').style.display = 'block';
	}

	checkCarrito(){
			for(var y in this.arrayItems){
				if(this.curso.idCurso == this.arrayItems[y].curso.idCurso){
					document.getElementById('btnshow').style.display = 'none';
					document.getElementById('btnhide').style.display = 'block';
					document.getElementById('btnshow2').style.display = 'none';
					document.getElementById('btnhide2').style.display = 'block';
				}
			}
		
	}

		checkCarrito2(identidad){
			if (identidad != null) {				
				for(var t in identidad.idCurso){
				if(this.curso.idCurso == identidad.idCurso[t].idCurso){
					document.getElementById('btnshow').style.display = 'none';
					document.getElementById('btnhide3').style.display = 'block';
					document.getElementById('btnshow2').style.display = 'none';
					document.getElementById('btnhide4').style.display = 'block';
					}	
				}
			}	

		}

}
