import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Seal } from '../../models/seal.model';
import { SealsService } from '../../services/seals.service';
import { StrategySelectorService } from '../../services/strategy-selector.service';
import { GraphicalSealService } from '../../services/graphical-seal.service';

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
    private readonly strategyService: StrategySelectorService,
    private readonly graphicalSealService: GraphicalSealService) { }

  ngOnInit(): void {
    this._subscription.add(this.strategyService.onStrategyChange.subscribe(strategy => {
      this.seal = this.sealsService.getSeal(this.statement, strategy);
      this.graphicalSealService.drawSigil(this.seal.literalSeal!);
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onModelChangeHandler(event: any) {
    this.seal = this.sealsService.getSeal(event, this.strategyService.strategy);
    this.graphicalSealService.drawSigil(this.seal.literalSeal!);
  }

}
