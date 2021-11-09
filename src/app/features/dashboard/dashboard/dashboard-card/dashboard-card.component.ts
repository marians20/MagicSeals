import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardCardModel } from './dashboard-card.model';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  @Input() cardModel: DashboardCardModel | undefined;
  constructor() { }

  ngOnInit(): void {
  }
}
