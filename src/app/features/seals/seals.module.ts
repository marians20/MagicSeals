import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SealsRoutingModule } from './seals-routing.module';
import { MaterialModule } from '../../material.module';
import { SealComponent } from './components/seals/seal/seal.component';
import { SealsComponent } from './components/seals/seals.component';

@NgModule({
  declarations: [
    SealsComponent,
    SealComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SealsRoutingModule
  ]
})
export class SealsModule { }
