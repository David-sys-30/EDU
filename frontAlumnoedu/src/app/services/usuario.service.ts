import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from '../services/global.service';

@Injectable()
export class UsuarioService{
	public url:string;
	public identity;
	public token;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	getNotificaciones(idUser){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getNotificacionesUsuario/'+idUser, {headers})
		.pipe(map(res=>res.json()))
	}

	verNotificaciones(idUser){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'verNotificacionesUsuario/'+idUser,{headers})
		.pipe(map(res=>res.json()));
	}

	getUser(idUser){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getUsuario/'+idUser, {headers})
		.pipe(map(res=>res.json()))
	}

	getAllUsers(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getAllUsers/', {headers})
		.pipe(map(res=>res.json()))
	}

	singUp(user_to_login, gethash = null){
		if (gethash != null) {
			user_to_login.gethash = gethash;
		}
		let json = JSON.stringify(user_to_login);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'loginUsuario', params, {headers:headers})
		.pipe(map(res => res.json()));
	}

	register(user_to_register){
		let json = JSON.stringify(user_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraUsuario', params, {headers:headers})
		.pipe(map(res => res.json()));	
	}
	
	getUserCorreo(emailUser){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getUsuarioCorreo/'+emailUser, {headers})
		.pipe(map(res=>res.json()))
	}
	updateUser(user_to_update){
		let json = JSON.stringify(user_to_update);
		console.log(json)
		let params = json;
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':this.getToken()
		});
		return this._http.put(this.url+'actualizaUsuario/'+user_to_update.idUsuario, params, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if (identity != 'undefined') {
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');
		if (token != 'undefined') {
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}

		adquirirCursos(cursos){
		let json = JSON.stringify(cursos);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'adquirirCursos', params, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	temaVisto(idUsuario, idTema, numeroModulo, reg){
		let params = JSON.stringify(reg);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'vistoTema/'+idUsuario+'/'+idTema+'/'+numeroModulo, params, {headers:headers})
		.pipe(map(res=>res.json()))
	}

	getVistos(idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getVistos/'+idUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	buscarUsuario(idReg){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'buscarUsuario/'+idReg, {headers})
		.pipe(map(res=>res.json()))
	}

	correoRec(idUsuario,correoUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'correoRecuperarContrasena/'+idUsuario+'/'+correoUsuario, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	cambiarCont(idUsuario,contrasenaUsuario){
		let headers = new Headers({
			'Content-Type':'application/json'
		});
		return this._http.put(this.url+'cambiarContrasena/'+idUsuario+'/'+contrasenaUsuario, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	getUsCodConf(codPass){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getUserCod/'+codPass, {headers})
		.pipe(map(res=>res.json()))
	}

	getUserCor(correoUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getUsuarioCorreo/'+correoUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	expirarLink(codConf){
		let headers = new Headers({
			'Content-Type':'application/json'
		});
		return this._http.put(this.url+'expirarLink/'+codConf, {headers:headers})
		.pipe(map(res => res.json()));	
	}

}




