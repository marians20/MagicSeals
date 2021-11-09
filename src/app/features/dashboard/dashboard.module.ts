import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCardComponent } from './dashboard/dashboard-card/dashboard-card.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
