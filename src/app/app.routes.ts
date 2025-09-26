import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login-dialog/login-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PagosComponent } from './pagos/pagos.component';
import { TiendaComponent } from './tienda/tienda.component';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'asistencias', component: AsistenciasComponent, canActivate: [AuthGuard] },
  { path: 'rutinas', component: RutinasComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'pagos', component: PagosComponent, canActivate: [AuthGuard] },
  { path: 'tienda', component: TiendaComponent },
  { path: '**', redirectTo: '' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
