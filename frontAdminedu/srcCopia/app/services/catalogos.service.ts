import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class CatalogosService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}
	// Categorias
	obtenerCategorias(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getCategorias', {headers:headers})
		.pipe(map(res => res.json()));
	}

	registraCategoria(categoria_to_register){
		let json = JSON.stringify(categoria_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraCategoriaCurso',params,{headers})
		.pipe(map(res => res.json()));
	}

	modificarCategoria(categoria_to_update){
		let json = JSON.stringify(categoria_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		console.log(categoria_to_update.idCategoria);
		return this._http.put(this.url+'actualizaCategoria/'+categoria_to_update.idCategoria,params,{headers})
		.pipe(map(res => res.json()));
	}
	// End Categorias

	
	// SubCategorias
	obtenerSubCategorias(idCategoria){
		let json = JSON.stringify(idCategoria);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'obtenerSubCategorias/'+idCategoria,{headers})
		.pipe(map(res => res.json()));
	}

	agregarSubcategoria(subCategoria_to_register){
		let json = JSON.stringify(subCategoria_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraSubcategoria',params,{headers})
		.pipe(map(res => res.json()));
	}

	modificarSubcategoria(subcategoria_to_update){
		let json = JSON.stringify(subcategoria_to_update);
		let params = json;
		console.log(params)
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaSubcategoria/'+subcategoria_to_update.idSubcategoriacurso,params,{headers})
		.pipe(map(res=> res.json()));
	}
	// End SubCategorias



	//Requisitos
	obtenerRequisitos(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'joinRequisitos', {headers})
		.pipe(map(res => res.json()));
	}

	agregarRequisito(requisito_to_register){
		let json = JSON.stringify(requisito_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraRequisito',params,{headers})
		.pipe(map(res=>res.json()));
	}

	modificarRequisito(requisito_to_update){
		let json = JSON.stringify(requisito_to_update);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaRequisito/'+requisito_to_update.idRequisito,params,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerRequisito(data){
		let json = JSON.stringify(data);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'getRequisito/'+data.idSubcategoria,params,{headers})
		.pipe(map(res => res.json()));
	}
	//End Requisitos

}