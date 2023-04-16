import {Component, Input} from '@angular/core';
import {Language} from "../interface/language";
import {StartTranslateService} from "../service/startTranslate.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-dropdown-lang',
  templateUrl: './dropdown-lang.component.html',
  styleUrls: ['./dropdown-lang.component.css']
})

export class DropdownLangComponent {
  constructor(public translateService: StartTranslateService, public authService: AuthService) {}

  @Input() language!: string;

  lang!: Language;
  langArray!: Language[];

  setLanguage(lang: Language) {
    this.translateService.setTranslate(lang.code).then();
    if (this.authService.getSigIn()) this.authService.updateLangBD(lang.code).then();
  }

  ngOnInit() {
    this.langArray = this.translateService.getMassLanguages();
    this.langArray.map((langItem) =>
    { if (langItem.code === this.language) this.lang = langItem; });
  }

  ngOnChanges() {
    this.langArray = this.translateService.getMassLanguages();
    this.langArray.map((langItem) =>
    { if (langItem.code === this.language) this.lang = langItem; });
  }
}
