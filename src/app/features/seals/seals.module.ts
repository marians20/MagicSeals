import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SealsRoutingModule } from './seals-routing.module';
import { MaterialModule } from '../../material.module';
import { SealComponent } from './components/seals/seal/seal.component';
import { SealsComponent } from './components/seals/seals.component';
import { StrategySelectorComponent } from './components/strategy-selector/strategy-selector.component';
import { GraphicalSealComponent } from './components/graphical-seal/graphical-seal.component';
import { ChargeAndLaunchComponent } from './components/charge-and-launch/charge-and-launch.component';

@NgModule({
  declarations: [
    SealsComponent,
    SealComponent,
    StrategySelectorComponent,
    GraphicalSealComponent,
    ChargeAndLaunchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    SealsRoutingModule
  ],
  exports: [
    StrategySelectorComponent
  ]
})
export class SealsModule { }
