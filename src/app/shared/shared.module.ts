import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from '../material.module';
import { DialogDraggableTitleDirective } from './directives/dialog-draggable-title.directive';

@NgModule({
  declarations: [
    DialogDraggableTitleDirective,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    DialogDraggableTitleDirective
  ]
})
export class SharedModule { }
