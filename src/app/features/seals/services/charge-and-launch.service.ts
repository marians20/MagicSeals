import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChargeAndLaunchComponent } from '../components/charge-and-launch/charge-and-launch.component';

@Injectable({
  providedIn: 'root'
})
export class ChargeAndLaunchService {
  private dialogRef: MatDialogRef<ChargeAndLaunchComponent> | undefined;

  constructor(private readonly dialog: MatDialog) { }

  openDialog(title: string) {
    this.dialogRef = this.dialog.open(ChargeAndLaunchComponent, {
      width: '600px',
      data: {
        title,
      },
    });

    return this.dialogRef.afterClosed();
  }

  closeDialog(dialogResult: any) {
    this.dialogRef?.close(dialogResult);
  }
}
