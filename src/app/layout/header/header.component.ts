import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  darkMode: boolean;
  constructor(
    private readonly layoutService: LayoutService,
    private readonly router: Router) {
      this.darkMode = layoutService.darkModeEnabled;
      this._subscription.add(this.layoutService.onDarkModeToggle.subscribe(darkMode => {
        this.darkMode = darkMode;
      }))
     }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  menuButtonClickHandle(): void {
    this.layoutService.sidebarToggle();
  }

  homeButtonClickHandle(): void {
    this.router.navigate(['/dashboard']);
  }

  setDarkMode(enabled: boolean): void {
    this.layoutService.darkModeEnabled = enabled;
  }

}
