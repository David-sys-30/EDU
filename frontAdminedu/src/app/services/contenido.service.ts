import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()

export class ContenidoService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	registraContenido(contenido_to_register){
		let json = JSON.stringify(contenido_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraContenido',params,{headers})
		.pipe(map(res=>res.json()));
	}

	registraTareas(contenido_to_register){
		let json = JSON.stringify(contenido_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraTareas',params,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerContenido(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerContenido/'+idTema,{headers})
		.pipe(map(res=>res.json()))
	}

	obtenerTareas(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerTareas/'+idTema,{headers})
		.pipe(map(res=>res.json()))
	}

	actualizaTarea(tarea_to_update){
		let json = JSON.stringify(tarea_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaTarea/'+tarea_to_update.contenido.idContenido,params,{headers})
		.pipe(map(res=>res.json()));
	}

	actualizaDocumento(documento_to_update){
		let json = JSON.stringify(documento_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaDocumento/'+documento_to_update.idContenido,params,{headers})
		.pipe(map(res=>res.json()));
	}

	getEvaluacion(idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getEvaluacion/'+idTema,{headers})
		.pipe(map(res=>res.json()));
	}
	getdocumentos(idUsuario,idTema){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getDocumentos/'+idUsuario+'/'+idTema,{headers})
		.pipe(map(res=>res.json()));
	}
	actualizaCalificacionTarea(calificacion_to_update){
		let json = JSON.stringify(calificacion_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizacalificacion/'+calificacion_to_update.idMaterialevalusuario, params, {headers})
		.pipe(map(res=>res.json()));
	}
}