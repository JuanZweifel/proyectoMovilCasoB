import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ViajePageRoutingModule } from './viaje-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ViajePage } from './viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ViajePage]
})
export class ViajePageModule {}
