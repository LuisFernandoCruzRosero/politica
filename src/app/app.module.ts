/* Servicios */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/* Componentes */
import { AppComponent } from './app.component';

/* Clases */
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { PerfilCandidatoComponent } from './perfil-candidato/perfil-candidato.component';
import { PerfilCoordinadorComponent } from './perfil-coordinador/perfil-coordinador.component';
import { DigitadorComponent } from './digitador/digitador.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { LiderComponent } from './lider/lider.component';
import { VotanteComponent } from './votante/votante.component';
import { BarrioComponent } from './barrio/barrio.component';
import { LugarComponent } from './lugar/lugar.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { HistorialComponent } from './historial/historial.component';
import { ComunaComponent } from './comuna/comuna.component';
import { MesaComponent } from './mesa/mesa.component';
import { LugarMesaComponent } from './lugar-mesa/lugar-mesa.component';
import { RegistraduriaComponent } from './registraduria/registraduria.component';
import { ErrorComponent } from './error/error.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilAdministradorComponent,
    PerfilCandidatoComponent,
    PerfilCoordinadorComponent,
    DigitadorComponent,
    CoordinadorComponent,
    LiderComponent,
    VotanteComponent,
    BarrioComponent,
    LugarComponent,
    AgendaComponent,
    ContabilidadComponent,
    HistorialComponent,
    ComunaComponent,
    MesaComponent,
    LugarMesaComponent,
    RegistraduriaComponent,
    ErrorComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
