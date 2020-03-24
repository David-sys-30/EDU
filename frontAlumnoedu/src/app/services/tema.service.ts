import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable()
export class TemaService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}
	getContenidotema(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerContenido/'+idTema, {headers})
		.pipe(map(res=>res.json()))
	}

	obtenerTemas(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerTemas/'+idModulo,{headers})
		.pipe(map(res=>res.json()));
	}	

	obtenerCalifTemas(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getCalifTema/'+idTema,{headers})
		.pipe(map(res=>res.json()));
	}

}