import { Injectable } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class StartTranslateService {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {
  }

  translatePrime() {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  start() {
    this.translateService.addLangs(['en', 'ru']);
    this.translateService.setDefaultLang('ru');
    let browserLang = this.translateService.getBrowserLang();
    if (browserLang) {
      const lang = browserLang.match(/en/)? browserLang : 'ru';
      if (lang !== 'ru') this.translateService.use(lang);
    }
  }
}
