import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonaService } from '../../services/persona.service';
import { UsuarioModel } from '../../models/usuario.model';
import {PersonaModel} from '../../models/persona.model';

export interface User {
  nombre: string;
}

// export interface Persona{
// 	nombrePersona: string;
// }


@Component({
  selector: 'app-cambio-pass-admin',
  templateUrl: './cambio-pass-admin.component.html',
  styleUrls: ['./cambio-pass-admin.component.css'],
  providers: [PersonaService]
})
export class CambioPassAdminComponent implements OnInit {

	public options = [];
	// public options2 = [];
	public type;
	public idUU = 0;
	public user:UsuarioModel;
  public persona:PersonaModel;
  public p1;
  public p2;

  constructor(private _personaservice:PersonaService) {
  	this._personaservice.getAllUsers().subscribe(response=>{
  		for(var a in response.usuarios){
  			this.options.push({nombre:response.usuarios[a].nombreUsuario,id:response.usuarios[a].idUsuario,tipo:"user"})
  		}
  		// this.options.push(response.usuarios)
  	})
  	this._personaservice.getPersonas().subscribe(response=>{
  		for(var b in response.personas){
  		this.options.push({nombre:response.personas[b].nombrePersona,id:response.personas[b].idPersona,tipo:"per"})
  		// this.options.push(response.personas);
  		}
  	})

  	this.user = new UsuarioModel('','','','','','','','');
    this.persona = new PersonaModel('','','','','','','','','','');

   }

  myControl = new FormControl();
  // myControl2 = new FormControl();
  // options: User[] = [
  //   {nombreUsuario: 'Mary'},
  //   {nombreUsuario: 'Shelley'},
  //   {nombreUsuario: 'Igor'}
  // ];
  filteredOptions: Observable<User[]>;
  // filteredOptions2: Observable<Persona[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value),
        map(nombre => nombre ? this._filter(nombre) : this.options.slice())
      );

      
  }

  displayFn(user?: User): string | undefined {
    return user ? user.nombre : undefined;
  }

  private _filter(nombre: string): User[] {
    const filterValue = nombre.toString().toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  cambiarPass(tipoU,idU){
  	this.type = tipoU;
  	this.idUU = idU;
  }	

  getp1(pass1){
    this.p1 = pass1;
  }

  getp2(pass2){
    this.p2 = pass2;
  }

  cambPass(){
     if(this.p1 == this.p2){
          if (this.type == "user"){
          this._personaservice.cambiarCont(this.idUU,this.user.contrasenaUsuario).subscribe(response=>{
            alert(response.resp);
          })  
        }else if(this.type == "per"){
          this._personaservice.cambiarContPersona(this.idUU,this.user.contrasenaUsuario).subscribe(response=>{
            alert(response.resp);
          }) 
        }else{
          alert("Selecciona un Usuario o Persona")
        }
     } else{
       alert("Las contraseñas no coinciden")
     }

  }

}
