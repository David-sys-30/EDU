import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class ModulosService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	obtenerModulos(idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerModulos/'+idCurso,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerModulosExamen(idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerModulosExamen/'+idCurso,{headers})
		.pipe(map(res=>res.json()));
	}

	registrarModulo(modulo_to_register){
		let json = JSON.stringify(modulo_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraModulo',params,{headers})
		.pipe(map(res=>res.json()));
	}

	actualizaNumero(numeros){
		let json = JSON.stringify(numeros);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'})
		return this._http.post(this.url+'actualizaNumero',params,{headers})
		.pipe(map(res=>res.json()));
	}

	actualizaModulo(modulo_to_update){
		let json = JSON.stringify(modulo_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaModulo/'+modulo_to_update.idModulo, params, {headers})
		.pipe(map(res=>res.json()));
	}

	agregaEvaluacion(evaluacion,idCurso){
		let json = JSON.stringify(evaluacion);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'agregaEvaluacionModulo/'+idCurso,params,{headers})
		.pipe(map(res=>res.json()));
	}

	modificaEvaluacion(evaluacion,idCurso){
		let json = JSON.stringify(evaluacion);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'modificaEvaluacionModulo/'+evaluacion.idEvaluacion+'/'+idCurso,params,{headers})
		.pipe(map(res=>res.json()));
	}

	suma(idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'sumaModulo/'+idCurso,{headers})
		.pipe(map(res=>res.json()));
	}

	registraCalifModulo(califModulo){
		let json = JSON.stringify(califModulo);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'})
		return this._http.post(this.url+'registraCalifModulo',params,{headers})
		.pipe(map(res=>res.json()));
	}

	obteneridModuloEval(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getIdEvalMod/'+idModulo,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerCalifModulos(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getCalifModulo/'+idModulo,{headers})
		.pipe(map(res=>res.json()));
	}
	
}