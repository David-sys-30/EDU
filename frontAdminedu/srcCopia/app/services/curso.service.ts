import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()

export class CursoService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	obtenerCursos(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerCursos',{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerCurso(idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerCurso/'+idCurso,{headers})
		.pipe(map(res=>res.json()));
	}

	registraCurso(curso_to_register){
		let json = JSON.stringify(curso_to_register);
		let params = json;
		// console.log(params);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraCurso',params,{headers})
		.pipe(map(res=>res.json()));
	}

	editarCurso(curso_to_update){
		let json = JSON.stringify(curso_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'editarCurso/'+curso_to_update.curso.idCurso,params,{headers})
		.pipe(map(res=>res.json()));
	}

	eliminaRequisito(idRequisito){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'eliminaRequisito/'+idRequisito,{headers})
		.pipe(map(res=>res.json()));
	}

	eliminaAprendizaje(idAprendizaje){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'eliminaAprendizaje/'+idAprendizaje,{headers})
		.pipe(map(res=>res.json()));
	}


	prueba(prueba){
		let json = JSON.stringify(prueba);
		let params = json;
		console.log(params);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'pruebas',params,{headers})
		.pipe(map(res=>res.json()));
	}
}