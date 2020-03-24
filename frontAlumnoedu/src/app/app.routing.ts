import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
 // Importar componentes que tienen que ver con el Usuario 
import { IndexComponent } from './components/index/index.component';
import { CarritoComponent, CarritoPagarComponent } from './components/carrito/carrito.component';
import { VistaCursoComponent } from './components/vista-curso/vista-curso.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import  {AlumnosDestacadosComponent} from './components/alumnos-destacados/alumnos-destacados.component';
import { CursoAlumnoComponent } from './components/curso-alumno/curso-alumno.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ExamenrComponent } from './components/examenR/examenR.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AgendaComponent } from './components/agenda/agenda.component';

import { ChatusersComponent } from './components/chatusers/chatusers.component';
import {CambiarPassComponent} from './components/cambiar-pass/cambiar-pass.component';


 const appRoutes:Routes=[
 	{path: '', component:IndexComponent},
 	{ path: 'index', component: IndexComponent},
 	{ path: 'carrito', component: CarritoComponent},
 	{ path: 'carrito/pagar', component: CarritoPagarComponent},
 	{ path: 'vista-curso/:idCurso', component: VistaCursoComponent},
 	{ path: 'mi-perfil/:idUsuario', component: MiPerfilComponent},
 	{ path: 'alumnos_destacados', component: AlumnosDestacadosComponent},
 	{ path: 'curso-alumno/:idUsuarioPersonaCurso/:idAvance/:idCurso', component: CursoAlumnoComponent},
 	{ path: 'instructor/:idPersona', component: InstructorComponent},
 	{ path: 'examen/:idModulo/:idExamen/:idUsuarioPersonaCurso', component: ExamenrComponent},
 	{ path: 'examenR', component: ExamenrComponent},
 	{ path: 'cursos', component: CursosComponent},
 	{ path: 'agenda', component: AgendaComponent},
 	
 	{ path: 'chatuser/:idreceptor/:idemisor/:idcurso', component: ChatusersComponent},

 	{path: 'cambiar-pass/:codConf', component:CambiarPassComponent},
 	{path: '**', component:IndexComponent}
 ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);