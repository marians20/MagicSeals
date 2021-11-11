import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SealsModule } from '../features/seals/seals.module';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule,
    SealsModule
  ],
  exports: [
    LayoutComponent,
    PageNotFoundComponent
  ]
})
export class LayoutModule { }
