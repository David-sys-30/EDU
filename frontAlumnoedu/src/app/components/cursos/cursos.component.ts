import { Component, OnInit,  PipeTransform, Pipe, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CursosService } from '../../services/cursos.service';
import { UsuarioService } from '../../services/usuario.service';
import { timer } from 'rxjs';
import {take} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GLOBAL } from '../../services/global.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService, UsuarioService]
})
export class CursosComponent implements OnInit {
  public identity;
  public cursos;
  public filtrados;
  public cat;
  public url;
  public curso;
  public personaCurso;
  public arrayItems = [];
  public image;
  public charImg;

  constructor(
    private _usuarioService:UsuarioService,
    private cookieService: CookieService,
    private _cursosService:CursosService) {
    this.url = GLOBAL.url;    

    if(localStorage.getItem('Carrito') == null){
      
    }else{
    if(localStorage.getItem('Carrito').length != 0){
      
      var parsed =(JSON.parse(localStorage.getItem('Carrito')));
      for(var x in parsed){
        this.arrayItems.push(parsed[x]);    

        
      }
      
    }
  
    }
  }

  ngOnInit() {
    
    this.getCursos();
    this.image = this.identity.imagenUsuario;
      this.charImg = this.image.substring(0,5);
  }

  getCursos() {
    this._cursosService.getCursos().subscribe(
      response=>{
        this.cursos = response.curso;
        timer(1000).subscribe(x=>{
          this.checkCarrito();
          this.identity = this._usuarioService.getIdentity();
          this.checkCarrito2(this.identity);
        })
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      })
  }

  filtra() {
    this.cat = $("#cat").val();
    // $("."+this.cat).show();
    for (var i = 0; i < this.cursos.length; ++i) {
      if (this.cursos[i].nombreCategoriacurso == this.cat) {
        $("."+this.cat+this.cursos[i].idCurso).show();
      }
      else {
        $("."+this.cat+this.cursos[i].idCurso).hide();
      }
    }
  }

  getCurso(idCurso,idUsuario) {
    this._cursosService.getCurso(idCurso,idUsuario).subscribe(
      response=>{

        this.curso = response.curso[0]

        this.personaCurso = response.personaCurso[0]
        this.getItemstoCart(this.curso,this.personaCurso);        
        this.addtoCart();
      },error=>{
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          var body = JSON.parse(error._body);
        }
      })
    
  }

  public getItemstoCart(curso,persona){
  this.arrayItems.push({curso,persona});
  }

  public addtoCart(){
    let  item = JSON.stringify(this.arrayItems);
    localStorage.setItem('Carrito', item);
    document.getElementById(this.curso.idCurso).setAttribute('disabled',"");    
  }

   checkCarrito(){
    for(var x in this.cursos){
      for(var y in this.arrayItems){
        if(this.cursos[x].idCurso == this.arrayItems[y].curso.idCurso){
          document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
          // $("#"+this.cursos[x].idCurso).css("background-color", "green");
          // $("#"+this.cursos[x].idCurso).html('Adquirido');
        }
      }
      
      if (this.identity != null) {
        for(var t in this.identity.idCurso){
        if(this.identity.idCurso[t].idCurso == this.cursos[x].idCurso){
          document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
          // $("#"+this.cursos[x].idCurso).css("background-color", "green");
          // $("#"+this.cursos[x].idCurso).html('Adquirido'); 
        }  
      }
      }

    }
  }

  checkCarrito2(identidad){
     
    for(var x in this.cursos){

      for(var y in this.arrayItems){
        if(this.cursos[x].idCurso == this.arrayItems[y].curso.idCurso){
          document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
          $("#"+this.cursos[x].idCurso).css("background-color", "green");
          $("#"+this.cursos[x].idCurso).html('Adquirido');
        }else{
        document.getElementById(this.cursos[x].idCurso).removeAttribute("disabled");
        $("#"+this.cursos[x].idCurso).css("background-color", "#1686F5");
        $("#"+this.cursos[x].idCurso).html('<i class="fas fa-briefcase nav-item active carrito nav-icons "></i>&nbsp; Agregar');
        }
      }
      if (identidad != null) {        
        for(var t in identidad.idCurso){
        if(identidad.idCurso[t].idCurso == this.cursos[x].idCurso){
          document.getElementById(this.cursos[x].idCurso).setAttribute('disabled',"");
          $("#"+this.cursos[x].idCurso).css("background-color", "green");
          $("#"+this.cursos[x].idCurso).html('Adquirido');
        }  
      }
      }else{
        document.getElementById(this.cursos[x].idCurso).removeAttribute("disabled");
        $("#"+this.cursos[x].idCurso).css("background-color", "#1686F5");
        $("#"+this.cursos[x].idCurso).html('<i class="fas fa-briefcase nav-item active carrito nav-icons "></i>&nbsp; Agregar');
      }

    }
  }


}
