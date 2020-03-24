import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class MensajesService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}
	getMensajes(idUsuario,idPersona,idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'conversacionAlumno/'+idUsuario+'/'+idPersona+'/'+idCurso, {headers})
		.pipe(map(res=>res.json()))
	}

	insertMensajeInstructor(mensaje,iduser){
		let json = JSON.stringify(mensaje);
		let mensaje2 = json;
		
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'mensajesPersona/'+iduser, mensaje2, {headers})
		.pipe(map(res=>res.json()))
	}
	getidusuariopersonacurso(idUsuario,idPersona,idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getusuariopersonacurso/'+idUsuario+'/'+idPersona+'/'+idCurso, {headers})
		.pipe(map(res=>res.json()))
	}

}