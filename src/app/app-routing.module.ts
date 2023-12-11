import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConexionGuard } from './guards/conexion.guard';
import { LoginGuard } from './guards/login.guard'; // Importa el guard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),canActivate:[LoginGuard]
  },
  {
    path: 'prueba',
    loadChildren: () => import('./pages/prueba/prueba.module').then( m => m.PruebaPageModule),canActivate:[LoginGuard]
  },
  {
    path: 'viaje',
    loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule),canActivate:[LoginGuard]
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
    loadChildren: () => import('./pages/recorrido/recorrido.module').then( m => m.RecorridoPageModule),canActivate:[LoginGuard]
  },
  {
    path: 'conductor-viaje',
    loadChildren: () => import('./pages/conductor-viaje/conductor-viaje.module').then( m => m.ConductorViajePageModule),canActivate:[LoginGuard]
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./pages/sesion/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'modauto',
    loadChildren: () => import('./pages/modauto/modauto.module').then( m => m.ModautoPageModule),canActivate:[LoginGuard, ConexionGuard]
  },
  {
    path: 'ultimo-viaje-pedido',
    loadChildren: () => import('./pages/ultimo-viaje-pedido/ultimo-viaje-pedido.module').then( m => m.UltimoViajePedidoPageModule)
  },
  {
    path: 'ultimo-viaje-ofrecido',
    loadChildren: () => import('./pages/ultimo-viaje-ofrecido/ultimo-viaje-ofrecido.module').then( m => m.UltimoViajeOfrecidoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
