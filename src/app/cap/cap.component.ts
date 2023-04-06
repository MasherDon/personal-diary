import {Component, Input} from '@angular/core';
import { SidebarIs } from "../interface/sidebarIs";
import { StartTranslateService } from "../service/startTranslate.service";
import { AuthService } from "../service/auth.service";
import { ThemeService } from "../service/theme.service";
import { Language } from "../interface/language";

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})

export class CapComponent {
  constructor(public startTranslateService: StartTranslateService, public authService: AuthService, public themeService: ThemeService) {}

  @Input() language!: string;

  onSidebar: SidebarIs = {
    onWin: false,
    sigOrReg: 0
  }

  lang!: Language;
  darkTheme!: boolean;
  langArray!: Language[];

  setLanguage(lang: Language) {
    this.startTranslateService.setTranslate(lang.code).then();
    if (this.authService.getSigIn()) this.authService.updateLangBD(lang.code).then();
  }

  changesThem() {
    this.themeService.setTheme(this.darkTheme);
  }

  ngOnInit() {
    this.langArray = this.startTranslateService.getMassLanguages();
    this.darkTheme = this.themeService.getThemeBool();
  }

  ngOnChanges() {
    this.langArray.map((langItem) =>
    { if (langItem.code === this.language) this.lang = langItem; });
  }

  changeSigOrReg(sigOrReg: number) {
    this.onSidebar.onWin = true;
    this.onSidebar.sigOrReg = sigOrReg;
  }
}
