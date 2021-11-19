import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Seal } from '../../../models/seal.model';
import { LayoutService } from '../../../../../layout/services/layout.service';
import { GraphicalSigilService } from '../../../services/graphical-seal.service';
import { Subscription } from 'rxjs';
import { SealOptions } from '../../../models/seal.options';

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

  options: SealOptions;
  private readonly _subscription: Subscription = new Subscription();

  constructor(
    private readonly layoutService: LayoutService,
    private readonly graphicalSealService: GraphicalSigilService) {
    this.options = {
      backgroundColor: this.layoutService.darkModeEnabled ? 'black': 'white',
      sigilColor: this.layoutService.darkModeEnabled ? 'white': 'black',
      circleColor: 'purple',
      mapColor: 'brown',
      shouldDrawMap: true
    };
   }

  ngOnInit(): void {
    this._subscription.add(this.layoutService.onDarkModeToggle.subscribe(isDarkMode => {
      this.options.sigilColor = isDarkMode ? 'white': 'black';
      this.options.backgroundColor = isDarkMode ? 'black': 'white';
      setTimeout(() => this.graphicalSealService.requestDrawSigil(this.seal.literalSeal!), 0);
    }));
  }
}
