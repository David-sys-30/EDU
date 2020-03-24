import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ExamenService } from '../../services/examen.service';
import { ModulosService } from '../../services/modulos.service';
import { GLOBAL } from '../../services/global.service';
import { UsuarioService } from '../../services/usuario.service';
import { CursosService } from '../../services/cursos.service';
import { TemaService } from '../../services/tema.service';
import { timer } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-examenR',
  templateUrl: './examenR.component.html',
  styleUrls: ['./examenR.component.css'],
  providers: [ExamenService, ModulosService, UsuarioService, CursosService, TemaService]
})
export class ExamenrComponent implements OnInit {
  public array_respseleccionadas = [];
  public array_respuestascorrectas = ["1","2","3","4","1"];
  public calificacion = 10;

  public identity;
  public examen;
  public modulo;
  public preguntas;
  public aciertos = 0;
  public respuestas = [];
  public respuestasUsuario = []
  public respuestas1Temp = [];
  public respuestas2Temp = [];
  public respuestas3Temp = [];
  public respuestas4Temp = [];
  public respuestas5Temp = [];
  public respuestas6Temp = [];
  public respuestas7Temp = [];
  public respuestas8Temp = [];
  public respuestas9Temp = [];
  public respuestas10Temp = [];
  public letras = ['a','b','c','d','e','f','g','h','i','j'];
  public totalTiempo=0;
  public totalTiempo2=0;
  public idPregunta;
  public idRespuestaUsuario
  public valuetiempo;
  public idUsuarioPersonaCursoGlob;
  public locurl: string;
  public win:Window;
  public finurl:string;

  FormGroup1: FormGroup;


   @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

   complete() {
        this.stepper.selected.completed = true;
        this.stepper.selected.editable = true;
        this.stepper.next();
    }



  
  

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _examenService:ExamenService,
    private _modulosService:ModulosService,
    private _formBuilder: FormBuilder,
    private _usuariorService:UsuarioService,
    ) {
    this._route.params.forEach((params: Params) =>{
          this.idUsuarioPersonaCursoGlob = params['idUsuarioPersonaCurso'];
          
          this.locurl = window.location.href;
          this.win = window;
          this.finurl = _router.url;
          });

    this.identity = this._usuariorService.getIdentity();
  
    this._route.params.forEach((params: Params) =>{
      let idModulo = params['idModulo'];
      let idExamen = params['idExamen'];

      
      this._examenService.randomPreguntas(idExamen).subscribe(
        response=>{
          this.examen = response.examen[0];
          
          this.preguntas = response.preguntas;
          this.getRespuestasCorrectas()
          
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      }
      )
      this._modulosService.obtenerModulo(idModulo).subscribe(
        response=>{
            this.modulo = response.modulo[0];
        },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
          }
        }
        )
    }) 
  }



  getRespuestasCorrectas(){
    for(var p in this.preguntas){
      for(var q in this.preguntas[p].respuestas){
        if(this.preguntas[p].respuestas[q].statusRespuestaexamen == 1){                  
          this.respuestas.push({idPreg:this.preguntas[p].pregunta.idPreguntaexamen, idResp:this.preguntas[p].respuestas[q].idRespuestaexamen});
         
        }
      }
    }
  }

  //Añadir UsuarioPersonaCurso donde 'a'
  enviarCalificacion(calificacionExamenevalusuario){
    this._examenService.evalExamen({calificacionExamenevalusuario},this.idUsuarioPersonaCursoGlob,this.examen.idExamen).subscribe(response=>{
      
    })
  }

