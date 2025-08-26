import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Gym LaRoca | Inicio'
  },
//   {
//     path: 'productos',
//     loadComponent: () => import('./public/products/products.component').then(m => m.ProductsComponent),
//     title: 'Productos'
//   },
  // Módulos privados (protegidos)
  {
    path: 'asistencias',
    // canActivate: [authGuard],
    loadComponent: () => import('./asistencias/asistencias.component').then(m => m.AsistenciasComponent),
    title: 'Registro de Asistencias'
  },
  {
    path: 'clientes',
    // canActivate: [authGuard],
    loadComponent: () => import('./clientes/clientes.component').then(m => m.ClientesComponent),
    title: 'Clientes'
  },
  {
    path: 'rutinas',
    // canActivate: [authGuard],
    loadComponent: () => import('./rutinas/rutinas.component').then(m => m.RutinasComponent),
    title: 'Rutinas'
  },
  {
    path: 'pagos',
    // canActivate: [authGuard],
    loadComponent: () => import('./pagos/pagos.component').then(m => m.PagosComponent),
    title: 'Pagos'
  },
  { path: '**', redirectTo: '' }
];
