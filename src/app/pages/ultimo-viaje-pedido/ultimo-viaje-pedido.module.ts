import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimoViajePedidoPageRoutingModule } from './ultimo-viaje-pedido-routing.module';

import { UltimoViajePedidoPage } from './ultimo-viaje-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimoViajePedidoPageRoutingModule
  ],
  declarations: [UltimoViajePedidoPage]
})
export class UltimoViajePedidoPageModule {}
