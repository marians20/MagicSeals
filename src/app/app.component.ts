import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private readonly layoutService: LayoutService,
    private readonly translate: TranslateService) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('ro');
    const browserLang: string = translate.getBrowserLang() ?? 'en';
    translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');
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
