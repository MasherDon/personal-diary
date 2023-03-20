import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})

export class AppComponent {
  constructor(private translateService: TranslateService, private messageService: MessageService) {
    translateService.setDefaultLang('ru');
    const browserLang = translateService.getBrowserLang();
    if (browserLang && browserLang.match(/en/)) {
      this.translateService.use(browserLang);
    }
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'notRegister', sticky: true, severity:'warn'});
  }

  onWin() {
    this.messageService.clear('notRegister');
  }
}

