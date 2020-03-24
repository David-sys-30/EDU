import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PersonaModel } from '../../models/persona.model';
import {ExamenService} from  '../../services/examen.service';
import { TemasService} from '../../services/tema.service';
import {ContenidoService} from '../../services/contenido.service';
import { AdministradorService } from '../../services/administrador.service';
import {ModulosService} from '../../services/modulo.service';
import { GLOBAL } from '../../services/global';
import { CursoService } from '../../services/curso.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalificaMaterialModel } from '../../models/materialevalusuario.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface dataEditarCalificacion{
  calificacionMaterialevalusuario:string,
  idEval:string,
  idEvalMod:string
}

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
  providers:[PersonaService,CursoService,ExamenService,ContenidoService, TemasService,ModulosService,AdministradorService]
})
export class CalificacionesComponent implements OnInit {
	public Persona;
  public identity;
  public url:string;
  public curso;
  public modulos;
  public modulo;
  public requisitos;
  public aprendizajes;
  public temas;
  public examenes;
  public examen;
  public calificacionExamen;
  public contenido;
  public CalificaMaterial:CalificaMaterialModel;
  public promedio = 0;
  public promedio2 = 0;
  public reg;
  public temamod;
  public nombreTema;
  public idEvalTema;
  public idEvalMod;
  public promModulo;
  public numTemas;


  public popid;
  public popidcurso;
  public popidmodulo;
  public popidTema;
  public popidPersona;
  constructor(private _personaservice:PersonaService,
              private _route: ActivatedRoute,
              private _router: Router, 
              private _cursoservice:CursoService, 
              private _ExamenService:ExamenService,
              private _contenidoService:ContenidoService,
              private _temaService:TemasService,
              private _moduloService:ModulosService,
              private _administradorService:AdministradorService,
              public dialog: MatDialog) {
    this.url = GLOBAL.url;
  	this.identity = this._administradorService.getIdentity();
   }


