import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class TemasService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
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

	registrarTema(tema_to_register){
		let json = JSON.stringify(tema_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraTema',params,{headers})
		.pipe(map(res=>res.json()));
	}

	actualizaNumeroTema(numeros){
		let json = JSON.stringify(numeros);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'})
		return this._http.post(this.url+'actualizaNumeroTema',params,{headers})
		.pipe(map(res=>res.json()));
	}

	actualizaTema(tema_to_update){
		let json = JSON.stringify(tema_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaTema/'+tema_to_update.idTema, params, {headers})
		.pipe(map(res=>res.json()));
	}

	agregaEvaluacion(evaluacion,idModulo){
		let json = JSON.stringify(evaluacion);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'agregaEvaluacionTema/'+idModulo,params,{headers})
		.pipe(map(res=>res.json()));
	}

	modificaEvaluacion(evaluacion,idModulo){
		let json = JSON.stringify(evaluacion);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'modificaEvaluacion/'+evaluacion.idEvaluacion+'/'+idModulo,params,{headers})
		.pipe(map(res=>res.json()));
	}

	suma(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'sumaTema/'+idModulo,{headers})
		.pipe(map(res=>res.json()));
	}

	registraCalifTema(CalifTema){
		let json = JSON.stringify(CalifTema);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'})
		return this._http.post(this.url+'registraCalifTema',params,{headers})
		.pipe(map(res=>res.json()));
	}

	obteneridTemaEval(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getIdEvalTema/'+idTema,{headers})
		.pipe(map(res=>res.json()));
	}
}