import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimoViajeOfrecidoPage } from './ultimo-viaje-ofrecido.page';

const routes: Routes = [
  {
    path: '',
    component: UltimoViajeOfrecidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimoViajeOfrecidoPageRoutingModule {}
