import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private dialogRef: MatDialogRef<ConfirmationDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog) { }

  openDialog(message: string, title?: string) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        title,
        message
      },
    });

    return this.dialogRef.afterClosed();
  }

  closeDialog(dialogResult: any) {
    this.dialogRef?.close(dialogResult);
  }
}
