import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from '../services/global.service';

@Injectable()
export class InstructorService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}
	
	obtenerInstructor(idInstructor){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersonaCurso/'+ idInstructor,{headers})
		.pipe(map(res=>res.json()));

	}

	obtenerAlumnos(idPersona,idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getAlumnosCursoMensajes/'+idPersona+'/'+idCurso, {headers})
		.pipe(map(res=>res.json()))
	}

}
