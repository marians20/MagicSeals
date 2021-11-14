import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  today: Date = new Date();

  constructor(
    private readonly layoutService: LayoutService,
    private readonly router: Router) {
     }

  ngOnInit(): void {
  }

  menuButtonClickHandle(): void {
    this.layoutService.sidebarToggle();
  }

  homeButtonClickHandle(): void {
    this.router.navigate(['/dashboard']);
  }

}
