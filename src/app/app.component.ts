import { Component } from '@angular/core';
import { StartTranslateService } from "./service/startTranslate.service";
import { AuthService } from "./service/auth.service";
import { ThemeService } from "./service/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public translateService: StartTranslateService, private authService: AuthService, private themeService: ThemeService) {

    this.authService.generate();
    this.translateService.startTranslate();
    this.themeService.generate();
    this.authService.startAuth();
  }

  ngOnInit() {
    // this.authService.startAuth();
    // this.startTranslate.startTranslate().then();
    // this.themeService.generate();
    // //this.authService.generate();
  }
}

