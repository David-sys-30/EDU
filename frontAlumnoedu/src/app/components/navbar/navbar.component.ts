import { Component, OnInit,Output, EventEmitter, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';
import {take} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GLOBAL } from '../../services/global.service';
import { CursosService } from '../../services/cursos.service';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';

import { IndexComponent } from '../index/index.component';
import * as $ from 'jquery';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
	providers: [CursosService, UsuarioService, IndexComponent]
})
export class NavbarComponent implements OnInit {
	public arrnumcarrito=[];
	public numcarrito;
	public token = false;
	public identity;
	public cursos;
	public url;
	public items;
	public usersForm: FormGroup;
	public isLoading = false;
	public searching: boolean = false;
	public image;
	public charImg;
	public notif;
	public nonotif;
	public notnum;

	myControl = new FormControl();
	filteredOptions: Observable<string[]>;	
	constructor(private carrito:IndexComponent,
		private _usuarioService:UsuarioService,
		private cookieService: CookieService,
		public dialog: MatDialog,
		private _cursosService:CursosService,
		private _router: Router,
		private fb: FormBuilder) {
		this.url = GLOBAL.url;
		this._cursosService.getCursos().subscribe(
			response=>{
				this.cursos = response.curso;
				this.filteredOptions = this.myControl.valueChanges
				.pipe(
					startWith(''),
					startWith(''),
					map(state => state ? this._filter(state) : this.cursos.slice())
					);

			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			})
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.cursos.filter(curso => curso.nombreCurso.toLowerCase().includes(filterValue));
	}



	ngOnInit() {


		timer(0, 1000).subscribe(x=>{
			if(localStorage.getItem('Carrito') == null){
				this.numcarrito = 0;
			}else{
				if(localStorage.getItem('Carrito').length != 0){			
	   			this.getnumCarrito();
	   			this.checkCarrito();
	   			}
	   		}
    	})
    	this.identity = this._usuarioService.getIdentity();
    	if(this.identity){
    		    	if (this.identity.usuario.length == null){
				this.image = this.identity.imagenUsuario;
	    	this.charImg = this.image.substring(0,5);
		    }else{
		    	this.image = this.identity.usuario[0].imagenUsuario;
		    	this.charImg = this.image.substring(0,5);
		    	this.getNotif(this.identity.usuario[0].idUsuario);
		    }
    	}

		this.token = this._usuarioService.getToken();
		
		if(localStorage.getItem('Carrito') == null){
			
		}else{
		  	if(localStorage.getItem('Carrito').length != 0){
		  	this.items = JSON.parse(localStorage.getItem('Carrito'));			
  		}

  	}
			
	}


	public getNotif(idUsuario){
		this._usuarioService.getNotificaciones(idUsuario).subscribe(respo=>{
			this.notif = respo.Vistos;
			this.nonotif = respo.NoVistos;
			this.notnum = this.nonotif.length;
		})
	}

	public Redirige(idNotifPersona, url){
		this._usuarioService.verNotificaciones(idNotifPersona).subscribe(response =>{
			console.log(response);
		})
	    window.location.href = url;
	}

	public getnumCarrito(){
			this.arrnumcarrito = JSON.parse(localStorage.getItem('Carrito'));
			this.numcarrito = this.arrnumcarrito.length;		
	}
	

