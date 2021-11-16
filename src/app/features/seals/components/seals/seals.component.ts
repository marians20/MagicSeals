import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Seal } from '../../models/seal.model';
import { SealsService } from '../../services/seals.service';
import { StrategySelectorService } from '../../services/strategy-selector.service';
import { GraphicalSealService } from '../../services/graphical-seal.service';
import { ChargeAndLaunchService } from '../../services/charge-and-launch.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';


@Component({
  selector: 'app-seals',
  templateUrl: './seals.component.html',
  styleUrls: ['./seals.component.scss']
})
export class SealsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  private sigilLaunchedMessage!: string;
  private sigilNotLaunchedMessageTitle!: string;
  private sigilNotLaunchedMessage!: string;
  private sigilLaunchedMessageTitle!: string;
  statement: string = ''
  seal: Seal = {}
  constructor(
    private readonly sealsService: SealsService,
    private readonly strategyService: StrategySelectorService,
    private readonly graphicalSealService: GraphicalSealService,
    private readonly chargeAndLaunchService: ChargeAndLaunchService,
    private toastr: ToasterService,
    private readonly translate: TranslateService) {
      this.getTranslations();
      this._subscription.add(this.translate.onLangChange.subscribe(_ => {
        this.getTranslations();
      }));
     }

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

  handleChargeClick() {
    this._subscription.add(this.chargeAndLaunchService
      .openDialog().subscribe((data: boolean) => {
      if(data) {
        this.statement = '';
        this.seal = this.sealsService.getSeal(this.statement, this.strategyService.strategy);
        this.graphicalSealService.drawSigil(this.seal.literalSeal??'');
        this.toastr.showSuccess(this.sigilLaunchedMessage, this.sigilLaunchedMessageTitle);
      } else {
        this.toastr.showError(this.sigilNotLaunchedMessage, this.sigilNotLaunchedMessageTitle);
      }
    }));
  }

  private getTranslations(): void {
    this._subscription.add(this.translate.get("SIGILS").subscribe(data => {
      this.sigilLaunchedMessage = data.SIGIL_LAUNCHED_CONFIRMATION_MESSAGE;
      this.sigilLaunchedMessageTitle = data.SIGIL_LAUNCHED_CONFIRMATION_MESSAGE_TITLE;
      this.sigilNotLaunchedMessage = data.SIGIL_NOT_LAUNCHED_MESSAGE;
      this.sigilNotLaunchedMessageTitle = data.SIGIL_NOT_LAUNCHED_MESSAGE_TITLE;
    }));
  }
}
