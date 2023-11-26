import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorViajePageRoutingModule } from './conductor-viaje-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConductorViajePage } from './conductor-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorViajePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ConductorViajePage]
})
export class ConductorViajePageModule {}
