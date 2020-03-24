import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable()
export class CursosService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}
	getCursos(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerCursosPersona', {headers})
		.pipe(map(res=>res.json()))
	}
	getCursosIndex(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerCursosIndex', {headers})
		.pipe(map(res=>res.json()))
	}
	getCurso(idCurso,idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerCurso/'+idCurso+'/'+idUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	obtenerAvanceCurso(idCurso,idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerAvanceCurso/'+idCurso+'/'+idUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	actualizarAvanceCurso(idUsuarioPersonaCurso, avanceUsuarioPersonaCurso, reg){
		let params = JSON.stringify(reg);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizarAvanceCurso/'+idUsuarioPersonaCurso+'/'+avanceUsuarioPersonaCurso, params, {headers:headers})
		.pipe(map(res=>res.json()))
	}

	vistaCurso(idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'vistaCurso/'+idCurso, {headers})
		.pipe(map(res=>res.json()))
	}

		getIdEvalContenido(idContenido){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getEvaluacionContenido/'+idContenido, {headers})
		.pipe(map(res=>res.json()))
	}

	getEvalCurso(idUsuarioPersonaCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getEvCurso/'+idUsuarioPersonaCurso, {headers})
		.pipe(map(res=>res.json()))
	}

	sendEvalCurso(curso_a_evaluar,idUsuarioPersonaCurso){
		let json = JSON.stringify(curso_a_evaluar);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraEvalCurso/'+idUsuarioPersonaCurso, params, {headers:headers})
		.pipe(map(res => res.json()));	
	}


		updateEvalCurso(eval_to_update,idUsuarioPersonaCurso){
		let json = JSON.stringify(eval_to_update);
		console.log(json)
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaEvalCurso/'+idUsuarioPersonaCurso, params, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	/* Test Calif*/
	obteneridMod(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obteneridMod/'+idModulo, {headers})
		.pipe(map(res=>res.json()))
	}
	obteneridCalifModulo(idEvaluacionmodulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obteneridCalifModulo/'+idEvaluacionmodulo, {headers})
		.pipe(map(res=>res.json()))
	}
	obteneridTema(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obteneridTema/'+idTema, {headers})
		.pipe(map(res=>res.json()))
	}
	obteneridCalifTema(idEvaluaciontema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obteneridCalifTema/'+idEvaluaciontema, {headers})
		.pipe(map(res=>res.json()))
	}
	obtenerCalifCurso(idUsuarioPersonaCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerCalifCurso/'+idUsuarioPersonaCurso, {headers})
		.pipe(map(res=>res.json()))
	}
	registrarCalifCurso(CalifCurso,idUsuarioPersonaCurso){
		let json = JSON.stringify(CalifCurso);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraCalifCurso/'+idUsuarioPersonaCurso, params, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	obtenerevalMod(idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerevalMod/'+idCurso, {headers})
		.pipe(map(res=>res.json()))
	}

}