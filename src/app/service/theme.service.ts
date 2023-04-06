import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { PrimeNGConfig } from "primeng/api";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document, private config: PrimeNGConfig) {}

  generate() {
    this.config.ripple = false;
    let them = localStorage.getItem("them")||'';
    if (them) {
      this.setAp();
    } else {
      localStorage.setItem('them', 'light');
      localStorage.setItem('alt', 'false');
      localStorage.setItem('darkColor', 'purple');
      localStorage.setItem('lightColor', 'blue');
      this.setAp();
    }
  }

  getDarkColor() {
    return localStorage.getItem("darkColor")||'';
  }

  setDarkColor(darkColor: string) {
    localStorage.removeItem('darkColor');
    localStorage.setItem('darkColor', darkColor);
    this.setAp();
  }

  getLightColor() {
    return localStorage.getItem("lightColor")||'';
  }

  setLightColor(lightColor: string) {
    localStorage.removeItem('lightColor');
    localStorage.setItem('lightColor', lightColor);
    this.setAp();
  }

  getAltDarkBool() {
    return localStorage.getItem("alt")==='alt';
  }

  setAltDark(altDark: boolean) {
    localStorage.removeItem('alt');
    localStorage.setItem('alt', altDark? 'alt' : '');
    this.setAp();
  }

  getThemeBool() {
    return localStorage.getItem("them")==='dark';
  }

  setTheme(dark: boolean) {
    localStorage.removeItem('them');
    localStorage.setItem('them', dark? 'dark' : 'light');
    this.setAp();
  }

  setAp() {
    const link = this.document.getElementById('app-them') as HTMLLinkElement;
    const them = localStorage.getItem("them")||'';
    const lat = localStorage.getItem('alt');
    const lightThemColor = this.getLightColor();
    const darkThemColor = this.getDarkColor();
    link.href = `${them==='dark'?lat==='alt'? lat : them : them}-them-${them==='dark'? darkThemColor : lightThemColor}.css`;
  }
}


