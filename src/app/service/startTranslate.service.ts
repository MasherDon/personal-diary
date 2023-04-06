import { Injectable } from '@angular/core';
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import { Language } from "../interface/language";
import { Color } from "../interface/color";
import { EditData } from "../interface/editData";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: 'root'
 })

export class StartTranslateService {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService, private toastService: ToastService) {}

  mainItems!: MenuItem[];
  translationArray!: string[];
  arrayForTranslation: string[] = [
    "mainMenu.diary",
    "mainMenu.recording",
    "mainMenu.add",
    "mainMenu.search",
    "massage.error",
    "massage.notAllowed",
    "massage.regError",
    "massage.success",
    "massage.sucReg",
    "massage.sigInSuccess",
    "massage.sigIngError",
    "massage.massEmail",
    "massage.notRestore",
    "massage.deleteProfile",
    "color.blue",
    "color.green",
    "color.orange",
    "color.purple",
    "form.nickname",
    "form.photoURL",
    "form.language",
    "form.password",
    "form.email",
    "form.delete",
  ];

  massLanguages: Language[] = [
    { lang: 'Русский', code: 'ru' },
    { lang: 'English', code: 'en' },
  ];

  filterLang: RegExp = /ru|en/;

  languages: string[] = ['ru', 'en'];

  colorArray!: Color[];

  labelArray!: EditData[];

  getLanguage() {
    return localStorage.getItem('lang')||'ru';
  }

  getMassLanguages() {
    return this.massLanguages;
  }

  async setTranslate(lang: string) {
    this.translationArray = [];
    localStorage.removeItem('lang');
    localStorage.setItem('lang', lang);
    await this.translateService.use(lang).subscribe(() => {
      for (let n = 0; n < this.arrayForTranslation.length; n++) {
        this.translationArray.push(this.translateService.instant(this.arrayForTranslation[n]))
      }
      this.setStringMenu();
      this.setStringColor();
      this.setStringLabel();
      this.toastService.generateTranslate(this.translationArray.slice(4, 13));
    });
    this.translatePrime();
  }

  confirmDialogTranslate() {
    return this.translationArray[13];
  }

  getMenuTranslate() {
    return this.mainItems;
  }

  getColorThem() {
    return this.colorArray;
  }

  getLabel() {
    return this.labelArray;
  }

  getMassDelete() {
    return this.translationArray[23];
  }

  setStringMenu() {
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

  setStringLabel() {
    this.labelArray = [
      { label: this.translationArray[18], code: 1 },
      { label: this.translationArray[19], code: 2 },
      { label: this.translationArray[20], code: 3 },
      { label: this.translationArray[21], code: 4 },
      { label: this.translationArray[22], code: 5 },
      { label: this.translationArray[23], code: 6 },
    ]
  }

  setStringColor() {
    this.colorArray  = [
      { color: this.translationArray[14], code: 'blue' },
      { color: this.translationArray[14], code: 'green' },
      { color: this.translationArray[16], code: 'orange' },
      { color: this.translationArray[17], code: 'purple' },
    ];
  }

  translatePrime() {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  startTranslate() {
    this.translateService.addLangs(this.languages);
    let lang = this.getLanguage();
    if (!lang) {
      const browserLang = this.translateService.getBrowserLang() || '';
      lang = browserLang.match(this.filterLang) ? browserLang : 'ru';
    }
    this.setTranslate(lang).then();
  }
}
