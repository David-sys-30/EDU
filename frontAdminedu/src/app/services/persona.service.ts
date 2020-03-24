import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class PersonaService{
	public url:string;
	public identity;
	public token;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}
	singUp(user_to_login, gethash = null){
		if (gethash != null) {
			user_to_login.gethash = gethash;
		}
		let json = JSON.stringify(user_to_login);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'loginPersona', params, {headers:headers})
		.pipe(map(res => res.json()));
	}

	getNotificacionesPersona(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getNotificacionesPersona/'+idPersona, {headers})
		.pipe(map(res=>res.json()))
	}

	getIdentityP(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if (identity != 'undefined') {
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}
	getTokenP(){
		let token = localStorage.getItem('token');
		if (token != 'undefined') {
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
		
	}

	temaVisto(idUsuario, idTema, numeroModulo, reg){
		let params = JSON.stringify(reg);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'vistoTema/'+idUsuario+'/'+idTema+'/'+numeroModulo, params, {headers:headers})
		.pipe(map(res=>res.json()))
	}


	getPersonas(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getPersonas",{headers})
		.pipe(map(res=>res.json()))
	}

	getPersona(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersona/'+idPersona, {headers})
		.pipe(map(res=>res.json()))
	}

	getPerfilPersona(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPerfilPersona/'+idPersona, {headers})
		.pipe(map(res=>res.json()))
	}

	registraPersona(persona){
		let json = JSON.stringify(persona);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraPersona',params,{headers})
		.pipe(map(res=>res.json()));
	}

	modificaPersona(persona){
		let json = JSON.stringify(persona);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizarPersona/'+persona.persona.idPersona, params, {headers})
		.pipe(map(res=>res.json()))
	}

	getPersonasPerfiles(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getPersonasPerfiles",{headers})
		.pipe(map(res=>res.json()))
	}

	getPersonaperfiles(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersonaperfiles/'+idPersona, {headers})
		.pipe(map(res=>res.json()))
	}

	getPersonaperfil(idPersona, idCurso){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersonaperfil/'+idPersona+'/'+ idCurso, {headers})
		.pipe(map(res=>res.json()))
	}
	
	modificaCurso(curso){
		let json = JSON.stringify(curso);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizarCurso', params, {headers})
		.pipe(map(res=>res.json()))
	}

	modificaPerfiles(perfiles){
		let json = JSON.stringify(perfiles);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizarPerfiles', params, {headers})
		.pipe(map(res=>res.json()))
	}

	eliminarPerfiles(idPersonaPerfil,idPerfil_PersonaPerfil){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.delete(this.url+'eliminarPerfil/'+idPersonaPerfil+'/'+idPerfil_PersonaPerfil, {headers:headers})
		.pipe(map(res => res.json()));
	}

	eliminarPersonaCurso(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.delete(this.url+'eliminarPersonaCurso/'+idPersona, {headers:headers})
		.pipe(map(res => res.json()));
	}

	obtenerAlumnos(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getAlumnosCurso/'+idPersona, {headers})
		.pipe(map(res=>res.json()))
	}

	getPersonaCurso(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersonaCurso/'+idPersona, {headers})
		.pipe(map(res=>res.json()))
	}

	getUsuario(idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getUsuario/'+idUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	getUsuarioPersonaCurso(idPersona, idCurso, idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getUsuarioPersonaCurso/'+idPersona+'/'+ idCurso+'/'+idUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	getPermisos(idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+'getPersonaPermisos/'+idUsuario, {headers})
		.pipe(map(res=>res.json()))
	}

	obtenGrupos(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getGrupos",{headers})
		.pipe(map(res=>res.json()))
	}

	obtenUsuarios(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getAllUsuarios",{headers})
		.pipe(map(res=>res.json()))
	}

	obtenGrupo(idGrupo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getGrupo/"+idGrupo,{headers})
		.pipe(map(res=>res.json()))
	}

	creaGrupo(grupo){
		let json = JSON.stringify(grupo);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'registraGrupo',params,{headers})
		.pipe(map(res=>res.json()));
	}

	addUsuarioGrupo(idGrupo, idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'agregarUsuario/'+idGrupo+'/'+idUsuario, {headers:headers})
		.pipe(map(res=>res.json()))
	}

	remUsuarioGrupo(idGrupo, idUsuario){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'removerUsuario/'+idGrupo+'/'+idUsuario, {headers:headers})
		.pipe(map(res=>res.json()))
	}

	obtenUsuarioGrupo(idGrupo){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getUsuarios/"+idGrupo,{headers})
		.pipe(map(res=>res.json()))
	}

	actualizaGrupo(idGrupo, grupo){
		let json = JSON.stringify(grupo);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'actualizaGrupo/'+idGrupo, params, {headers})
		.pipe(map(res=>res.json()))
	}

	daraltapersona(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'darAltaPersona/'+idPersona,{headers})
		.pipe(map(res=>res.json()));
	}

	darbajapersona(idPersona){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.url+'darBajaPersona/'+idPersona,{headers})
		.pipe(map(res=>res.json()));
	}

	getAllUsers(){
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.get(this.url+"getAllUsers",{headers})
		.pipe(map(res=>res.json()))
	}

	cambiarCont(idUsuario,contrasenaUsuario){
		let headers = new Headers({
			'Content-Type':'application/json'
		});
		return this._http.put(this.url+'cambiarContrasena/'+idUsuario+'/'+contrasenaUsuario, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	cambiarContPersona(idPersona,contrasenaPersona){
		let headers = new Headers({
			'Content-Type':'application/json'
		});
		return this._http.put(this.url+'cambiarContrasenaPersona/'+idPersona+'/'+contrasenaPersona, {headers:headers})
		.pipe(map(res => res.json()));	
	}

	
	
}