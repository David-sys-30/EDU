import { Component, OnInit, Input, Inject, PipeTransform, Pipe, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global.service';
import { CursosService } from '../../services/cursos.service';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';
import { TemaService } from '../../services/tema.service';
import { EventosService } from '../../services/eventos.service';
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from '@angular/material';
import { AgendaComponent } from '../../components/agenda/agenda.component';
import { MensajesService } from '../../services/mensajes.service';
import { InstructorService } from '../../services/instructor.service';
import { MensajeModel } from '../../models/mensajes.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { timer } from 'rxjs';
import swal from 'sweetalert2';
import $ from 'jquery';



@Pipe({ name: 'safe2' })
export class SafePipe2 implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }
	transform(url) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}

@Component({
	selector: 'app-curso-alumno',
	templateUrl: './curso-alumno.component.html',
	styleUrls: ['./curso-alumno.component.css'],
	providers: [CursosService, InstructorService, TemaService, UsuarioService, AgendaComponent, EventosService, MensajesService]
})
export class CursoAlumnoComponent implements OnInit {

	public filesToUpload: Array<File>;
	public identity;
	public token;
	public usuario: UsuarioModel;
	public url;
	public idCurso;
	public curso;
	public course = [];
	public modulos;
	public aprendizajes;
	public requisitos;
	public temas;
	public contenidos;
	public isCollapsed = false;
	public numerito = 0;
	public contenido;
	public nombreModulo;
	public nombreTema;
	public descripcionTema;
	public contenidoTema;
	public idTema;
	public doc;
	public examen;
	public idMod_idExa = { idMod: 0, idExa: 0 };
	public seen;
	public arraySeen = [];
	public arraySeen2 = [];
	public arraySeen3 = [];
	public min = 1000000;
	public all = [];
	public selectedIndexMenu = 0;
	public step = 0;
	public idUsuarioPersonaCursoGlob;
	public idCursoGlob;
	public idEvaluacioncontenido;
	public currentRate = 0;
	public iduser;
	public reg;
	public reg2;
	public avance;
	public parse;
	public evalEnviada = 0;
	public mensajes2;
	public mensajeModel = new MensajeModel('', '', '', '', '', '', '', '');
	public personaInstructor;
	public color;
	public bufferValue;
	public mode;
	public urlavance;
	public cursos;
	public alumnos;
	public companero = [];
	public modules = [];
	public modulosord = [];
    public instructor;
    public evalumods;


	constructor(
		private snackBar: MatSnackBar,
		private _usuariorService: UsuarioService,
		private router: Router,
		public dialog: MatDialog,
		private _cursoService: CursosService,
		public activatedRoute: ActivatedRoute,
		private _temaService: TemaService,
		private _route: ActivatedRoute,
		private _agenda: AgendaComponent,
		private _mensajesService: MensajesService,
		private _instructorService: InstructorService) {

		this._route.params.forEach((params: Params) => {
			this.idUsuarioPersonaCursoGlob = params['idUsuarioPersonaCurso'];
			this.idCursoGlob = params['idCurso']

		});
		this.identity = this._usuariorService.getIdentity();
		this._usuariorService.buscarUsuario(this.idUsuarioPersonaCursoGlob).subscribe(
			response => {
				this.iduser = response.Usuario[0].idUsuario;
				this.revisaAvance(this.iduser);
			});
		this.url = GLOBAL.url;
		this.usuario = this.identity;
		this.activatedRoute.params.subscribe(parametros => {

			this.idCurso = parametros.idCurso;
			this._cursoService.obtenerevalMod(this.idCurso).subscribe( response =>{ this.evalumods = response.modulos});

		});
		this._cursoService.getEvalCurso(this.idUsuarioPersonaCursoGlob).subscribe(response => {
			if (response.evalCurso.length != 0) {
				this.currentRate = response.evalCurso[0].cursoEvaluacion;
			}

		});


		if (localStorage.getItem('Events') == null) {
		} else {
			if (localStorage.getItem('Events').length != 0) {
				this.parse = (JSON.parse(localStorage.getItem('Events')));
			}
		}
		this._cursoService.vistaCurso(this.idCurso).subscribe(
			response => {
				this.curso = response.curso[0];
				this.modulos = response.contenido.sort(function (a, b) { return a.modulo.numeroModulo - b.modulo.numeroModulo });
				this.requisitos = response.requisitos;
				this.aprendizajes = response.aprendizajes;
				this.examen = response.examen;
				for (var i = 0; i < this.modulos.length; ++i) {
					this._temaService.obtenerTemas(this.modulos[i].modulo.idModulo).subscribe(
						respuesta => {
							for (var x = 0; x < respuesta.tema.length; ++x) {
								this.all.push(respuesta.tema[x].idTema)
							}
						},
						error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						}
					)
				}

			}, error => {
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			});


