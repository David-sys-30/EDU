import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

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

	obtenerModulo(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerModulosing/'+idModulo,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerCalifModulos(idModulo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getCalifModulo/'+idModulo,{headers})
		.pipe(map(res=>res.json()));
	}


}