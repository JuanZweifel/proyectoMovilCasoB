import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorViajePageRoutingModule } from './conductor-viaje-routing.module';

import { ConductorViajePage } from './conductor-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorViajePageRoutingModule
  ],
  declarations: [ConductorViajePage]
})
export class ConductorViajePageModule {}