		this._cursoService.getCurso(this.idCurso, this.usuario['usuario'][0]['idUsuario']).subscribe(
			response => {
				this.course.push({ curso: response.curso[0], usuarioPersonaCurso: response.usuarioPersonaCurso });
				this.personaInstructor = response.personaCurso[0];
                

				this.mensajeModel.mensaje = ""
				this.mensajeModel.receptor = this.personaInstructor.idPersona_PersonaCurso;
				this.mensajeModel.time = ""
				this.mensajeModel.emisor = this.identity.usuario[0].idUsuario
				this.mensajeModel.id_curso = this.idCurso
				this.mensajeModel.idConversacion = ""
				this.mensajeModel.rolMensaje = "alumno"
				this.mensajeModel.visto = "0"

				this._instructorService.obtenerAlumnos(this.personaInstructor.idPersona_PersonaCurso, this.idCursoGlob).subscribe(response => {




					this.alumnos = response.alumnos;
					for (var z in this.alumnos) {
						if (this.alumnos[z].alumno[0].idUsuario != this.iduser) {
							this.companero.push(this.alumnos[z])

						}
					}



				},
					error => {
						var errorMessage = <any>error;
						if (errorMessage != null) {
							var body = JSON.parse(error._body);
						}
					}
				)
                this._instructorService.obtenerInstructor(this.personaInstructor.idPersona_PersonaCurso).subscribe(inst =>{
                    this.instructor = inst.persona[0];
                })

				this._mensajesService.getMensajes(this.identity.usuario[0].idUsuario, this.personaInstructor.idPersona_PersonaCurso, this.idCurso).subscribe(
					result => {
						this.mensajes2 = result.Mensajes





					})

			}, error => {
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			});






	}


	openSnackBar(message: string) {
		this.snackBar.open(message, "", {
			duration: 2000,
		});
	}


	getidMod_idExa(idMod) {
		for (var y in this.examen) {
			if (this.examen[y].examen.length != 0) {
				if (idMod == this.examen[y].examen[0].idModulo_Examen) {
					this.idMod_idExa = { idMod: idMod, idExa: this.examen[y].examen[0].idExamen }

				}
			}

		}

	}

	async revisaAvance(iduser) {
		this._cursoService.obtenerAvanceCurso(this.idCurso, iduser).toPromise().then(response => {
			let valor1 = response.Totales;
			let valor2 = response.Vistos;
			let coso1 = valor1[0].Totales;
			let coso2 = valor2[0].Vistos;
			let valor = 100 * coso2;
			this.avance = Math.round(valor / coso1);
			if (this.avance > 100) {
				this.avance = 100
			}
			this.actava();
		});
	}

	async actava() {
		this.reg2 = ({ 'idUsuarioPersonaCurso': this.idUsuarioPersonaCursoGlob, 'avanceUsuarioPersonaCurso': this.avance });
		this._cursoService.actualizarAvanceCurso(this.idUsuarioPersonaCursoGlob, this.avance, this.reg2).subscribe(resp => {
		});
	}

	evaluarCurso() {
		if (this.currentRate == 0) {
			this._cursoService.sendEvalCurso({ instructorEvaluacion: 0.00, cursoEvaluacion: this.currentRate, plataformaEvaluacion: 0.00, comentarioEvaluacion: "" }, this.idUsuarioPersonaCursoGlob).subscribe(response => {
				this.openSnackBar(response.message)
			})
		}
	}

	ngOnInit() {
		this._usuariorService.getVistos(this.identity.usuario[0].idUsuario).subscribe(
			response => {
				if (!response || response == null || response.tema.length <= 0) {
				}
				else {
					this.arraySeen = response.tema;
				}
			},
			error => {
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
		);

		timer(0, 1000).subscribe(x => {
			if (this.numerito == 0) {
				this.CheckSeen();
			}

		})
	}

	getTemas(idModulo) {
		this.step = idModulo;
		this._temaService.obtenerTemas(idModulo).subscribe(
			response => {
				this.temas = response.tema;
				this.CheckSeen();
				for (var i = 0; i < this.all.length; ++i) {
					if (this.all[i] < this.min) {
						this.min = this.all[i];
					}
				}
			},
			error => {
				var errorMensaje = <any>error;
				if (errorMensaje != null) {
					var body = JSON.parse(error._body);
				}
			}
		)
	}


	CheckSeen() {
		for (var g in this.arraySeen) {
			for (var h in this.temas) {
				if ((this.arraySeen[g].idTema) + 1 != null) {
					if (this.arraySeen[g].idTema == this.temas[h].idTema) {
						document.getElementById('unseen' + this.temas[h].idTema).style.display = "none";
						document.getElementById('seen' + this.arraySeen[g].idTema).style.display = "block";
						document.getElementById('visto' + this.arraySeen[g].idTema).style.cursor = "pointer";
					}
				}
				else {
					if (this.arraySeen[g].idTema == this.temas[h].idTema) {
						document.getElementById('unseen' + this.temas[h].idTema).style.display = "none";
						document.getElementById('seen' + this.arraySeen[g].idTema).style.display = "block";
						document.getElementById('visto' + this.arraySeen[g].idTema).style.cursor = "pointer";
						document.getElementById('visto' + (parseInt(this.arraySeen[g].idTema) + 1)).style.cursor = "pointer";
					}
				}
			}
		}
	}





	toTema(modulo, idTema, nombreTema, descripcionTema, numeroModulo, idModulo) {
		if (idTema == this.min) {
			this.idTema = idTema;
			this.nombreModulo = modulo;
			this.nombreTema = nombreTema;
			this.descripcionTema = descripcionTema;
			this.numerito = 1;
			this._temaService.getContenidotema(idTema).subscribe(
				response => {
					this.contenidoTema = response.contenido;
					if (this.contenidoTema.length > 0) {
						if (this.contenidoTema[0].idCategoriacontenido_Contenido == 3) {
							let dateIn = new Date()
							let dateInR = dateIn.getFullYear() + '-' + dateIn.getMonth() + 1 + '-' + dateIn.getDate();
							let dateFin = new Date()
							dateFin.setDate(dateIn.getDate() + 3);
							// dateFin.setHours(dateIn.getHours() - 5);
							let dateFinR = dateFin.getFullYear() + '-' + (dateFin.getMonth() + 1) + '-' + dateFin.getDate() + ' ' + dateFin.getHours() + ':' + dateFin.getMinutes() + ':' + dateFin.getSeconds();
							this._agenda.addEvent(dateFinR, this.idUsuarioPersonaCursoGlob, this.contenidoTema[0].nombreContenido);
							this.reg = ({ 'idTema': idTema, 'idUsuario': this.iduser, 'numeroModulo': idModulo });
							this._usuariorService.temaVisto(this.iduser, this.idTema, idModulo, this.reg)
								.subscribe(resp => { });
						}
					}
					this.separar(response.contenido);
				},
				error => {
					var errorMensaje = <any>error;
					if (errorMensaje != null) {
						var body = JSON.parse(error._body);
					}
				}
			)
		}
		else {
			for (var i = 0; i < this.arraySeen.length; ++i) {
				if (idTema == this.arraySeen[i].idTema || idTema - 1 == this.arraySeen[i].idTema) {
					this.idTema = idTema;
					this.nombreModulo = modulo;
					this.nombreTema = nombreTema;
					this.descripcionTema = descripcionTema;
					this.numerito = 1;
					this._temaService.getContenidotema(idTema).subscribe(
						response => {
							this.contenidoTema = response.contenido;
							let dateIn = new Date()
							let dateFin = new Date()
							dateFin.setDate(dateIn.getDate() + 3);
							dateFin.setHours(dateIn.getHours() - 5);

							if (this.contenidoTema.length != 0) {
								this._agenda.addEvent(dateFin, this.idUsuarioPersonaCursoGlob, this.contenidoTema[0].nombreContenido);
							}

							this.reg = ({ 'idTema': idTema, 'idUsuario': this.iduser, 'numeroModulo': idModulo });
							this._usuariorService.temaVisto(this.iduser, this.idTema, idModulo, this.reg)
								.subscribe(resp => { });
						},
						error => {
							var errorMensaje = <any>error;
							if (errorMensaje != null) {
								var body = JSON.parse(error._body);
							}
						}
					)
				}
			}

		}
	}

	regresar() {
		this.selectedIndexMenu = 1;
		this.numerito = 0;
		this.revisaAvance(this.iduser);
		this.ngOnInit();
	}

	mensajes() {
		this.selectedIndexMenu = 3;


	}


	separar(contenido) {
		let contador = 0;
		let documento = [];
		contenido.forEach(function (element, index, array) {
			contador++;
			if (element.idCategoriacontenido_Contenido == 3) {
				documento.push({ elemto: element.idCategoriacontenido_Contenido });
			}
			if (contador == array.length) {

			}
		})
		this.doc = documento;

	}


	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;

	}

	makeFileRquest(url: string, params: Array<string>, files: Array<File>) {
		let token = this.token;
		return new Promise(function (resolve, reject) {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append('doc', files[i], files[i].name)
			}
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		})
	}

	enviarMensajeAlumno() {

		this._mensajesService.insertMensajeAlumno(this.mensajeModel).subscribe(mensaje3 => {
			this._mensajesService.getMensajes(this.identity.usuario[0].idUsuario, this.personaInstructor.idPersona_PersonaCurso, this.idCurso).subscribe(
				result => {
					this.mensajes2 = result.Mensajes
                    this.mensajeModel.mensaje = '';

				})
		}, error => {
			var errorMensaje = <any>error;
			if (errorMensaje != null) {
				var body = JSON.parse(error._body);
			}
		});

	}


	subirArchivos(idContenido) {
		this._cursoService.getIdEvalContenido(idContenido).subscribe(response => {
			this.idEvaluacioncontenido = response.idEvaluacioncontenido[0].idEvaluacioncontenido;
			this.makeFileRquest(this.url + 'subeDocTarea/' + this.idUsuarioPersonaCursoGlob + '/' + this.idEvaluacioncontenido,
				[], this.filesToUpload).then(
					(result: any) => {
                        swal("Exito", response.message, "success");

					}
				).catch(error => {
                    swal({type: 'error',
                    title: 'No se subio el archivo'});
				})
		})

	}

}

@Component({
	selector: 'app-curso-alumno',
	templateUrl: './curso-alumnoshare.component.html',
	styleUrls: ['./curso-alumno.component.css']
})
export class CursoUserShare implements OnInit {
	public items;
	public url;
	public locurl: string;
	public win: Window;
	public finurl: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<CursoUserShare>) {
		this.url = GLOBAL.url;
		this.win = window;
		this.finurl = _router.url;
		this.locurl = 'https://www.google.com'
	}

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}