import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  language: 'en' | 'ar' = 'en';

  constructor(private i18nService: I18nService) {}

  switchLanguageEnglish() {
    this.language = 'en';
    this.i18nService.loadTranslations(this.language);
    console.log(this.language);
  }

  switchLanguageArabic() {
    this.language = 'ar';
    this.i18nService.loadTranslations(this.language);
    console.log(this.language);
  }

  // onChangeLanguage() {
  //   this.language = this.language === 'en' ? 'ar' : 'en';
  //   this.i18nService.loadTranslations(this.language);
  //   console.log(this.language);
  // }
}
