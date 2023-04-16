import { Injectable } from '@angular/core';
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import { Language } from "../interface/language";
import { Color } from "../interface/color";
import { EditData } from "../interface/editData";
import { ToastService } from "./toast.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
 })

export class StartTranslateService {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService, private toastService: ToastService,
              private fireAuth: AngularFireAuth) {}

  mainItems!: MenuItem[];
  colorItems!: Color[];
  labelItems!: EditData[];

  transMenuArray!: string[];
  menuArray: string[] = [
    "mainMenu.diary",
    "mainMenu.recording",
    "mainMenu.add",
    "mainMenu.search",
  ];

  transMassageArray!: string[];
  massageArray: string[] = [
    "massage.error",
    "massage.notAllowed",
    "massage.regError",
    "massage.success",
    "massage.sucReg",
    "massage.sigInSuccess",
    "massage.sigIngError",
    "massage.massEmail",
    "massage.notRestore",
  ];

  transColorArray!: string[];
  colorArray: string[] = [
    "color.blue",
    "color.green",
    "color.orange",
    "color.purple",
  ];

  transFormArray!: string[];
  formArray: string[] = [
    "form.nickname",
    "form.photoURL",
    "form.password",
    "form.email",
    "form.delete",
  ];

  transConfirmDialog!: string;
  confirmDialog: string = "massage.deleteProfile";

  transEditorArray!: string[];
  editorArray: string[] = [
    "editor.placeholder",
    "editor.enterHeader",
    "editor.clickTune",
    "editor.orDragToMove",
    "editor.convert",
    "editor.add",
    "editor.text",
    "editor.heading",
    "editor.list",
    "editor.delimiter",
    "editor.link",
    "editor.marker",
    "editor.bold",
    "editor.italic",
    "editor.title",
    "editor.message",
    "editor.addLink",
    "editor.notDisplayed",
    "editor.unordered",
    "editor.ordered",
    "editor.delete",
    "editor.moveUp",
    "editor.moveDown",
  ];

  transButtonArray!: string[];
  buttonArray: string[] = [
    "button.delete"
  ];

  massLanguages: Language[] = [
    { lang: 'Русский', code: 'ru' },
    { lang: 'English', code: 'en' },
  ];

  filterLang: RegExp = /ru|en/;

  languages: string[] = ['ru', 'en'];


  getLanguage() {
    return localStorage.getItem('lang')||'ru';
  }

  getMassLanguages() {
    return this.massLanguages;
  }

  async setTranslate(lang: string) {
    this.transMenuArray = [];
    this.transMassageArray = [];
    this.transColorArray = [];
    this.transFormArray = [];
    this.transEditorArray = [];
    this.transButtonArray = [];

    await this.translateService.use(lang).subscribe(() => {
      for (let n = 0; n < this.menuArray.length; n++) {
        this.transMenuArray.push(this.translateService.instant(this.menuArray[n]))
      }
      this.setStringMenu();

      for (let n = 0; n < this.massageArray.length; n++) {
        this.transMassageArray.push(this.translateService.instant(this.massageArray[n]))
      }
      this.toastService.generateTranslate(this.transMassageArray);

      for (let n = 0; n < this.colorArray.length; n++) {
        this.transColorArray.push(this.translateService.instant(this.colorArray[n]))
      }
      this.setStringColor();

      for (let n = 0; n < this.formArray.length; n++) {
        this.transFormArray.push(this.translateService.instant(this.formArray[n]))
      }
      this.setStringLabel();

      this.transConfirmDialog = this.translateService.instant(this.confirmDialog);

      for (let n = 0; n < this.editorArray.length; n++) {
        this.transEditorArray.push(this.translateService.instant(this.editorArray[n]))
      }

      for (let n = 0; n < this.buttonArray.length; n++) {
        this.transButtonArray.push(this.translateService.instant(this.buttonArray[n]))
      }

      this.translatePrime();
      localStorage.removeItem('lang');
      localStorage.setItem('lang', lang);
      // @ts-ignore
      this.fireAuth.languageCode = lang; //new Promise(() => lang);
    });
  }

  getEditorTranslate() {
    return this.transEditorArray;
  }

  confirmDialogTranslate() {
    return this.transConfirmDialog;
  }

  getMenuTranslate() {
    return this.mainItems;
  }

  getColorThem() {
    return this.colorItems;
  }

  getLabel() {
    return this.labelItems;
  }

  getButtonTranslate() {
    return this.transButtonArray;
  }

  setStringMenu() {
    this.mainItems = [
      {
        label: this.transMenuArray[0],
        icon:'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: this.transMenuArray[1],
        icon:'pi pi-fw pi-pencil',
        items:[
          {
            label: this.transMenuArray[2],
            icon:'pi pi-plus',
            routerLink: ['/add'],
          },
          {
            label: this.transMenuArray[3],
            icon: 'pi pi-search',
            routerLink: ['/search'],
          },
        ]
      }
    ];
  }

  setStringLabel() {
    this.labelItems = [
      { label: this.transFormArray[0], code: 1 },
      { label: this.transFormArray[1], code: 2 },
      { label: this.transFormArray[2], code: 3 },
      { label: this.transFormArray[3], code: 4 },
      { label: this.transFormArray[4], code: 5 },
    ]
  }

  setStringColor() {
    this.colorItems  = [
      { color: this.transColorArray[0], code: 'blue' },
      { color: this.transColorArray[1], code: 'green' },
      { color: this.transColorArray[2], code: 'orange' },
      { color: this.transColorArray[3], code: 'purple' },
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
