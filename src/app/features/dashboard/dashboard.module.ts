import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCardComponent } from './dashboard/dashboard-card/dashboard-card.component';
import { MaterialModule } from '../../material.module';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
