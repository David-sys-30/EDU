import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
 // Importar componentes que tienen que ver con el Usuario
 import { ActualizaAdministradorComponent } from './components/actualiza-administrador/actualiza-administrador.component';
 

 import { CatalogosComponent } from './components/catalogos/catalogos.component';
 import { CategoriasComponent } from './components/categorias/categorias.component';
 import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
 import { RequisitosComponent } from './components/requisitos/requisitos.component';
 import { CursoComponent } from './components/curso/curso.component';
 import { AgregarcursoComponent } from './components/curso/agregarcurso.component';
 import { EditaCurso } from './components/curso/editacurso.component';
 import { ModuloComponent } from './components/modulo/modulo.component'
 import { TemaComponent } from './components/tema/tema.component';
 import { ContenidoComponent } from './components/contenido/contenido.component';
 import { ExamenModuloComponent } from './components/examen-modulo/examen-modulo.component';
 import { PerfilesComponent } from './components/perfiles/perfiles.component';
 import { RegistraPerfil } from './components/perfiles/registraPerfil.component';
 import { ModificaPerfil } from './components/perfiles/modificarPerfil.component';
 import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
 import { PersonaComponent, RegpersonaComponent, EditpersonaComponent } from './components/persona/persona.component';
 import { AsignarPerfilesComponent, EditasignarperfilesComponent } from './components/asignar-perfiles/asignar-perfiles.component';
 import { ModificarPerfilesComponent } from './components/asignar-perfiles/modificarAsignarPerfiles.component';
import { RegistraPerfilPersona } from './components/asignar-perfiles/registrarPerfilPersona.component';
import { Login, LoginComponentPersona , LoginComponentAdministrador } from './components/login/login.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { PracticasComponent } from './components/practicas/practicas.component';
import {CalificacionesComponent} from './components/calificaciones/calificaciones.component';
 import {MensajesComponent} from './components/mensajes/mensajes.component';
 import {ChatInstructorComponent} from './components/chat-instructor/chat-instructor.component';
 import {PermisosComponent} from './components/permisos/permisos.component';
 import { GruposComponent, DetGrupoComponent } from './components/grupos/grupos.component';
 import { CargaBannersComponent } from './components/carga-banners/carga-banners.component';
 import {CambioPassAdminComponent} from './components/cambio-pass-admin/cambio-pass-admin.component'
 
 
 
 

 const appRoutes:Routes=[
 	{path: '', component:ActualizaAdministradorComponent},
 	{path: 'mis-datos', component:ActualizaAdministradorComponent},
 	{path: 'catalogos', component:CatalogosComponent},
 	{path: 'categorias', component:CategoriasComponent},
 	{path: 'subCategorias/:idCategoria', component:SubcategoriasComponent},
 	{path: 'requisitos', component:RequisitosComponent},
 	{path: 'crearCurso', component:CursoComponent},
 	{path: 'agregarCurso', component:AgregarcursoComponent},
 	{path: 'editaCurso/:idCurso', component:EditaCurso},
 	{path: 'modulos/:idCurso/:nombreCurso', component:ModuloComponent},
 	{path: 'temas/:idModulo/:nombreModulo/:nombreCurso', component:TemaComponent},
 	{path: 'contenido/:idTema/:nombreTema/:nombreModulo/:nombreCurso', component:ContenidoComponent},
 	{path: 'examen-modulo/:idExamen/:nombreCurso/:nombreModulo/:idModulo', component:ExamenModuloComponent},
 	{path: 'verPerfiles', component:PerfilesComponent},
 	{path: 'registraPerfil', component:RegistraPerfil},
 	{path: 'modificaPerfil/:idPerfil', component:ModificaPerfil},
 	{path: 'especialidades', component:EspecialidadesComponent},
 	{path: 'persona', component:PersonaComponent},
 	{path: 'regPersona', component:RegpersonaComponent},
 	{path: 'editPersona/:idPersona', component:EditpersonaComponent},
 	{path: 'asignarperfiles', component:AsignarPerfilesComponent},
 	{path: 'editasignarperf/:idPersona', component:EditasignarperfilesComponent},
 	{path: 'modificar-perfiles/:idPersona/:idCurso', component:ModificarPerfilesComponent},
 	{path: 'registra-perfil-persona', component:RegistraPerfilPersona},
 	{path: 'loginPersona', component:LoginComponentPersona},
 	{path: 'loginAdmin', component:LoginComponentAdministrador},
 	{path: 'misalumnos/:idPersona', component:AlumnosComponent},
 	// {path: 'misalumnos/:idPersona/:idUsuarioPersonaCurso', component:AlumnosComponent},
 	{path: 'practicas/:idPersona', component:PracticasComponent},
 	{path: 'mensajes/:idPersona', component:MensajesComponent},
 	{path: 'chatinstructor/:idPersona/:idUsuario/:idCurso', component:ChatInstructorComponent},
 	{path: 'calificaciones/:idUsuario/:idCurso/:idModulo/:idTema', component:CalificacionesComponent},
 	{path: 'permisos', component:PermisosComponent},
 	{path: 'grupos', component:GruposComponent},
 	{path: 'grupo/:idGrupo', component:DetGrupoComponent},
 	{path: 'cargaBanners', component:CargaBannersComponent},
 	{path: 'cambiar-contrasena', component:CambioPassAdminComponent},
 	{path: '**', component:ActualizaAdministradorComponent},


 	
 ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);