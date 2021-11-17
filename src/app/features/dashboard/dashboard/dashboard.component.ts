import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { DashboardCardModel } from './dashboard-card/dashboard-card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _subscriptions: Subscription = new Subscription();
  cards: DashboardCardModel[] = [];

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router) {
      this.getTranslations();
      this._subscriptions.add(this.translate.onLangChange.subscribe(_ => {
        this.getTranslations();
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onCardClickHandler(card: DashboardCardModel): void {
    this.router.navigate([card.navigationRoute]);
  }

  private getTranslations() {
    this._subscriptions.add(this.translate.get("DASHBOARD").subscribe(data => {
      this.cards = this.cards.filter(c => c.navigationRoute !== '/seals')
      this.cards.push({
        title: data.SIGIL,
        subtitle: data.CREATE_SIGIL,
        pictureUrl: '~/assets/pictures/seal.png',
        navigationRoute: '/seals'
      });
    }));
  }
}
