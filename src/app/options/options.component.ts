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

  book!: boolean;
  pag!: boolean;
  animationRecord!: boolean;
  bookEditRecord!: boolean;
  altDark!: boolean;

  lightThemColor!: Color;
  darkThemColor!: Color;
  colorArray!: Color[];

  ngOnInit() {
    this.colorArray = this.startTranslateService.getColorThem();
    const lightColor = this.themeService.getLightColor();
    const darkColor = this.themeService.getDarkColor();
    this.colorArray.map((colorItem) =>
    { if (colorItem.code === lightColor) this.lightThemColor = colorItem; });
    this.colorArray.map((colorItem) =>
    { if (colorItem.code === darkColor) this.darkThemColor = colorItem; });

    this.altDark = this.themeService.getAltDarkBool();
    this.book = this.themeService.getMenuBook();
    this.pag = this.themeService.getSwitchBook();
    this.animationRecord = this.themeService.getAnimBook();
    this.bookEditRecord = this.themeService.getEditorBook();
  }

  bookThem() {
    this.themeService.setMenuBook(this.book);
  }

  pagThem() {
    this.themeService.setSwitchBook(this.pag);
  }

  animationRecordThem() {
    this.themeService.setAnimBook(this.animationRecord);
  }

  bookEditRecordThem() {
    this.themeService.setEditorBook(this.bookEditRecord);
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
