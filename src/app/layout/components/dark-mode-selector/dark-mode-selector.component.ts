import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-dark-mode-selector',
  templateUrl: './dark-mode-selector.component.html',
  styleUrls: ['./dark-mode-selector.component.scss']
})
export class DarkModeSelectorComponent implements OnInit, OnDestroy {
  darkMode: boolean;
  private _subscription = new Subscription();
  
  constructor(private readonly layoutService: LayoutService) {
        this.darkMode = layoutService.darkModeEnabled;
      this._subscription.add(this.layoutService.onDarkModeToggle.subscribe(darkMode => {
        this.darkMode = darkMode;
      }));
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  setDarkMode(enabled: boolean): void {
    this.layoutService.darkModeEnabled = enabled;
  }

}
