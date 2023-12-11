import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModautoPageRoutingModule } from './modauto-routing.module';

import { ModautoPage } from './modauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModautoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModautoPage]
})
export class ModautoPageModule {}
