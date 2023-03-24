import { Injectable } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class PageTranslateService {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {
  }

  translatePrime() {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  getLang() {
    return this.translateService.getDefaultLang();
  }

  startTranslate() {
    this.translateService.addLangs(['en', 'ru']);
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) {
      const lang = browserLang.match(/en/)? browserLang : 'ru';
      this.translateService.setDefaultLang(lang);
    } else {
      this.translateService.setDefaultLang('ru');
    }
  }
}
