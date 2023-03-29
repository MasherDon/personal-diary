import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarIs } from "../interface/sidebarIs";
import { UserData } from "../interface/userData";
import { AuthService } from "../service/auth.service";
import {StartTranslateService} from "../service/startTranslate.service";
import { Language } from "../interface/language";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent {
  constructor(public authService: AuthService, public translateService: StartTranslateService) {}

  @Input() userDate!: UserData;
  @Input() onSidebar!: SidebarIs;
  @Input() sigOrReg!: number;
  @Output() closeWin = new EventEmitter();

  active: number = 0;
  sigIn!: boolean;
  lang!: Language;
  darkTheme: boolean = false;

  langArray: Language[] = [
    { lang: 'Русский', code: 'ru' },
    { lang: 'English', code: 'en' },
  ];

  setLanguage(lang: Language) {
    this.translateService.setTranslate(lang.code).then();
  }

  ngOnChanges() {
    this.sigIn = this.authService.getSigIn();
    this.active = this.sigOrReg;
  }

  ngOnInit() {
    const language = this.translateService.getLanguage()
    this.langArray.map((langItem) =>
    { if (langItem.code === language) this.lang = langItem; });
  }
}
