import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConexionGuard } from './guards/conexion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
  },
  {
    path: 'prueba',
    loadChildren: () => import('./pages/prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/sesion/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/sesion/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'recorrido',
    loadChildren: () => import('./pages/recorrido/recorrido.module').then( m => m.RecorridoPageModule)
  },
  {
    path: 'crear-viaje',
    loadChildren: () => import('./pages/crear-viaje/crear-viaje.module').then( m => m.CrearViajePageModule)
  },
  {
    path: 'conductor-viaje',
    loadChildren: () => import('./pages/conductor-viaje/conductor-viaje.module').then( m => m.ConductorViajePageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./pages/sesion/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
