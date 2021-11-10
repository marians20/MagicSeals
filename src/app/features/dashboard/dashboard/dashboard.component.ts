import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardCardModel } from './dashboard-card/dashboard-card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards: DashboardCardModel[] = [
    {
      title: 'Seal',
      subtitle: 'Create a Magic Seal',
      pictureUrl: '/assets/pictures/seal.jpg',
      navigationRoute: '/seals'
    }
  ];

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onCardClickHandler(card: DashboardCardModel): void {
    this.router.navigate([card.navigationRoute]);
  }
}
