import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimoViajeOfrecidoPageRoutingModule } from './ultimo-viaje-ofrecido-routing.module';

import { UltimoViajeOfrecidoPage } from './ultimo-viaje-ofrecido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimoViajeOfrecidoPageRoutingModule
  ],
  declarations: [UltimoViajeOfrecidoPage]
})
export class UltimoViajeOfrecidoPageModule {}
