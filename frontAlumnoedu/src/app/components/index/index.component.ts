import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import {BannerService} from '../../services/banner.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { GLOBAL } from '../../services/global.service';
import * as $ from 'jquery';
import swal from 'sweetalert2';


@Component({

	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css'],
	providers: [CursosService, UsuarioService, BannerService]
})
export class IndexComponent implements OnInit {
	public identity;
	public cursos;
	public curso;
	public personaCurso;
	public url;
	public arrayItems = [];
	public cursosadquiridos = [];
	public image;
	public charImg;
	public banners;
	public usuDes;

	public expiredDate;
	constructor(
		private _usuarioService: UsuarioService,
		private cookieService: CookieService,
		private _cursosService: CursosService,
		private _bannerService:BannerService,
		private router: Router) {
		this.url = GLOBAL.url;

	}

	ngOnInit() {
		this._usuarioService.getAllUsers().subscribe(response=>{
			this.usuDes = response.usuarios;
		})
		this._bannerService.obtenerBanners().subscribe(response=>{
			this.banners = response.banners;
		})
		this.identity = this._usuarioService.getIdentity();

		if (this.identity) {
			if (this.identity.usuario.length == null) {
				this.image = this.identity.imagenUsuario;
				this.charImg = this.image.substring(0, 5);
			} else {
				this.image = this.identity.usuario[0].imagenUsuario;
				this.charImg = this.image.substring(0, 5);
			}
		}


		$('.ir-arriba').click(function () {
			$('body, html').animate({ scrollTop: '0px' }, 300);
		});
		$(window).scroll(function () {
			if ($(this).scrollTop() > 0) {
				$('.ir-arriba').slideDown(300);
			} else { $('.ir-arriba').slideUp(300); }
		});
		if (localStorage.getItem('Carrito') == null) {

		} else {
			if (localStorage.getItem('Carrito').length != 0) {

				var parsed = (JSON.parse(localStorage.getItem('Carrito')));
				for (var x in parsed) {
					this.arrayItems.push(parsed[x]);


				}

			}

		}

		this._cursosService.getCursosIndex().subscribe(
			response => {
				this.cursos = response.curso;
				
				timer(1000).subscribe(x => {
					this.checkCarrito();
					this.identity = this._usuarioService.getIdentity();
					if (this.identity) {
						this.checkCarrito2(this.identity);
						for (var j in this.cursos) {
							for (var h in this.identity.idCurso) {

								if (this.cursos[j].idCurso == this.identity.idCurso[h].idCurso) {
									this.cursosadquiridos.push(this.cursos[j])
								}
							}
						}
					}




				})

			}, error => {
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})






	}

	getCurso(idCurso, idUsuario) {
		if (idUsuario != null) {
			this._cursosService.getCurso(idCurso, idUsuario).subscribe(
				response => {

					this.curso = response.curso[0]
					this.personaCurso = response.personaCurso[0]
					this.getItemstoCart(this.curso, this.personaCurso);
					this.addtoCart();
				}, error => {
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
					}
				})
		} else {

		}

	}

	public getItemstoCart(curso, persona) {
		this.arrayItems.push({ curso, persona });
	}

	public addtoCart() {
		let item = JSON.stringify(this.arrayItems);
		localStorage.setItem('Carrito', item);
		document.getElementById(this.curso.idCurso).setAttribute('disabled', "");
	}

	checkCarrito() {
		for (var x in this.cursos) {
			for (var y in this.arrayItems) {
				if (this.cursos[x].idCurso == this.arrayItems[y].curso.idCurso) {
					document.getElementById(this.cursos[x].idCurso).setAttribute('disabled', "");
					// $("#"+this.cursos[x].idCurso).css("background-color", "green");
					// $("#"+this.cursos[x].idCurso).html('Adquirido');
				}
			}

			if (this.identity != null) {
				for (var t in this.identity.idCurso) {
					if (this.identity.idCurso[t].idCurso == this.cursos[x].idCurso) {
						document.getElementById(this.cursos[x].idCurso).setAttribute('disabled', "");
						// $("#"+this.cursos[x].idCurso).css("background-color", "green");
						// $("#"+this.cursos[x].idCurso).html('Adquirido'); 
					}
				}
			}

		}
	}

	checkCarrito2(identidad) {

		for (var x in this.cursos) {

			for (var y in this.arrayItems) {
				if (this.cursos[x].idCurso == this.arrayItems[y].curso.idCurso) {
					document.getElementById(this.cursos[x].idCurso).setAttribute('disabled', "");
					$("#" + this.cursos[x].idCurso).css("background-color", "green");
					$("#" + this.cursos[x].idCurso).html('Adquirido');

				} else {
					document.getElementById(this.cursos[x].idCurso).removeAttribute("disabled");
					$("#" + this.cursos[x].idCurso).css("background-color", "#1686F5");
					$("#" + this.cursos[x].idCurso).html('<i class="fas fa-briefcase nav-item active carrito nav-icons "></i>&nbsp; Agregar');
				}
			}
			if (identidad != null) {
				for (var t in identidad.idCurso) {
					if (identidad.idCurso[t].idCurso == this.cursos[x].idCurso) {
						document.getElementById(this.cursos[x].idCurso).setAttribute('disabled', "");
						$("#" + this.cursos[x].idCurso).css("background-color", "green");
						$("#" + this.cursos[x].idCurso).html('Adquirido');
					}
				}
			} else {
				document.getElementById(this.cursos[x].idCurso).removeAttribute("disabled");
				$("#" + this.cursos[x].idCurso).css("background-color", "#1686F5");
				$("#" + this.cursos[x].idCurso).html('<i class="fas fa-briefcase nav-item active carrito nav-icons "></i>&nbsp; Agregar');
			}

		}
	}

	continuarCurso(idCurso, idUsuario) {
		this._cursosService.getCurso(idCurso, idUsuario).subscribe(
			response => {
				let idUsuarioPersona = response.usuarioPersonaCurso[0].idUsuarioPersonaCurso



				this.router.navigate(['/curso-alumno/', idUsuarioPersona, idCurso, idCurso])



			}, error => {
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})

	}
	inicia() {
		swal("Por favor inicia sesion", "Para agregar un curso al portafolio es necesario tener su sesion iniciada", "question");

	}



}
