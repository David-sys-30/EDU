import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { DemoMaterialModule } from './angularMaterial'
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';


import { routing, appRoutingProviders } from './app.routing';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular-6-social-login";
// Configs AuthFacebook
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2487470931323092")
        },
      ]
  )
  return config;
}


import { AppComponent } from './app.component';
import { NavbarComponent, IniciaSesion, Registrar, CambiarPass } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarritoComponent, CarritoPagarComponent, UserProfileComponent } from './components/carrito/carrito.component';
import { VistaCursoComponent,SafePipe  } from './components/vista-curso/vista-curso.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { AlumnosDestacadosComponent } from './components/alumnos-destacados/alumnos-destacados.component';
import { CursoAlumnoComponent, CursoUserShare, SafePipe2 } from './components/curso-alumno/curso-alumno.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ExamenComponent } from './components/examen/examen.component';
import { ExamenrComponent } from './components/examenR/examenR.component';
import { CursosComponent } from './components/cursos/cursos.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgendaComponent } from './components/agenda/agenda.component';
import { EventosService } from './services/eventos.service';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';

import { UsuarioService } from './services/usuario.service';
import { CursosService } from './services/cursos.service';
import { TemaService } from './services/tema.service';
import{MensajesService} from './services/mensajes.service';
import{InstructorService} from './services/instructor.service';
import {BannerService} from './services/banner.service';

import { ChatusersComponent } from './components/chatusers/chatusers.component';
import { CambiarPassComponent } from './components/cambiar-pass/cambiar-pass.component';


registerLocaleData(localeEs);
@NgModule({
  entryComponents: [
    IniciaSesion,
    Registrar,
    UserProfileComponent,
    CursoUserShare,
    CambiarPass

  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    IniciaSesion,
    Registrar,
    IndexComponent,
    FooterComponent,
    CarritoComponent,
    CarritoPagarComponent,
    VistaCursoComponent,
    MiPerfilComponent,
    SafePipe,
    SafePipe2,
    AlumnosDestacadosComponent,
    CursoAlumnoComponent,
    InstructorComponent,
    ExamenComponent,
    ExamenrComponent,
    CursosComponent,
    AgendaComponent,
    UserProfileComponent,
    CursoUserShare,
    CambiarPass,
 
    ChatusersComponent,
 
    CambiarPassComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DemoMaterialModule,
    routing,
    MatNativeDateModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SocialLoginModule
  ],
  exports: [
  CursoAlumnoComponent,
  AgendaComponent,

  ],
  providers: [
  appRoutingProviders,
  CookieService,
  AgendaComponent,
  EventosService,
  UsuarioService,
  CursosService,
  TemaService,
  InstructorService,
  MensajesService,
  BannerService,
  {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
  }
  ],
  bootstrap: [
  AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
