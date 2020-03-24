import { Component, OnInit,  PipeTransform, Pipe, AfterViewInit, AfterViewChecked, Inject } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
import { EventosService } from '../../services/eventos.service';
import { AgendaComponent } from '../../components/agenda/agenda.component';
import { timer } from 'rxjs';
import {take} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GLOBAL } from '../../services/global.service';
import * as $ from 'jquery';

declare let paypal: any;

export interface DialogData {
  nombreCurso: [string];
  url: [string];
  locurl: string;
}


@Component({
	selector: 'app-carrito',
	templateUrl: './carrito.component.html',
	styleUrls: ['./carrito.component.css'],
	providers: [UsuarioService,, EventosService, AgendaComponent]
})
export class CarritoComponent implements OnInit {
	
	public items;
	public identity;
	public url;
	public arrnumcarrito=[];
	public arrayItems = [];
	public numcarrito;
	public expiredDate;
	public token;
	public locurl: string;
	public win:Window;
	public finurl:string;
	public image;
	public charImg;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _agenda: AgendaComponent,
		public dialog: MatDialog,
		private _usuariorService:UsuarioService,
		private cookieService: CookieService) { 
		this.url = GLOBAL.url;
		this.identity = this._usuariorService.getIdentity();
		this.token = this._usuariorService.getToken();
		this.locurl = window.location.href;
		this.win = window;
		this.finurl = _router.url;
	}

	salto(){
	}

	ngOnInit() { 




		this.identity = this._usuariorService.getIdentity();
		if(this.identity){
    		    	if (this.identity.usuario.length == null){
				this.image = this.identity.imagenUsuario;
	    	this.charImg = this.image.substring(0,5);
		    }else{
		    	this.image = this.identity.usuario[0].imagenUsuario;
		    	this.charImg = this.image.substring(0,5);
		    }
    	}

		if(localStorage.getItem('Carrito') == null){
			this.items = null;
			this.getnumCarrito();
		}else{
			if(localStorage.getItem('Carrito').length != 0){
				this.items = JSON.parse(localStorage.getItem('Carrito'));
				timer(0, 1000).subscribe(x=>{
					this.getnumCarrito();
					this.checkCarrito();
				})
				this.total();
				var parsed =(JSON.parse(localStorage.getItem('Carrito')));
				for(var c in parsed.curso){
					this.arrayItems.push(parsed[c]);
				}

			}

		}




	}	

	checkCarrito(){
		for(var x in this.items){			
			if (this.identity != null) {
				for(var t in this.identity.idCurso){
					if(this.identity.idCurso[t].idCurso == this.items[x].curso.idCurso){
						if (this.items[x].curso.idCurso == this.identity.idCurso[t].idCurso) {
							this.items.splice(x, 1);
						}
						let  item = JSON.stringify(this.items);
						localStorage.setItem('Carrito', item);	
					}	
				}
			}

		}
	}

	public getnumCarrito(){
		if(localStorage.getItem('Carrito') != null){
			this.arrnumcarrito =JSON.parse(localStorage.getItem('Carrito'));
			this.numcarrito = this.arrnumcarrito.length;	
		}else{
			this.numcarrito = 0;
		}

	}

	public total(){
		if(localStorage.getItem('Carrito') != null){
			this.arrnumcarrito =JSON.parse(localStorage.getItem('Carrito'));
			var total = 0;
			for(var i=0; i< this.arrnumcarrito.length; i++ ){
				var suma = this.arrnumcarrito[i].curso.costoCurso;
				total += suma;
			}
			return this.formatNumber.new(total, "$");;
		}

	}

	public eliminar(name){
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].curso.nombreCurso == name) {
				this.items.splice(i, 1);
			}
			let  item = JSON.stringify(this.items);
			localStorage.setItem('Carrito', item);		
		}
	}

	public async generarIdentity(usuario){
		// Conseguir los datos del usuario Identificado
		await this._usuariorService.singUp(usuario).subscribe(
			async response=>{		
				let identity = response.usuario;
				if (!identity.usuario[0].idUsuario) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					await this._usuariorService.singUp(usuario,'true').subscribe(
						async response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								// this.usuario = new UsuarioModel('','','','','','','','');
								await this._usuariorService.getIdentity();
								await this._usuariorService.getToken();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			);
	}

	public async generarIdentity2(correoUsuario){
		// Conseguir los datos del usuario Identificado
		await this._usuariorService.getUserCorreo(correoUsuario).subscribe(
			async response=>{		
				let identity = response;
				if (!identity.usuario[0].idUsuario) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					await this._usuariorService.getUserCorreo(correoUsuario).subscribe(
						async response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								// this.usuario = new UsuarioModel('','','','','','','','');
								await this._usuariorService.getIdentity();
								await this._usuariorService.getToken();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			);
	}

	public adquirirCursos(){
		let usuario = this.identity.usuario[0];
		let conta = 0;
		let nomcur = Array;
		for ( let p in this.items){
			conta ++;
			let curso = {idUsuario_UsuarioPersonaCurso:this.identity.usuario[0].idUsuario,idPersonaCurso_UsuarioPersonCurso:this.items[p].persona.idPersonaCurso}
			// nomcur.append(this.items[p].curso.nombreCurso);
			this._usuariorService.adquirirCursos(curso).subscribe(response=>{
				if (conta === this.items.length) {

					let dialogRef = this.dialog.open(UserProfileComponent, {
				      height: '170px',
				      width: '400px',
				      data:{
				        nombreCurso:this.items[p].curso.nombreCurso,
				        locurl:this.locurl,
				      }
				    });
				    dialogRef.afterClosed().subscribe(result => {
				      this.ngOnInit();
				    });

					// localStorage.removeItem('Carrito');
					// localStorage.removeItem('identity');
					// localStorage.removeItem('token');
					this.identity = this._usuariorService.getIdentity();
					this.generarIdentity(usuario);
					this.ngOnInit();
				}
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})	
		}

	}
	public adquirirCursos2(){
		let usuario = this.identity;
		let conta = 0;
		let nomcur = Array;
		for ( let p in this.items){
			conta ++;
			let curso = {idUsuario_UsuarioPersonaCurso:this.identity.usuario[0].idUsuario,idPersonaCurso_UsuarioPersonCurso:this.items[p].persona.idPersonaCurso}
			// nomcur.append(this.items[p].curso.nombreCurso);
			this._usuariorService.adquirirCursos(curso).subscribe(response=>{
				if (conta === this.items.length) {

					let dialogRef = this.dialog.open(UserProfileComponent, {
				      height: '170px',
				      width: '400px'
				      // data:{
				      //   nombreCurso:this.,
				      //   locurl:this.locurl,
				      // }
				    });
				    dialogRef.afterClosed().subscribe(result => {
				      this.ngOnInit();
				    });

					// localStorage.removeItem('Carrito');
					// localStorage.removeItem('identity');
					// localStorage.removeItem('token');
					this.identity = this._usuariorService.getIdentity();
					this.generarIdentity2(usuario.usuario[0].correoUsuario);
					this.ngOnInit();
				}
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})	
		}

	}

	public formatNumber = {
		separador: ",", // separador para los miles
		sepDecimal: '.', // separador para los decimales
		formatear:function (num){
			num +='';
			var splitStr = num.split('.');
			var splitLeft = splitStr[0];
			var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
			var regx = /(\d+)(\d{3})/;
			while (regx.test(splitLeft)) {
				splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
			}
			return this.simbol + splitLeft +splitRight;
		},
		new:function(num, simbol){
			this.simbol = simbol ||'';
			return this.formatear(num);
		}
	}

}

@Component({
	selector: 'app-carritopagar',
	templateUrl: './carritoshare.component.html',
	styleUrls: ['./carrito.component.css']
})
export class UserProfileComponent implements OnInit {
	public item;
	public url;
	public locurl: string;
	public win:Window;
	public finurl:string;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
		private cookieService: CookieService,
		private _route: ActivatedRoute,
		private _router: Router,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<UserProfileComponent>) { 
		this.url = GLOBAL.url;
		// this.locurl = window.location.href;
		this.win = window;
		this.finurl = _router.url;
		this.locurl = 'https://www.google.com';
		this.item = this.data.nombreCurso;
	}

	ngOnInit() {
		
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}



@Component({
	selector: 'app-carritopagar',
	templateUrl: './carritopagar.component.html',
	styleUrls: ['./carrito.component.css'],
	providers: [UsuarioService]
})
export class CarritoPagarComponent implements OnInit, AfterViewChecked {
	public items;
	public url;
	public arrnumcarrito=[];
	public numcarrito;
	public identity;
	public token;

	public addScript: boolean = false;
	public paypalLoad: boolean = true;
	public finalAmount;
	public paypalConfig = {
		env: 'sandbox',
		client: {
			sandbox: 'AXZI5zXoWfQkfZlWhs7jnRnbdybrBFM2mW0cEMQ1iOX6y6K4HrQiEOv-NJVzoGuR3N0U5Mo-chuwqrao',
			production: '<ID-de-producción>'
		},
		commit: true,
		payment: (data, actions) => {
			return actions.payment.create({
				payment: {
					transactions: [
						{amount: {total: 1, currency: 'MXN'}}
					]
				}
			})
		},
		onAuthorize: (data, actions) => {
			return actions.payment.execute().then((payment) =>{
				//Aquí se pone lo que quieras hacer cuando se confirme el pago
				//Puse ambos métodos de adquirirCursos, pero están comentados abajo :v
				this.adquirirCursos();
				// this.adquirirCursos2();
			})
		}
	}

	constructor(private cookieService: CookieService,
		private _usuariorService:UsuarioService,
		public dialog: MatDialog,
		private _agenda: AgendaComponent,
		private _router: Router) { 
		this.identity = this._usuariorService.getIdentity();
		this.url = GLOBAL.url;
		this.finalAmount = this.total();
		this.token = this._usuariorService.getToken();
	}

	ngAfterViewChecked(): void {
		if (!this.addScript) {
			this.addPaypalScript().then(() => {
				paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
				this.paypalLoad = false;
			})
		}
	}

	addPaypalScript() {
		this.addScript = true;
		return new Promise((resolve, reject) => {
			let scripttagElement = document.createElement('script');
			scripttagElement.src = 'http://www.paypalobjects.com/api/checkout.js';
			scripttagElement.onload = resolve;
			document.body.appendChild(scripttagElement);
		})
	}

	ngOnInit() { 
		if(localStorage.getItem('Carrito') == null){

		}else{ 	
			if(localStorage.getItem('Carrito').length != 0){
				this.items = JSON.parse(localStorage.getItem('Carrito'));
				timer(0, 1000).subscribe(x=>{
					this.getnumCarrito();
				})
				this.total();
			}
		}

	}

	public getnumCarrito(){
		this.arrnumcarrito = JSON.parse(localStorage.getItem('Carrito'));
		this.numcarrito = this.arrnumcarrito.length;		
	}

	public total(){
		this.arrnumcarrito = JSON.parse(localStorage.getItem('Carrito'));
		var total = 0;
		for(var i=0; i< this.arrnumcarrito.length; i++ ){
			var suma = this.arrnumcarrito[i].curso.costoCurso;
			total += suma;
		}
		//return this.formatNumber.new(total, "$");
		return total;
	}

	public formatNumber = {
		separador: ",", // separador para los miles
		sepDecimal: '.', // separador para los decimales
		formatear:function (num){
			num +='';
			var splitStr = num.split('.');
			var splitLeft = splitStr[0];
			var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
			var regx = /(\d+)(\d{3})/;
			while (regx.test(splitLeft)) {
				splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
			}
			return this.simbol + splitLeft +splitRight;
		},
		new:function(num, simbol){
			this.simbol = simbol ||'';
			return this.formatear(num);
		}
	}

	public adquirirCursos(){
		let usuario = this.identity.usuario[0];
		let conta = 0;
		let nomcur = Array;
		for ( let p in this.items){
			conta ++;
			let curso = {idUsuario_UsuarioPersonaCurso:this.identity.usuario[0].idUsuario,idPersonaCurso_UsuarioPersonCurso:this.items[p].persona.idPersonaCurso}
			// nomcur.append(this.items[p].curso.nombreCurso);
			this._usuariorService.adquirirCursos(curso).subscribe(response=>{
				if (conta === this.items.length) {

					let dialogRef = this.dialog.open(UserProfileComponent, {
				      height: '250px',
				      width: '500px',
				      data:{
				        nombreCurso:this.items[p].curso.nombreCurso,
				      }
				    });
				    dialogRef.afterClosed().subscribe(result => {
				      this.ngOnInit();
				    });

					localStorage.removeItem('Carrito');
					localStorage.removeItem('identity');
					localStorage.removeItem('token');
					this.identity = this._usuariorService.getIdentity();
					this.generarIdentity(usuario);
					this.ngOnInit();
					this._router.navigate(['/index'])

					/* Aqui */
							let dateFin = new Date();
							let dateFinR = (dateFin.getFullYear()+1) + '-' + (dateFin.getMonth() + 1) + '-' + dateFin.getDate() + ' ' + dateFin.getHours() + ':' + dateFin.getMinutes() + ':' + dateFin.getSeconds();
					this._agenda.addEvent(dateFinR, response.Cursos[0], "Duración Curso " + this.items[p].curso.nombreCurso);

					/* 56465465465456465*/



				}
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})	
		}
	}

	public async generarIdentity(usuario){
		// Conseguir los datos del usuario Identificado
		await this._usuariorService.singUp(usuario).subscribe(
			async response=>{		
				let identity = response.usuario;
				if (!identity.usuario[0].idUsuario) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					await this._usuariorService.singUp(usuario,'true').subscribe(
						async response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								// this.usuario = new UsuarioModel('','','','','','','','');
								await this._usuariorService.getIdentity();
								await this._usuariorService.getToken();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			);
	}

	public async generarIdentity2(correoUsuario){
		// Conseguir los datos del usuario Identificado
		await this._usuariorService.getUserCorreo(correoUsuario).subscribe(
			async response=>{		
				let identity = response;
				if (!identity.usuario[0].idUsuario) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					await this._usuariorService.getUserCorreo(correoUsuario).subscribe(
						async response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								// this.usuario = new UsuarioModel('','','','','','','','');
								await this._usuariorService.getIdentity();
								await this._usuariorService.getToken();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
			);
	}

	public adquirirCursos2(){
		let usuario = this.identity;
		let conta = 0;
		let nomcur = Array;
		for ( let p in this.items){
			conta ++;
			let curso = {idUsuario_UsuarioPersonaCurso:this.identity.usuario[0].idUsuario,idPersonaCurso_UsuarioPersonCurso:this.items[p].persona.idPersonaCurso}
			// nomcur.append(this.items[p].curso.nombreCurso);
			this._usuariorService.adquirirCursos(curso).subscribe(response=>{
				if (conta === this.items.length) {

					let dialogRef = this.dialog.open(UserProfileComponent, {
				      height: '170px',
				      width: '400px'
				    });
				    dialogRef.afterClosed().subscribe(result => {
				      this.ngOnInit();
				    });

					localStorage.removeItem('Carrito');
					localStorage.removeItem('identity');
					localStorage.removeItem('token');
					this.identity = this._usuariorService.getIdentity();
					this.generarIdentity2(usuario.usuario[0].correoUsuario);
					this.ngOnInit();
				}
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})	
		}
	}

}