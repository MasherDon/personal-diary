import { Component } from '@angular/core';
import { StartTranslateService } from "./service/startTranslate.service";
import { ToastService } from "./service/toast.service";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public startTranslate: StartTranslateService, public toastService: ToastService, public authService: AuthService) {}

  ngOnInit() {
    this.startTranslate.startTranslate();
    this.toastService.generate();
    this.authService.startAuth();
  }
}

