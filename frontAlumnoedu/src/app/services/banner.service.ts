import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable()
export class BannerService{
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}


	obtenerBanners(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getBannersAct', {headers:headers})
		.pipe(map(res => res.json()));
	}
	
}




