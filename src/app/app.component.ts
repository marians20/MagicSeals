import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from './layout/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  title = 'MagicSeals';
  usesDarkMode: boolean;

  constructor(private readonly layoutService: LayoutService){
    this.usesDarkMode = layoutService.darkModeEnabled;
  }

  ngOnInit(): void {
    this._subscription.add(this.layoutService.onDarkModeToggle.subscribe(enabled => {
      this.usesDarkMode = enabled;
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}