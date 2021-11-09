import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SealsRoutingModule } from './seals-routing.module';
import { SealsComponent } from './seals/seals.component';
import { MaterialModule } from '../../material.module';
import { SealComponent } from './seals/seal/seal.component';


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
