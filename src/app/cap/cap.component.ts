import { Component, Input } from '@angular/core';
import { MenuItem } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import { UserData } from '../userData';
import {ToastService} from "../toast.service";
import {SigOrReg} from "../sigOrReg";

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})

export class CapComponent {
  constructor(private translateService: TranslateService, public toastService: ToastService) {}

  @Input() data!: UserData;
  @Input() lang!: string;
  @Input() sigOrReg!: SigOrReg;

  mainItems!: MenuItem[];
  language!: string;

  translationArray: string[] = [
    "mainMenu.Diary",
    "mainMenu.Recording",
    "mainMenu.Add",
    "mainMenu.Search"
  ];

  ngOnInit() {
    this.language = this.lang;
    this.translateAll();
  }

  ngOnChanges() {
    if (this.language !== this.lang) {
      this.language = this.lang;
      this.translateAll();
    }
  }

  translateAll() {
    for (let value = 0; value < this.translationArray.length; value++) {
      this.translateService.get(this.translationArray[value]).subscribe((res: string) => {
        this.translationArray[value] = '' + res;
      });
    }
    setTimeout(() => this.setTranslate(), 100);
  }

  setTranslate() {
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
}