updateReloj2()
    {

      var minutes = Math.round((this.totalTiempo2 - 30)/60);
      var remainingSeconds = this.totalTiempo2 % 60;
      if (remainingSeconds < 10) { 
        document.getElementById('countdown').innerHTML = minutes + ':'+ "0" + remainingSeconds;
      }
        document.getElementById('countdown').innerHTML = minutes + ':'+ remainingSeconds;
 
        if(this.totalTiempo2==0)
        {
            
        }else{
            
            this.totalTiempo2-=1;
            
            timer(1000).subscribe(x=>{
            this.updateReloj2();
            })
            
        }
    }

    updateReloj()
    {
      var tiempoExamen;
      tiempoExamen = 100/this.examen.duracionExamen
      this.totalTiempo+=1;

      this.valuetiempo = (this.totalTiempo*tiempoExamen)/60;

            /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
            timer(1000).subscribe(x=>{
            this.updateReloj();
            })
            // setTimeout("this.updateReloj()",1000);
        
    }





  ngOnInit() {
    this.FormGroup1 = this._formBuilder.group({
      firstCtrl1: ['', Validators.required],
      firstCtrl2: ['', Validators.required],
      firstCtrl3: ['', Validators.required],
      firstCtrl4: ['', Validators.required],
      firstCtrl5: ['', Validators.required],
      firstCtrl6: ['', Validators.required],
      firstCtrl7: ['', Validators.required],
      firstCtrl8: ['', Validators.required],
      firstCtrl9: ['', Validators.required],
      firstCtrl10: ['', Validators.required]
    });


    
  }

  SeleccionaRespuesta(idPreg,idResp,ind, preg, retro,resp,status){
   
    this.idPregunta = idPreg;
    this.idRespuestaUsuario = idResp;
    switch (ind) {
      case 0:
            if (this.respuestas1Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas1Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas1Temp.length; i++){
         if(idPreg == this.respuestas1Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas1Temp.splice(0,1)
             this.respuestas1Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
        break;
        case 1:
        if (this.respuestas2Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas2Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas2Temp.length; i++){
         if(idPreg == this.respuestas2Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas2Temp.splice(0,1)
             this.respuestas2Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
    case 2:
        if (this.respuestas3Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas3Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas3Temp.length; i++){
         if(idPreg == this.respuestas3Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas3Temp.splice(0,1)
             this.respuestas3Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
    case 3:
        if (this.respuestas4Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas4Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas4Temp.length; i++){
         if(idPreg == this.respuestas4Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas4Temp.splice(0,1)
             this.respuestas4Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
    case 4:
        if (this.respuestas5Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas5Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas5Temp.length; i++){
         if(idPreg == this.respuestas5Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas5Temp.splice(0,1)
             this.respuestas5Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
      case 5:
            if (this.respuestas6Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas6Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas6Temp.length; i++){
         if(idPreg == this.respuestas6Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas6Temp.splice(0,1)
             this.respuestas6Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
        break;
        case 6:
        if (this.respuestas7Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas7Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas7Temp.length; i++){
         if(idPreg == this.respuestas7Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas7Temp.splice(0,1)
             this.respuestas7Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
    case 7:
        if (this.respuestas8Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas8Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas8Temp.length; i++){
         if(idPreg == this.respuestas8Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas8Temp.splice(0,1)
             this.respuestas8Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
    case 8:
        if (this.respuestas9Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas9Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas9Temp.length; i++){
         if(idPreg == this.respuestas9Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas9Temp.splice(0,1)
             this.respuestas9Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
    case 9:
        if (this.respuestas10Temp.length <= 0) {
      // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
      this.respuestas10Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
    }else{
        for(var i = 0; i < this.respuestas10Temp.length; i++){
         if(idPreg == this.respuestas10Temp[i].idPreg){
             // this.respuestasUsuario.splice(ind,1)
             // this.respuestasUsuario.push({idPreg:idPreg,idResp:idResp})
             this.respuestas10Temp.splice(0,1)
             this.respuestas10Temp.push({idPreg:idPreg,idResp:idResp,preg:preg,retro:retro,resp:resp,status:status})
         }
      }
    }
    break;
      
      default:
        // code...
        break;
    }

  }


  avanzarPregunta(ind){
    ind = ind+1
    var nextInd = ind+1
    var nextInd2 = 'r'+nextInd
    var ind2 = 'r'+ind
    if(ind != 5){
      document.getElementById(ind2).style.display = 'none';
      document.getElementById(nextInd2).style.display = 'block';  
    }
          

  }

  regresarPregunta(ind){
    ind = ind+1
    var prevInd = ind-1
    var prevInd2 = 'r'+prevInd
    var ind2 = 'r'+ind
    if(ind != 1){
      document.getElementById(ind2).style.display = 'none';
      document.getElementById(prevInd2).style.display = 'block';
    }
    

  }

  Iniciar(){
    document.getElementById('timer').style.display= 'block';
    this.updateReloj();
    this.totalTiempo2 = this.examen.duracionExamen*60;
    this.updateReloj2();
    document.getElementById('r').style.display = 'block';
    document.getElementById('start').style.display = 'none';

  }

  calcular_calificacion(){

    document.getElementById('r').style.display = 'none';
    $('#calificacion').show();
    document.getElementById('timer').style.display= 'none';

    this.respuestasUsuario = this.respuestas1Temp.concat(this.respuestas2Temp,this.respuestas3Temp,this.respuestas4Temp,this.respuestas5Temp,
      this.respuestas6Temp,this.respuestas7Temp,this.respuestas8Temp,this.respuestas9Temp,this.respuestas10Temp);
     for(var ru in this.respuestasUsuario){
      for(var rc in this.respuestas){
        if(this.respuestasUsuario[ru].idPreg == this.respuestas[rc].idPreg){
            if(this.respuestasUsuario[ru].idResp == this.respuestas[rc].idResp){
                this.aciertos++;

            } 
        }
      }
    }

    

  
}
}
 
