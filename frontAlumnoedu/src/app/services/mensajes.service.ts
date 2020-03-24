import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

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
	insertMensajeAlumno(mensaje){
		let json = JSON.stringify(mensaje);
		let mensaje2 = json
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'mensajesAlumno/', mensaje2, {headers})
		.pipe(map(res=>res.json()))
	}

	insertMensajeAlumnoToAlumno(mensaje){
		let json = JSON.stringify(mensaje);
		let mensaje2 = json
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'mensajesAlumnoToAlumno/', mensaje2, {headers})
		.pipe(map(res=>res.json()))

	}
	getMensajesAlumnos(idemisor,idreceptor,idcurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getusuarioconversacion/'+idemisor+'/'+idreceptor+'/'+idcurso, {headers})
		.pipe(map(res=>res.json()))

	}

}
