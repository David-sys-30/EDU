import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContenidoService } from '../../services/contenido.service';

@Component({
	selector: 'app-contenido',
	templateUrl: './contenido.component.html',
	styleUrls: ['./contenido.component.css'],
	providers: [ContenidoService]
})
export class ContenidoComponent implements OnInit {

	public idTema;
	public nombreTema;
	public nombreModulo;
	public nombreCurso;
	public evaluacion;
	

	constructor(
		private _contenidoService:ContenidoService,
		private activatedRoute:ActivatedRoute
		) {
		this.activatedRoute.params.subscribe(parametros =>{
			this.idTema = parametros.idTema;
			this.nombreTema = parametros.nombreTema;
			this.nombreModulo = parametros.nombreModulo;
			this.nombreCurso = parametros.nombreCurso;

		});
	}

	public ngOnInit() {
		this._contenidoService.getEvaluacion(this.idTema).subscribe(
			response=>{
				this.evaluacion = response.evaluacion;
				// console.log(response.evaluacion)
			},
			error=>{
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
					console.log(error)
				}
			})
	}

	cambio(event){
		this.ngOnInit();
	}

}
