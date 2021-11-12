import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SealsRoutingModule } from './seals-routing.module';
import { MaterialModule } from '../../material.module';
import { SealComponent } from './components/seals/seal/seal.component';
import { SealsComponent } from './components/seals/seals.component';
import { StrategySelectorComponent } from './components/strategy-selector/strategy-selector.component';
import { GraphicalSealComponent } from './components/graphical-seal/graphical-seal.component';

@NgModule({
  declarations: [
    SealsComponent,
    SealComponent,
    StrategySelectorComponent,
    GraphicalSealComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SealsRoutingModule
  ],
  exports: [
    StrategySelectorComponent
  ]
})
export class SealsModule { }
