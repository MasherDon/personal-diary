import {Inject, Injectable} from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  generate() {
    let them = localStorage.getItem('them');
    if (them) {
      this.theme(them==='dark')
    } else {
      localStorage.setItem('them', 'light');
    }
  }

  getTheme() {
    return localStorage.getItem("them") === 'dark';
  }

  setTheme(dark: boolean) {
    localStorage.removeItem('them');
    localStorage.setItem('them', dark?'dark':'light');
    this.theme(dark);
  }

  theme(dark: boolean) {
    let them = this.document.getElementById('app-them') as HTMLLinkElement;
    if (them) {
      if (dark) {
        them.href = '' + 'dark-them.css';
      } else {
        them.href = '' + 'light-them.css';
      }
    }
  }
}
