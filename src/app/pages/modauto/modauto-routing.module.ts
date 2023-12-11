import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModautoPage } from './modauto.page';

const routes: Routes = [
  {
    path: '',
    component: ModautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModautoPageRoutingModule {}
