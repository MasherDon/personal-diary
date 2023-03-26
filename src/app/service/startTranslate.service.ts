import { Injectable } from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
 })

export class StartTranslateService {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {}

  mainItems!: MenuItem[];
  translationArray!: string[];
  arrayForTranslation: string[] = [
    "mainMenu.Diary",
    "mainMenu.Recording",
    "mainMenu.Add",
    "mainMenu.Search",
    //"sidebar.SignIn",
    //"sidebar.Registration"
  ];

  async setTranslate(lang: string) {
    this.translationArray = [];
    await this.translateService.use(lang).subscribe(() => {
      for (let n = 0; n < this.arrayForTranslation.length; n++) {
        this.translationArray.push(this.translateService.instant(this.arrayForTranslation[n]))
      }
      this.setString();
    })
  }

  getMenuTranslate() {
    return this.mainItems;
  }

  setString() {
    this.mainItems = [
      {
        label: this.translationArray[0],
        icon:'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: this.translationArray[1],
        icon:'pi pi-fw pi-pencil',
        items:[
          {
            label: this.translationArray[2],
            icon:'pi pi-plus',
            routerLink: ['/add'],
          },
          {
            label: this.translationArray[3],
            icon: 'pi pi-search',
            routerLink: ['/search'],
          },
        ]
      }
    ];
  }

  translatePrime() {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  startTranslate() {
    this.translateService.addLangs(['en', 'ru']);
    const browserLang = this.translateService.getBrowserLang()||'';
    const lang = browserLang.match(/en/)? browserLang : 'ru';
    this.setTranslate(lang).then();
    this.translatePrime();
  }
}
