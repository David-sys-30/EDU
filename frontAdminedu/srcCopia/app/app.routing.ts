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

 	{path: '**', component:ActualizaAdministradorComponent},


 	
 ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);