import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SealsModule } from '../features/seals/seals.module';
import { HttpLoaderFactory } from '../app.module';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { DarkModeSelectorComponent } from './components/dark-mode-selector/dark-mode-selector.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SidebarComponent,
    LanguageSelectorComponent,
    DarkModeSelectorComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
        TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LayoutRoutingModule,
    SealsModule
  ],
  exports: [
    LayoutComponent,
    PageNotFoundComponent
  ]
})
export class LayoutModule { }
