import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable()

export class ExamenService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	getExamen(idModulo,idExamen){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getExamen/'+idModulo+'/'+idExamen,{headers})
		.pipe(map(res=>res.json()));
	}

	getExamenes(modulos){
		let json = JSON.stringify(modulos);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getExamenes/'+modulos,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerPreguntas(idExamen){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerPreguntas/'+idExamen,{headers})
		.pipe(map(resp=>resp.json()));
	}

	obtenerRespuestas(idPregunta){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerRespuestas/'+idPregunta,{headers})
		.pipe(map(res=>res.json()));
	}

	randomPreguntas(idExamen){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'randomPreguntas/'+idExamen,{headers})
		.pipe(map(res=>res.json()));
	}

		evalExamen(calificacionExamenevalusuario,idUsuarioPersCur,idExamen_Eval){
		let json = JSON.stringify(calificacionExamenevalusuario);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'evalExamen/'+idUsuarioPersCur+'/'+idExamen_Eval,params,{headers})
		.pipe(map(res=>res.json()));
	}
}