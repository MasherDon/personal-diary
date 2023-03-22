import { Component } from '@angular/core';
import { StartTranslateService } from "./starttranslate.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, StartTranslateService]
})

export class AppComponent {
  constructor(private startTranslate: StartTranslateService) {}

  question: boolean = false;

  ngOnInit() {
    this.startTranslate.start();
    this.startTranslate.translatePrime();
    setTimeout(() => this.question = true, 1);
  }
}

