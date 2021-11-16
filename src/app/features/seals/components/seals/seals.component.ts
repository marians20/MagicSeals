import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Seal } from '../../models/seal.model';
import { SealsComponentFacade } from './seals-component.facade';

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
  private readyToChargeQuestion!: string;
  private questionTitle!: string;
  statement: string = ''
  seal: Seal = {}
  constructor(private readonly facade: SealsComponentFacade) {
      this.getTranslations();
      this._subscription.add(this.facade.onLangChange.subscribe(_ => {
        this.getTranslations();
      }));
     }

  ngOnInit(): void {
    this._subscription.add(this.facade.onStrategyChange.subscribe(strategy => {
      this.seal = this.facade.getSeal(this.statement);
      this.facade.drawSigil(this.seal.literalSeal!);
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onModelChangeHandler(event: any) {
    this.seal = this.facade.getSeal(event);
    this.facade.drawSigil(this.seal.literalSeal!);
  }

  handleChargeClick() {
    this._subscription.add(this.facade.openConfirmationDialog(this.readyToChargeQuestion, this.questionTitle)
      .subscribe((launch: boolean) => {
        if(!launch) {
          return;
        }

        this._subscription.add(this.facade.openChargeAndLaunchDialog(this.seal.literalSeal ?? '').subscribe((data: boolean) => {
          if(data) {
            this.statement = '';
            this.seal = this.facade.getSeal(this.statement);
            this.facade.drawSigil(this.seal.literalSeal??'');
            this.facade.showSuccessToaster(this.sigilLaunchedMessage, this.sigilLaunchedMessageTitle);
          } else {
            this.facade.showErrorToaster(this.sigilNotLaunchedMessage, this.sigilNotLaunchedMessageTitle);
          }
        }));
      }));
  }

  private getTranslations(): void {
    if(this.sigilLaunchedMessage) {
      return;
    }

    const subscr = this.facade.getTranslations("SIGILS").subscribe(data => {
      this.sigilLaunchedMessage = data.SIGIL_LAUNCHED_CONFIRMATION_MESSAGE;
      this.sigilLaunchedMessageTitle = data.SIGIL_LAUNCHED_CONFIRMATION_MESSAGE_TITLE;
      this.sigilNotLaunchedMessage = data.SIGIL_NOT_LAUNCHED_MESSAGE;
      this.sigilNotLaunchedMessageTitle = data.SIGIL_NOT_LAUNCHED_MESSAGE_TITLE;
      this.readyToChargeQuestion = data.READY_TO_CHARGE_QUESTION;
      this.questionTitle = data.QUESTION;
    });

    this._subscription.add(subscr);
  }
}
