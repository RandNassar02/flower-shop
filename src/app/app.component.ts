import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from './i18n/translate.pipe';
import { I18nService } from './i18n/i18n.service';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flower-shop';
  constructor(private i18nService: I18nService, private titleService: Title) {}

  ngOnInit() {
    this.i18nService.loadTranslations('en');
    // const translatedTitle = this.i18nService.t('app.title');
    // this.titleService.setTitle(translatedTitle);
  }
}
