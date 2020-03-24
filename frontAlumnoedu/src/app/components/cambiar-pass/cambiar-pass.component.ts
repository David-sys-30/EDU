import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';
import { GLOBAL } from '../../services/global.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import swal from'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {
	public url:string;
  public user;
	public usuario2;
	public statusLink;
  constructor(private _usuarioService:UsuarioService,
  	private _route: ActivatedRoute,
  			private _router: Router) { 
  this.url = GLOBAL.url;
  this.user = new UsuarioModel('','','','','','','','');

  			  	this._route.params.forEach((params: Params) =>{
      			let codigoUsuario = params['codConf'];
        		this._usuarioService.getUsCodConf(codigoUsuario).subscribe(usuario=>{
  					this.usuario2 = usuario.dataUs[0];
            console.log(this.usuario2);
  					this.statusLink = usuario.dataUs[0].statusLink;
  				})
    })

  			  }

  ngOnInit() {
  }

  public cambiarPass(){
  	this._route.params.forEach((params: Params) =>{
  		let codigoUsuario = params['codConf'];
  	this._usuarioService.cambiarCont(this.usuario2.idUsuario,this.user.contrasenaUsuario).subscribe(response=>{
  				this._usuarioService.expirarLink(codigoUsuario).subscribe(response=>{
  					this._usuarioService.getUsCodConf(codigoUsuario).subscribe(usuario=>{
  					this.statusLink = usuario.dataUs[0].statusLink;
  					this._router.navigate(['/index'])
  				})
  				})
  						alert(response.resp)
  					})
  	})
  }

}
