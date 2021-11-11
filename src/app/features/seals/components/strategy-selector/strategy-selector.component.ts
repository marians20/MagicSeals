import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SealStrategy } from '../../models/seal-strategy.enum';
import { StrategySelectorService } from '../../services/strategy-selector.service';

@Component({
  selector: 'app-strategy-selector',
  templateUrl: './strategy-selector.component.html',
  styleUrls: ['./strategy-selector.component.scss']
})
export class StrategySelectorComponent implements OnInit, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();
  SealStrategy = SealStrategy;
  strategy: SealStrategy;

  constructor(private readonly strategySelectorService: StrategySelectorService) {
    this.strategy = strategySelectorService.strategy;
   }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  strategyChangedHandler(value: SealStrategy) {
    this.strategySelectorService.strategy = value;
  }
}
