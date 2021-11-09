import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
