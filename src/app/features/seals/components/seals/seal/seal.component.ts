import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Seal } from '../../../models/seal.model';
import { LayoutService } from '../../../../../layout/services/layout.service';
import { GraphicalSealService } from '../../../services/graphical-seal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seal',
  templateUrl: './seal.component.html',
  styleUrls: ['./seal.component.scss']
})
export class SealComponent implements OnInit {
  @Input() seal: Seal = {
    literalSeal: ''
  };
  @Input() showStatement!: boolean;
  private readonly _subscription: Subscription = new Subscription()
  sealColor: string;
  sealBackgroundColor: string;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly graphicalSealService: GraphicalSealService) {
    this.sealColor = this.layoutService.darkModeEnabled ? 'white': 'black';
    this.sealBackgroundColor = this.layoutService.darkModeEnabled ? 'black': 'white';
   }

  ngOnInit(): void {
    this._subscription.add(this.layoutService.onDarkModeToggle.subscribe(isDarkMode => {
      this.sealColor = isDarkMode ? 'white': 'black';
      this.sealBackgroundColor = isDarkMode ? 'black': 'white';
      setTimeout(() => this.graphicalSealService.drawSigil(this.seal.literalSeal!), 0);
    }));
  }
}
