import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorViajePage } from './conductor-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ConductorViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorViajePageRoutingModule {}
