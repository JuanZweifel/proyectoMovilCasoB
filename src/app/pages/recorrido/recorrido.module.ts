import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecorridoPageRoutingModule } from './recorrido-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RecorridoPage } from './recorrido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecorridoPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RecorridoPage]
})
export class RecorridoPageModule {}
