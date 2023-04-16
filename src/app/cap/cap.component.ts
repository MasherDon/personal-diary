import { Component } from '@angular/core';
import { SidebarIs } from "../interface/sidebarIs";
import { StartTranslateService } from "../service/startTranslate.service";
import { AuthService } from "../service/auth.service";
import { ThemeService } from "../service/theme.service";

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})

export class CapComponent {
  constructor(public translateService: StartTranslateService, public authService: AuthService, public themeService: ThemeService) {}

  darkTheme!: boolean;

  onSidebar: SidebarIs = {
    onWin: false,
    sigOrReg: 0
  }

  changesThem() {
    this.themeService.setTheme(this.darkTheme);
  }

  ngOnInit() {
    this.darkTheme = this.themeService.getThemeBool();
  }

  changeSigOrReg(sigOrReg: number) {
    this.onSidebar.onWin = true;
    this.onSidebar.sigOrReg = sigOrReg;
  }
}
