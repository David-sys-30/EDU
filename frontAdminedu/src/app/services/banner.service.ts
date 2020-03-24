import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class BannerService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	register(banner_to_register){
		let json = JSON.stringify(banner_to_register);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraBanner', params, {headers:headers})
		.pipe(map(res => res.json()));	
	}

		activaBanner(idPublicidads){
		let idPublicidad = idPublicidads
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'activaBanner/'+idPublicidad,{headers})
		.pipe(map(res=>res.json()));
	}

	desactivaBanner(idPublicidads){
		let idPublicidad = idPublicidads
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'eliminaBanner/'+idPublicidad,{headers})
		.pipe(map(res=>res.json()));
	}

	obtenerBanners(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getBanners', {headers:headers})
		.pipe(map(res => res.json()));
	}
	
}




