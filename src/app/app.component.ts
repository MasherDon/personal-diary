import { Component } from '@angular/core';
import { MessageService } from "primeng/api";
import { StartTranslateService } from "./starttranslate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})

export class AppComponent {
  constructor(private messageService: MessageService, private startTranslate: StartTranslateService) {
  }

  ngOnInit() {
    this.startTranslate.start();
    this.startTranslate.translatePrime();
    setTimeout(() => this.showConfirm(), 1);
  }

  showConfirm() {
    this.messageService.add({key: 'notRegister', sticky: true, severity:'warn'});
  }

  onWin() {
    this.messageService.clear('notRegister');
  }
}

