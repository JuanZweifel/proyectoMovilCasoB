import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'ofrecer-viaje',
        loadChildren: () => import('../pages/ofrecer-viaje/ofrecer-viaje.module').then( m => m.OfrecerViajePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
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
