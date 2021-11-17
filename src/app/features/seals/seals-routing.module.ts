import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SealsComponent } from './components/seals/seals.component';
import { AuthGuardService } from '../../shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SealsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SealsRoutingModule { }
