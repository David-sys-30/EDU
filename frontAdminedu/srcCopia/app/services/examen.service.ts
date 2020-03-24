import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()

export class ExamenService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	crearExamen(examen_to_create){
		let json = JSON.stringify(examen_to_create);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'crearExamen',params,{headers})
		.pipe(map(res=>res.json()));
	}

	actualizarExamen(examen_to_update){
		let json = JSON.stringify(examen_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizarExamen/'+examen_to_update.idExamen, params, {headers})
		.pipe(map(res=>res.json()));
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

	creaPreguntaRespuesta(data){
		let json = JSON.stringify(data);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'creaPreguntaRespuesta',params,{headers})
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

	modificarPreguntaExamen(data){
		let json = JSON.stringify(data);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'modificarPreguntaExamen/'+data.pregunta.idPreguntaexamen,params,{headers})
		.pipe(map(res=>res.json()));
	}

	randomPreguntas(idExamen){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'randomPreguntas/'+idExamen,{headers})
		.pipe(map(res=>res.json()));
	}
}