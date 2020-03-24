import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class AdministradorService{
	public url:string;
	public identity;
	public token;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	singUp(admin_to_login, gethash = null){
		if (gethash != null) {
			admin_to_login.gethash = gethash;
		}
		let json = JSON.stringify(admin_to_login);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'loginAdministrador', params, {headers:headers})
		.pipe(map(res => res.json()));
	}

	register(admin_to_register){
		let json = JSON.stringify(admin_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraAdministrador', params, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	updateAdmin(admin_to_update){
		let json = JSON.stringify(admin_to_update);
		let params = json;
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':this.getToken()
		});
		return this._http.put(this.url+'actualizaAdministrador/'+admin_to_update.idAdministrador, params, {headers:headers})
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
}




