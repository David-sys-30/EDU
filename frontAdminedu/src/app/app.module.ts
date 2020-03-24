import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';
import { Ng5SliderModule } from 'ng5-slider';



// Rutas
import { routing, appRoutingProviders } from './app.routing';
// end Rutas

import { AppComponent } from './app.component';

import { ActualizaAdministradorComponent } from './components/actualiza-administrador/actualiza-administrador.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Login, LoginComponentPersona , LoginComponentAdministrador } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { CatalogosComponent } from './components/catalogos/catalogos.component';
import { CategoriasComponent, DialogOverviewExampleDialog, ModificarCategoria } from './components/categorias/categorias.component';

// Tarjetas
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SubcategoriasComponent, AgregarSubcategoria, ModificarSubcategoria } from './components/subcategorias/subcategorias.component';
import { RequisitosComponent, RegistraRequisito, ActualizaRequisito } from './components/requisitos/requisitos.component';
import { CursoComponent } from './components/curso/curso.component';
import { AgregarcursoComponent } from './components/curso/agregarcurso.component'
import { EditaCurso } from './components/curso/editacurso.component';
import { ModuloComponent, RegistraModulo, EditaModulo, AgregaExamen, VerExamen, AddEvaluacionModulo, ModificarEvaluacionModulo } from './components/modulo/modulo.component';
import { TemaComponent, RegistraTema, ActualizaTema, AddEvaluacionTema, ModificarEvaluacionTema } from './components/tema/tema.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { VideoComponent, ModificarVideo, SafePipe } from './components/contenido/video/video.component';
import { DocumentoComponent, ModificarDocumento } from './components/contenido/documento/documento.component';
import { PracticaComponent, ModificarPractica } from './components/contenido/practica/practica.component';
import { ProyectoComponent, ModificarProyecto} from './components/contenido/proyecto/proyecto.component';
import { ExamenModuloComponent, EditaExamen } from './components/examen-modulo/examen-modulo.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { RegistraPerfil } from './components/perfiles/registraPerfil.component';
import { ModificaPerfil } from './components/perfiles/modificarPerfil.component';
import { EspecialidadesComponent, InsertaEspecialidad, modificarEspecialidad } from './components/especialidades/especialidades.component';
import { PersonaComponent, RegpersonaComponent, EditpersonaComponent } from './components/persona/persona.component';
import { AsignarPerfilesComponent, EditasignarperfilesComponent } from './components/asignar-perfiles/asignar-perfiles.component';
import { ModificarPerfilesComponent } from './components/asignar-perfiles/modificarAsignarPerfiles.component'
import { RegistraPerfilPersona } from './components/asignar-perfiles/registrarPerfilPersona.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AlumnosbComponent } from './components/alumnosb/alumnosb.component';
import { PracticasComponent } from './components/practicas/practicas.component';
import { CalificacionesComponent, ActualizaCalificacionTarea } from './components/calificaciones/calificaciones.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { ChatInstructorComponent } from './components/chat-instructor/chat-instructor.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { GruposComponent, RegistraGrupo, DetGrupoComponent } from './components/grupos/grupos.component';
import { CargaBannersComponent, RegistraBanner } from './components/carga-banners/carga-banners.component';
import { CambioPassAdminComponent } from './components/cambio-pass-admin/cambio-pass-admin.component';



@NgModule({
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: []
})
export class DemoMaterialModule {}
// End Tarjetas

@NgModule({
  entryComponents: [
    CategoriasComponent, 
    DialogOverviewExampleDialog,
    ModificarCategoria,
    AgregarSubcategoria,
    ModificarSubcategoria,
    RegistraRequisito,
    ActualizaRequisito,
    RegistraModulo,
    EditaModulo,
    RegistraTema,
    ActualizaTema,
    ModificarProyecto,
    ModificarPractica,
    ModificarVideo,
    ModificarDocumento,
    AgregaExamen,
    VerExamen,
    EditaExamen,
    AddEvaluacionTema,
    ModificarEvaluacionTema,
    AddEvaluacionModulo,
    ModificarEvaluacionModulo,
    InsertaEspecialidad,
    modificarEspecialidad,
    PersonaComponent,
    RegpersonaComponent,
    EditpersonaComponent,
    AsignarPerfilesComponent,
    EditasignarperfilesComponent,
    AlumnosComponent,
    PracticasComponent,
    ActualizaCalificacionTarea,
    MensajesComponent,
    ChatInstructorComponent,
    RegistraGrupo,
    PermisosComponent,
    GruposComponent,
    DetGrupoComponent,
    CargaBannersComponent,
    RegistraBanner
  ],
  declarations: [
    AppComponent,
    ActualizaAdministradorComponent,
    NavbarComponent,
    Login,
    LoginComponentPersona,
    LoginComponentAdministrador,
    RegisterComponent,
    MiPerfilComponent,
    CatalogosComponent,
    CategoriasComponent,
    DialogOverviewExampleDialog,
    ModificarCategoria,
    SubcategoriasComponent,
    AgregarSubcategoria,
    ModificarSubcategoria,
    RequisitosComponent,
    RegistraRequisito,
    ActualizaRequisito,
    CursoComponent,
    AgregarcursoComponent,
    EditaCurso,
    ModuloComponent,
    RegistraModulo,
    EditaModulo,
    TemaComponent,
    RegistraTema,
    ActualizaTema,
    ContenidoComponent,
    VideoComponent,
    SafePipe,
    DocumentoComponent,
    PracticaComponent,
    ProyectoComponent,
    ModificarProyecto,
    ModificarPractica,
    ModificarVideo,
    ModificarDocumento,
    ExamenModuloComponent,
    AgregaExamen,
    VerExamen,
    EditaExamen,
    AddEvaluacionTema,
    ModificarEvaluacionTema,
    AddEvaluacionModulo,
    ModificarEvaluacionModulo,
    PerfilesComponent,
    RegistraPerfil,
    ModificaPerfil,
    EspecialidadesComponent,
    InsertaEspecialidad,
    modificarEspecialidad,
    PersonaComponent,
    RegpersonaComponent,
    EditpersonaComponent,
    AsignarPerfilesComponent,
    EditasignarperfilesComponent,
    ModificarPerfilesComponent,
    RegistraPerfilPersona,
    AlumnosComponent,
    PracticasComponent,
    CalificacionesComponent,
    ActualizaCalificacionTarea,
    MensajesComponent,
    ChatInstructorComponent,
    RegistraGrupo,
    PermisosComponent,
    GruposComponent,
    DetGrupoComponent,
    CargaBannersComponent,
    RegistraBanner,
    CambioPassAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DemoMaterialModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot(),
    Ng5SliderModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
