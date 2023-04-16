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
      localStorage.setItem('menuBook', 'true');
      localStorage.setItem('switchBook', 'false');
      localStorage.setItem('animBook', 'true');
      localStorage.setItem('editorBook', 'true');
      this.setAp();
    }
  }

  getEditorBook() {
    return localStorage.getItem('editorBook') === 'true';
  }

  setColor() {
    const color = ((Math.random() * Math.pow(16, 6)) | 0).toString(16);
    return `#${color}`
  }

  setEditorBook(editorBook: boolean) {
    localStorage.removeItem('editorBook');
    localStorage.setItem('editorBook', String(editorBook));
  }

  getAnimBook() {
    return localStorage.getItem('animBook') === 'true';
  }

  setAnimBook(animBook: boolean) {
    localStorage.removeItem('animBook');
    localStorage.setItem('animBook', String(animBook));
  }

  getSwitchBook() {
    return localStorage.getItem('switchBook') === 'true';
  }

  setSwitchBook(switchBook: boolean) {
    localStorage.removeItem('switchBook');
    localStorage.setItem('switchBook', String(switchBook));
  }

  getMenuBook() {
    return localStorage.getItem('menuBook') === 'true';
  }

  setMenuBook(menuBook: boolean) {
    localStorage.removeItem('menuBook');
    localStorage.setItem('menuBook', String(menuBook));
  }

  getDarkColor() {
    return localStorage.getItem('darkColor')||'';
  }

  setDarkColor(darkColor: string) {
    localStorage.removeItem('darkColor');
    localStorage.setItem('darkColor', darkColor);
    this.setAp();
  }

  getLightColor() {
    return localStorage.getItem('lightColor')||'';
  }

  setLightColor(lightColor: string) {
    localStorage.removeItem('lightColor');
    localStorage.setItem('lightColor', lightColor);
    this.setAp();
  }

  getAltDarkBool() {
    return localStorage.getItem('alt') === 'alt';
  }

  setAltDark(altDark: boolean) {
    localStorage.removeItem('alt');
    localStorage.setItem('alt', altDark? 'alt' : '');
    this.setAp();
  }

  getThemeBool() {
    return localStorage.getItem('them') === 'dark';
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
    const lightThemColor = localStorage.getItem("lightColor");
    const darkThemColor = localStorage.getItem("darkColor");
    link.href = `${them==='dark'?lat==='alt'? lat : them : them}-them-${them==='dark'? darkThemColor : lightThemColor}.css`;
  }
}


