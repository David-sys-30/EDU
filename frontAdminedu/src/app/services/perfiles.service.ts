import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class PerfilesService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	getRoles(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getRoles",{headers})
		.pipe(map(res=>res.json()))
	}

	registraPerfil(perfil_to_register){
		let json = JSON.stringify(perfil_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'/registraPerfil',params,{headers})
		.pipe(map(res=>res.json()));
	}

	getPerfiles(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPerfiles', {headers})
		.pipe(map(res=>res.json()))
	}

	getPerfil(idPerfil){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPerfil/'+idPerfil, {headers})
		.pipe(map(res=>res.json()))
	}

	modificaPerfil(perfil_to_update){
		let json = JSON.stringify(perfil_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'modificaPerfil/'+perfil_to_update.perfil.idPerfil, params, {headers})
		.pipe(map(res=>res.json()))
	}

	eliminaRol(idRol){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'eliminaRol/'+idRol, {headers})
		.pipe(map(res=>res.json()))
	}

	getPersonaperfil(idPersona,idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersonaperfil/'+idPersona+'/'+idCurso, {headers})
		.pipe(map(res=>res.json()))
	}

	asignarPerfil(data){
		let json = JSON.stringify(data);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'asignarPerfil', params, {headers})
		.pipe(map(res=>res.json()))
	}

	daraltaperfil(idPerfil){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'darAltaPerfil/'+idPerfil,{headers})
		.pipe(map(res=>res.json()));
	}

	darbajaperfil(idPerfil){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'darBajaPerfil/'+idPerfil,{headers})
		.pipe(map(res=>res.json()));
	}
}