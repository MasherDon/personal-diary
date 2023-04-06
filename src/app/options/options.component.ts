import { Component } from '@angular/core';
import { StartTranslateService } from "../service/startTranslate.service";
import { ThemeService } from "../service/theme.service";
import { Color } from "../interface/color";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent {
  constructor(public themeService: ThemeService, public startTranslateService: StartTranslateService) {}

  book: boolean = true;
  pag: boolean = false;
  animationRecord: boolean = true;
  bookEditRecord: boolean = true;

  altDark!: boolean;

  lightThemColor!: Color;
  darkThemColor!: Color;
  colorArray!: Color[];
  darkThem!: boolean;

  ngOnInit() {
    this.darkThem = this.themeService.getThemeBool();
    this.colorArray = this.startTranslateService.getColorThem();
    const lightColor = this.themeService.getLightColor();
    const darkColor = this.themeService.getDarkColor();
    this.colorArray.map((colorItem) =>
    { if (colorItem.code === lightColor) this.lightThemColor = colorItem; });
    this.colorArray.map((colorItem) =>
    { if (colorItem.code === darkColor) this.darkThemColor = colorItem; });
    this.altDark = this.themeService.getAltDarkBool();
  }

  lightThemColorChange(color: Color) {
    this.themeService.setLightColor(color.code);
  }

  darkThemColorChange(color: Color) {
    this.themeService.setDarkColor(color.code);
  }

  altDarkThem() {
    this.themeService.setAltDark(this.altDark);
  }
}