	public inicia(){
		let dialogRef = this.dialog.open(IniciaSesion, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	public getCursos(idCurso){
		// location.reload();
		this._router.navigate(['/vista-curso/'+idCurso])
	}


	public logOut(nada){		
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.carrito.ngOnInit();
		this.identity = nada;
		this.token = nada;
		window.location.href = '/';
		// this._router.navigate(['/']);
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

}

/*======================================
=            Iniciar sesion            =
======================================*/
@Component({
	selector: 'app-iniciaSesion',
	templateUrl: './iniciaSesion.component.html',
	styleUrls: ['./navbar.component.css'],
	providers: [UsuarioService, IndexComponent,CursosService]
})
export class IniciaSesion{
	public usuario:UsuarioModel;
	public identity;
	public errorMessage;
	public token;
	public alertRegister;
	public cursos;
	

	@Output() sendIdentity = new EventEmitter;
	@Output() sendToken = new EventEmitter;
	@Output() aparecerRegistro = new EventEmitter;

	constructor(
		private socialAuthService: AuthService,
		private _usuarioService:UsuarioService,
		private carrito:IndexComponent,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<IniciaSesion>,
		private _router: Router) {
		this.usuario = new UsuarioModel('','','','','','','','');
		this.cursos = carrito.cursos;
		
	}

	// Facebook Inicio //
	public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
      	this._usuarioService.getUserCorreo(userData.email).subscribe(usuario=>{      		
      		if(usuario.message){
      		this._usuarioService.register({nombreUsuario:userData.name,correoUsuario:userData.email,imagenUsuario:userData.image,provider:userData.provider,confirmada:1}).subscribe(
			response=>{
									this._usuarioService.getUserCorreo(userData.email).subscribe(usuario2=>{
										
											        let identity = usuario2;
        this.identity = identity
                if (!this.identity) {
					alert('El usuario no esta correctamente identificado');
				}else{
					localStorage.setItem('identity', JSON.stringify(identity));	
					let token = userData.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.alertRegister = '';
								this.sendIdentity.emit(this._usuarioService.getIdentity());
								this.sendToken.emit(this._usuarioService.getToken());
								this.onNoClick();
								this._router.navigate(['/index']);
								location.reload();

							}
				}
					})
			})

      		}else{
      							this._usuarioService.getUserCorreo(usuario.usuario[0].correoUsuario).subscribe(usuario3=>{
      								
					        let identity = usuario3;
        this.identity = identity
        if (!this.identity) {
					alert('El usuario no esta correctamente identificado');
				}else{
					localStorage.setItem('identity', JSON.stringify(identity));	
					let token = userData.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.alertRegister = '';
								this.sendIdentity.emit(this._usuarioService.getIdentity());
								this.sendToken.emit(this._usuarioService.getToken());
								this.onNoClick();
								this._router.navigate(['/index']);
								location.reload();

							}
				}
				})
      		}
      	})  
      }
    );
  }
	// Fin Facebook Inicio //

	public registra(){
		this.dialogRef.close();
		let dialogRef = this.dialog.open(Registrar, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

		public cambiaPass(){
		let dialogRef = this.dialog.open(CambiarPass, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
		});
	}

	ngOnInit(){

	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	public onSubmit(){
		// Conseguir los datos del usuario Identificado
		this._usuarioService.singUp(this.usuario).subscribe(
			response=>{				
				let identity = response.usuario;
				this.identity = identity;
				if (!this.identity.usuario[0].idUsuario) {
					alert('El usuario no esta correctamente identificado');
				}else{
					// Crear elemento en el LocalStorage para tener al usuario en sesion.
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada peticion http
					this._usuarioService.singUp(this.usuario,'true').subscribe(
						response =>{
							let token = response.token;
							this.token = token;
							if (this.token.length <= 0) {
								alert('El token no se ha generado');
							}else{
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);
								this.usuario = new UsuarioModel('','','','','','','','');
								this.alertRegister = '';
								this.sendIdentity.emit(this._usuarioService.getIdentity());
								this.sendToken.emit(this._usuarioService.getToken());
								this.carrito.ngOnInit();
								this.onNoClick();
								this._router.navigate(['/index']);
								location.reload();
							}
						},error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;
							}
						})
				}
			},error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
				}
			}
			);		
	}


	


}
/*=====  End of Iniciar sesion  ======*/



/*=================================
=            Registrar            =
=================================*/

@Component({
	selector: 'app-registrar',
	templateUrl: './registrar.component.html',
	styleUrls: ['./navbar.component.css'],
	providers: [UsuarioService]
})
export class Registrar{
	public usuarioRegistro:UsuarioModel;
	public alertRegister;
	constructor(
		public dialog: MatDialog,
		private _usuarioService:UsuarioService,
		public dialogRef: MatDialogRef<Registrar>) {
		this.usuarioRegistro = new UsuarioModel('','','','','','','','');
		
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	public inicia(){
		let dialogRef = this.dialog.open(IniciaSesion, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			
		});
	}

		public onSubmitRegister(){
		this._usuarioService.register(this.usuarioRegistro).subscribe(
			response=>{
				let usuario = response.Usuario;
				this.usuarioRegistro = usuario;
				if (!usuario) {
					this.alertRegister = 'Error al registrarse';
				}else{
					this.alertRegister = 'Usuario registrado con exito, por favor inicie sesión';
					this.usuarioRegistro = new UsuarioModel('','','','','','','','');
					// this.onNoClick();
					// this.inicia();
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



/*=====  End of Registrar  ======*/


/*=================================
=            Cambio Pass            =
=================================*/

@Component({
	selector: 'app-cambiopass',
	templateUrl: './cambiarPass.component.html',
	styleUrls: ['./navbar.component.css'],
	providers: [UsuarioService]
})
export class CambiarPass{
	public usuarioRegistro:UsuarioModel;
	public alertRegister;
	constructor(
		public dialog: MatDialog,
		private _usuarioService:UsuarioService,
		public dialogRef: MatDialogRef<CambiarPass>) {
		this.usuarioRegistro = new UsuarioModel('','','','','','','','');
		
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	public inicia(){
		let dialogRef = this.dialog.open(IniciaSesion, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			
		});
	}

		public onSubmitRegister(){
		this._usuarioService.getUserCor(this.usuarioRegistro.correoUsuario).subscribe(response=>{
			if (response.usuario.length == 0){
				alert("El correo que intentas utilizar no está registrado");
			}else{
				this._usuarioService.correoRec(response.usuario[0].idUsuario,this.usuarioRegistro.correoUsuario).subscribe(response=>{
					alert(response.resp);
				})
			}
		})
	}
}



/*=====  End of Cambio Pass  ======*/




