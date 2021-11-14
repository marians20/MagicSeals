import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  selectedLanguage: string;

  constructor(public readonly translate: TranslateService) {
    this.selectedLanguage = localStorage.getItem('selectedLanguace') || this.translate.currentLang;
    this.translate.use(this.selectedLanguage);
   }

  onLanguageChanged(value: string) {
    if(value === this.translate.currentLang) {
      return;
    }

    localStorage.setItem('selectedLanguace', value);
    this.translate.use(value);
  }
}
