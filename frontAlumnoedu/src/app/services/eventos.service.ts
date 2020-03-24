import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable()
export class EventosService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	getEventos(idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getEventos/'+idUsuario,{headers})
		.pipe(map(res=>res.json()));
	}

	registerEventos(events_to_register, idUsuarioPersonaCurso, nombreEvento){
		let json = JSON.stringify(events_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraEvento/'+idUsuarioPersonaCurso+'/'+nombreEvento, params, {headers:headers})
		.pipe(map(res => res.json()));	
	}


}