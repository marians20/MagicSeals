import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SealStrategy } from '../../models/seal-strategy.enum';
import { Seal } from '../../models/seal.model';
import { SealsService } from '../../services/seals.service';
import { StrategySelectorService } from '../../services/strategy-selector.service';

@Component({
  selector: 'app-seals',
  templateUrl: './seals.component.html',
  styleUrls: ['./seals.component.scss']
})
export class SealsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription()
  statement: string = ''
  seal: Seal = {}
  constructor(
    private readonly sealsService: SealsService,
    private readonly strategyService: StrategySelectorService) { }

  ngOnInit(): void {
    this._subscription.add(this.strategyService.onStrategyChange.subscribe(strategy => {
      this.seal = this.sealsService.getSeal(this.statement, strategy);
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onModelChangeHandler(event: any) {
    this.seal = this.sealsService.getSeal(event, this.strategyService.strategy);
  }

}
