import { Component } from '@angular/core';
import {Language} from "../interface/language";
import {StartTranslateService} from "../service/startTranslate.service";
import {ThemeService} from "../service/theme.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent {
  constructor(private translateService: StartTranslateService, private themeService: ThemeService) {}

  lang!: Language;
  darkTheme!: boolean;

  langArray: Language[] = [
    { lang: 'Русский', code: 'ru' },
    { lang: 'English', code: 'en' },
  ];

  setLanguage(lang: Language) {
    this.translateService.setTranslate(lang.code).then();
  }

  changesThem() {
    this.themeService.setTheme(this.darkTheme);
  }

  ngOnInit() {
    this.darkTheme = this.themeService.getTheme();
    const language = this.translateService.getLanguage();
    this.langArray.map((langItem) =>
    { if (langItem.code === language) this.lang = langItem; });
  }
}
