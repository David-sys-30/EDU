import { Component, OnInit } from '@angular/core';
import {ExamenService} from  '../../services/examen.service';

@Component({
  selector: 'app-calificacion-examen',
  templateUrl: './calificacion-examen.component.html',
  styleUrls: ['./calificacion-examen.component.css'],
  providers: [ExamenService]
})
export class CalificacionExamenComponent implements OnInit {
	public Persona;	
	public examen;
	public calificacionExamen;
	public contenido;
  public promedio = 0;
  public promedio2 = 0;

  constructor(private _ExamenService:ExamenService) { }

  ngOnInit() {
  	this._ExamenService.getCalificacionExamenPersona(this.Persona.idUsuario).subscribe(response=>{
        for(var j in response.examen){
          if(response.examen[j][0]){
            if(this.examen.examen[0].idExamen  == response.examen[j][0].idExamen_examenevalusuario){
             
           this.calificacionExamen = response.examen[j][0].calificacionExamenevalusuario;
           
          }
          }

          
        }
         // calcula promedio
         for(var y in this.contenido){
           this.promedio=this.contenido[y].calificacionMaterialevalusuario + this.promedio
           this.promedio2 = +y
         }

           
         this.promedio2 = this.promedio2+1;
         this.promedio = this.promedio / this.promedio2

           
        this.promedio = this.promedio + this.calificacionExamen ;
       this.promedio = this.promedio / 2;


           // if (this.promedio >5) {
           //   this._temaService.obtenerTemas(idmodulo).subscribe(responses=>{
           //     this.temamod = responses.tema;
           //     for (var i in this.temamod) {
           //       this.reg = ({'idTema': this.temamod[i].idTema, 'idUsuario': id, 'numeroModulo': idmodulo});
           //        this._personaservice.temaVisto(id, this.temamod[i].idTema, idmodulo, this.reg)
           //        .subscribe(resp=>{
           //        });
           //     }
           //   });
           // }
           this.promedio2=this.promedio
           this.promedio = 0;

    })
  }

}
