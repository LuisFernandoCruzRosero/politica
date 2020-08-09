/* Servicios */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* Componentes */
import { LoginComponent } from './login/login.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { PerfilCandidatoComponent } from './perfil-candidato/perfil-candidato.component';
import { PerfilCoordinadorComponent } from './perfil-coordinador/perfil-coordinador.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { AgendaComponent } from './agenda/agenda.component';
import { BarrioComponent } from './barrio/barrio.component';
import { ComunaComponent } from './comuna/comuna.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { DigitadorComponent } from './digitador/digitador.component';
import { HistorialComponent } from './historial/historial.component';
import { LiderComponent } from './lider/lider.component';
import { LugarComponent } from './lugar/lugar.component';
import { LugarMesaComponent } from './lugar-mesa/lugar-mesa.component';
import { MesaComponent } from './mesa/mesa.component';
import { RegistraduriaComponent } from './registraduria/registraduria.component';
import { VotanteComponent } from './votante/votante.component';
import { ErrorComponent } from './error/error.component';
import { SalirComponent } from './salir/salir.component';
import { GeolocalizacionComponent } from './geolocalizacion/geolocalizacion.component';

/* inicializa rutas */
const routes: Routes = [
  { path : '', component: LoginComponent },
  { path : 'perfilAdministrador', component: PerfilAdministradorComponent },
  { path : 'perfilCandidato', component: PerfilCandidatoComponent },
  { path : 'perfilCoordinador', component: PerfilCoordinadorComponent },
  { path : 'recuperarPassword', component: RecuperarPasswordComponent },
  { path : 'agenda', component: AgendaComponent },
  { path : 'barrio', component: BarrioComponent },
  { path : 'comuna', component: ComunaComponent },
  { path : 'contabilidad', component: ContabilidadComponent },
  { path : 'coordinador', component: CoordinadorComponent },
  { path : 'digitador', component: DigitadorComponent },
  { path : 'historial', component: HistorialComponent },
  { path : 'lider', component: LiderComponent },
  { path : 'lugar', component: LugarComponent },
  { path : 'lugarMesa', component: LugarMesaComponent },
  { path : 'mesa', component: MesaComponent },
  { path : 'registraduria', component: RegistraduriaComponent },
  { path : 'votante', component: VotanteComponent },
  { path : 'geolocalizacion', component: GeolocalizacionComponent },
  { path : 'salir', component: SalirComponent },
  { path : '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
