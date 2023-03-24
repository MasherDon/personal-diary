import { Component } from '@angular/core';
import { PageTranslateService } from "./pageTranslate.service";
import { ToastService } from "./toast.service";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageTranslateService, ToastService]
})

export class AppComponent {
  constructor(public startTranslate: PageTranslateService, public toastService: ToastService, public authService: AuthService) {}

  ngOnInit() {
    this.startTranslate.startTranslate();
    this.startTranslate.translatePrime();
    this.toastService.generate();
    this.authService.generate();
    this.toastService.setToast('notRegister',true);
    //setTimeout(() => console.log(this.authService.getData()), 1000);
    //this.toastService.getQuestions(1);
    //setTimeout(() => this.toastService.getQuestions(12), 1000);
    //setTimeout(() => this.data.image = 'https://im.wampi.ru/2023/03/19/pngwing.com.png', 1000);
  }
}

