import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SealsComponent } from './seals/seals.component';

const routes: Routes = [
  {
    path: '',
    component: SealsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SealsRoutingModule { }
