import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfrecerViajePageRoutingModule } from './ofrecer-viaje-routing.module';

import { OfrecerViajePage } from './ofrecer-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfrecerViajePageRoutingModule
  ],
  declarations: [OfrecerViajePage]
})
export class OfrecerViajePageModule {}
