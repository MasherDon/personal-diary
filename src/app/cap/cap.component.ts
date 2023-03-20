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
  mainItems: MenuItem[] = [
    {
      label:`mainMenu.Diary`,
      icon:'pi pi-home',
      routerLink: ['/'],
    },
    {
      label:'mainMenu.Recording',
      icon:'pi pi-fw pi-pencil',
      items:[
        {
          label:'mainMenu.Add',
          icon:'pi pi-plus',
          routerLink: ['/add'],
        },
        {
          label:'mainMenu.SearchAndEdit',
          icon:'pi pi-search',
          routerLink: ['/'],
        },
      ]
    }
  ];
  fallItems: MenuItem[] = [
    {
      label: 'fallItems.Authorization',
      items: [
        {
          label: 'fallItems.SignIn',
          icon: 'pi pi-sign-in',
          routerLink: ['/login'],
        },
        {
          label: 'fallItems.Registration',
          icon: 'pi pi-user-plus',
          routerLink: ['/register'],
        }
      ]
    },
  ];

  constructor(private translateService: TranslateService) {

  }

  translate(item: Object) {
    for (let value of Object.values(item)) {
      this.translateService.get(value.label).subscribe((res: string) => {
        value.label = res;
      });
      if (Array.isArray(value.items)) {
        this.translate(value.items);
      }
    }
  }

  ngOnInit() {
    this.translate(this.mainItems);
    this.translate(this.fallItems);
    // this.fallItems = [
    //   {
    //     label: 'Control',
    //     items: [
    //       {
    //         label: 'Options',
    //         icon: 'pi pi-user-plus'
    //       },
    //       {
    //         label: 'Sign out',
    //         icon: 'pi pi-sign-out',
    //       },
    //     ]
    //   }
    // ];
  }
}
