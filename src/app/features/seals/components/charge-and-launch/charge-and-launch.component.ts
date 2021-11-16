import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ChargeAndLaunchService } from '../../services/charge-and-launch.service';
import { GraphicalSealService } from '../../services/graphical-seal.service';

@Component({
  selector: 'app-charge-and-launch',
  templateUrl: './charge-and-launch.component.html',
  styleUrls: ['./charge-and-launch.component.scss']
})
export class ChargeAndLaunchComponent implements OnInit, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();
  image: string = '';

  constructor(
    private readonly chargeAndLaunchService: ChargeAndLaunchService,
    private readonly graphicalSealService: GraphicalSealService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this._subscription.add(this.graphicalSealService.onImageGot.subscribe(img => {
        this.image = img;
      }));
    }

  ngOnInit(): void {
    this.graphicalSealService.getImage();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  handleCloseDialog(value: boolean) {
    this.chargeAndLaunchService.closeDialog(value);
  }
}
