import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css'],
})

export class CapComponent {
  user: string = 'https://ie.wampi.ru/2023/03/19/9ringpaJHV4.jpg';
  mainItems!: MenuItem[];
  fallItems!: MenuItem[];
  altItems!: MenuItem[];

  bool: string[] = [
    "mainMenu.Diary",
    "mainMenu.Recording",
    "mainMenu.Add",
    "mainMenu.SearchAndEdit",
    "fallItems.Authorization",
    "fallItems.SignIn",
    "fallItems.Registration",
    "altItems.Control",
    "altItems.Options",
    "altItems.SignOut",
  ];

  constructor(private translateService: TranslateService) {}

  translateAll() {
    for (let value = 0; value < this.bool.length; value++) {
      this.translateService.get(this.bool[value]).subscribe((res: string) => {
        this.bool[value] = '' + res;
      });
    }
  }

  setTranslate() {
    this.mainItems = [
      {
        label: this.bool[0],
        icon:'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: this.bool[1],
        icon:'pi pi-fw pi-pencil',
        items:[
          {
            label: this.bool[2],
            icon:'pi pi-plus',
            routerLink: ['/add'],
          },
          {
            label: this.bool[3],
            icon: 'pi pi-search',
            routerLink: ['/search'],
          },
        ]
      }
    ];
    this.fallItems = [
      {
        label: this.bool[4],
        items: [
          {
            label: this.bool[5],
            icon: 'pi pi-sign-in',
            routerLink: ['/login'],
          },
          {
            label: this.bool[6],
            icon: 'pi pi-user-plus',
            routerLink: ['/register'],
          }
        ]
      },
    ];
    this.altItems = [
      {
        label: this.bool[7],
        items: [
          {
            label: this.bool[7],
            icon: 'pi pi-user-plus',
            routerLink: ['/register'],
          },
          {
            label: this.bool[8],
            icon: 'pi pi-sign-out',
          },
        ]
      }
    ];
  }

  ngOnInit() {
    this.translateAll();
    setTimeout(() => this.setTranslate(), 100);
  }
}