  ngOnInit() {
    this.promModulo = 0;
    this._route.params.forEach((params: Params) =>{
      let id = params['idUsuario'];
      let idcurso = params['idCurso'];
      let idmodulo = params['idModulo'];
      let idTema = params['idTema']
      this.popid = id;
      this.popidcurso = idcurso;
      this.popidmodulo = idmodulo;
      this.popidTema = idTema;
      this._personaservice.getUsuarioPersonaCurso(this.identity[0].admin.idAdministrador,idcurso,id).subscribe(response=>{
        this.popidPersona = response.idUsuarioPersonaCurso;
      })
      this._personaservice.getUsuario(id).subscribe(response=>{
        
          this.Persona = response.usuario[0];

          this._contenidoService.getdocumentos(this.Persona.idUsuario,idTema).subscribe(response=>{
            this.contenido = response.contenidoeval[0];
          })

          this._moduloService.obteneridModuloEval(idmodulo).subscribe(response=>{
            this.idEvalMod = response.idEvalModulo;
          })

          this._temaService.obteneridTemaEval(idTema).subscribe(response=>{
            this.idEvalTema = response.idEvalTema;
          })

          this._cursoservice.vistaCurso(idcurso).subscribe(
      response=>{
        this.curso = response.curso[0];
        this.modulos = response.contenido;
        this.requisitos = response.requisitos;
        this.aprendizajes = response.aprendizajes;
        this.examenes = response.examen;
        
       
        for(var x in this.modulos){
          // this._moduloService.obtenerCalifModulos(this.modulos[x].modulo.idModulo).subscribe(response=>{
          // })
          if(idmodulo == this.modulos[x].modulo.idModulo){
             this.modulo= this.modulos[x].modulo;
             this.temas=this.modulos[x].modulo.temas;
             this.numTemas = this.modulos[x].modulo.temas.length;
             for(var g in this.modulos[x].modulo.temas){
               if (idTema == this.modulos[x].modulo.temas[g].idTema){
                 this.nombreTema = this.modulos[x].modulo.temas[g].nombreTema;
               }
               this._temaService.obtenerCalifTemas(this.modulos[x].modulo.temas[g].idTema).subscribe(response=>{
                 if(response.temas[0].califTema.length == 0){
                 }else{
                   this.promModulo = this.promModulo + response.temas[0].califTema[0].califTema;
                 }
               });
             }
          }
        }
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      })
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
        }
      }
      );
    }) 
  }

  


   public editarCalificacion(idMaterialevalusuario, promModulo,numTemas){
    let  dialogRef = this.dialog.open(ActualizaCalificacionTarea,{
      width: '400px',
      data:{
        idMaterialevalusuario:idMaterialevalusuario,
        idEvalTema:this.idEvalTema,
        idEvalMod:this.idEvalMod,
        promModulo:promModulo,
        numTemas:numTemas,
        id:this.popid,
        idCurso:this.popidcurso,
        idmodulo:this.popidmodulo,
        idTema:this.popidTema,
        idUsuarioPersonaCurso:this.popidPersona
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'app-actualizaCalificacionTarea',
  templateUrl: './actualizaCalificacionTarea.component.html',
  styleUrls: ['./calificaciones.component.css'],
  providers: [PersonaService,CursoService,ExamenService,ContenidoService, TemasService, ModulosService,CalificacionesComponent,AdministradorService]
})
export class ActualizaCalificacionTarea{
  public CalificacionTarea;
  public califModulo;
  public Persona;
  public url:string;
  public curso;
  public modulos;
  public modulo;
  public requisitos;
  public aprendizajes;
  public temas;
  public examenes;
  public examen;
  public calificacionExamen;
  public contenido;
  public promedio = 0;
  public promedio2 = 0;
  public reg;
  public temamod;
  public nombreTema;
  public idEvalTema;
  public idEvalMod;
  public promModulo;
  public numTemas;
  public promFin = 0;


  public porcTem;
  public procMod;
  public promFinMod = 0;
  constructor(
    private _personaservice:PersonaService,
              private _route: ActivatedRoute,
              private _router: Router, 
              private _cursoservice:CursoService, 
              private _ExamenService:ExamenService,
    public dialogRef: MatDialogRef<ActualizaCalificacionTarea>,
    private _contenidoService:ContenidoService,
    private _temaService:TemasService,
    private _moduloService:ModulosService,
    private _califComp:CalificacionesComponent,
    @Inject(MAT_DIALOG_DATA) public data: dataEditarCalificacion
    ){
    this.CalificacionTarea = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  actualizaCalificacion(promMod){    
    this._contenidoService.actualizaCalificacionTarea(this.CalificacionTarea).subscribe(
      result=>{
        this._temaService.registraCalifTema({idEvaluacionTema_CalifTema:this.CalificacionTarea.idEvalTema,califTema:this.CalificacionTarea.calificacionMaterialevalusuario}).subscribe(
          response=>{
            this.popFunc(this.CalificacionTarea.id,this.CalificacionTarea.idCurso,this.CalificacionTarea.idmodulo,this.CalificacionTarea.idTema);
            
          })

        this.dialogRef.close();
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      })


  }


  public popFunc(id,idcurso,idmodulo,idTema){
    this.promModulo = 0;
    this._route.params.forEach((params: Params) =>{
      this._personaservice.getUsuario(id).subscribe(response=>{
        
          this.Persona = response.usuario[0];

          this._contenidoService.getdocumentos(this.Persona.idUsuario,idTema).subscribe(response=>{
            this.contenido = response.contenidoeval[0];
          })

          this._moduloService.obteneridModuloEval(idmodulo).subscribe(response=>{
            this.idEvalMod = response.idEvalModulo;
          })

          this._temaService.obteneridTemaEval(idTema).subscribe(response=>{
            this.idEvalTema = response.idEvalTema;
          })

          this._cursoservice.vistaCurso(idcurso).subscribe(
      response=>{

        this.curso = response.curso[0];
        this.modulos = response.contenido;
        this.requisitos = response.requisitos;
        this.aprendizajes = response.aprendizajes;
        this.examenes = response.examen;

        for(var x in this.modulos){
          if(idmodulo == this.modulos[x].modulo.idModulo){
             this.modulo= this.modulos[x].modulo;
             this.temas=this.modulos[x].modulo.temas;
             this.numTemas = this.modulos[x].modulo.temas.length;
             for(var g in this.modulos[x].modulo.temas){
               if (idTema == this.modulos[x].modulo.temas[g].idTema){
                 this.nombreTema = this.modulos[x].modulo.temas[g].nombreTema;
               }
               this._temaService.obtenerCalifTemas(this.modulos[x].modulo.temas[g].idTema).subscribe(response=>{
                 if(response.temas[0].califTema.length == 0){
                 }else{
                   this.porcTem = (response.temas[0].evalTema[0].evaluacionEvaluaciontema*response.temas[0].califTema[0].califTema)/10;
                   this.promFin = this.promFin + this.porcTem;

                   // this.promModulo = this.promModulo + (this.promFin/10);
                   // this.promFin = this.promModulo/this.modulos[x].modulo.temas.length;
                 }
                 this._moduloService.registraCalifModulo({idEvaluacionModulo_CalifModulo:this.CalificacionTarea.idEvalMod,califModulo:(this.promFin/10)}).subscribe(response=>{
                     this.califMod(this.CalificacionTarea.id,this.CalificacionTarea.idCurso,this.CalificacionTarea.idmodulo,this.CalificacionTarea.idTema);
                     this.porcTem = 0;
                     this.promFin = 0;
                  })
               });
             } 

          }

           
        }
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      })
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
        }
      }
      );
    })
  }

  public califMod(id,idcurso,idmodulo,idTema){
    this.promModulo = 0;
    // this._route.params.forEach((params: Params) =>{
      this._personaservice.getUsuario(id).subscribe(response=>{
        
          this.Persona = response.usuario[0];

          this._contenidoService.getdocumentos(this.Persona.idUsuario,idTema).subscribe(response=>{
            this.contenido = response.contenidoeval[0];
          })

          this._moduloService.obteneridModuloEval(idmodulo).subscribe(response=>{
            this.idEvalMod = response.idEvalModulo;
          })

          this._temaService.obteneridTemaEval(idTema).subscribe(response=>{
            this.idEvalTema = response.idEvalTema;
          })

          this._cursoservice.vistaCurso(idcurso).subscribe(
      response=>{

        this.curso = response.curso[0];
        this.modulos = response.contenido;
        this.requisitos = response.requisitos;
        this.aprendizajes = response.aprendizajes;
        this.examenes = response.examen;

        for(var x in this.modulos){
              this._moduloService.obtenerCalifModulos(this.modulos[x].modulo.idModulo).subscribe(response=>{
                        if(response.modulos[0].califModulo.length == 0){
                        }else{
                          this.procMod = (response.modulos[0].evalModulo[0].evaluacionEvaluacionmodulo * response.modulos[0].califModulo[0].califModulo)/10;
                          this.promFinMod = this.promFinMod + this.procMod;
                          // this.promFinMod = this.promFinMod/this.modulos[x].modulo.temas.length
                          
                          
                        }
                        this._cursoservice.registraCalifCurso({califCur:((this.promFinMod/10)/this.modulos[x].modulo.temas.length)},this.CalificacionTarea.idUsuarioPersonaCurso).subscribe(response=>{                      
                          // this.procMod = 0;
                          // this.promFinMod = 0;
                               })
                        
                        
                      })

        }
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      })
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
        }
      }
      );
    // })
  }
}

