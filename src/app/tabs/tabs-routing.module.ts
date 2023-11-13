import { ViajeOfrecidoGuard } from './../guards/viaje-ofrecido.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ConexionGuard } from '../guards/conexion.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'ofrecer-viaje',
        loadChildren: () => import('../pages/ofrecer-viaje/ofrecer-viaje.module').then( m => m.OfrecerViajePageModule),
        canActivate:[ConexionGuard, ViajeOfrecidoGuard]
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule),
        canActivate:[ConexionGuard, ViajeOfrecidoGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
