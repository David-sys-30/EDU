import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { GLOBAL } from '../../services/global.service';
import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-destacados',
  templateUrl: './alumnos-destacados.component.html',
  styleUrls: ['./alumnos-destacados.component.css'],
  providers: [UsuarioService]
})
export class AlumnosDestacadosComponent implements OnInit {
	public usuDes;
	public url;
  constructor(private _usuarioService: UsuarioService,
  	private router: Router) {
  	this.url = GLOBAL.url;
   }

  ngOnInit() {
  	this._usuarioService.getAllUsers().subscribe(response=>{
			this.usuDes = response.usuarios;
		})
  }

}
