import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimoViajePedidoPage } from './ultimo-viaje-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: UltimoViajePedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimoViajePedidoPageRoutingModule {}
