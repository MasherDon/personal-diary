import { Injectable } from '@angular/core';
import { Toast } from './toast'
import {SigOrReg} from "./sigOrReg";

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor() { }

  array: Toast = {
    notRegister: false,
  }

  mass: SigOrReg = {
    onWin: false,
    sigOrReg: false,
  }

  getSigOrReg() {
    return JSON.parse(localStorage.getItem('sigOrReg')||'');
  }

  setSigOrReg(onWin: boolean, sigOrReg: boolean) {
    const sig = this.getToast();
    localStorage.removeItem('sigOrReg');
    sig.onWin = onWin;
    sig.sigOrReg = sigOrReg;
    localStorage.setItem('sigOrReg', JSON.stringify(sig));
  }

  generate() {
    localStorage.setItem('sigOrReg', JSON.stringify(this.mass));
    localStorage.setItem('toast', JSON.stringify(this.array));
  }

  setToast(item: string, value: boolean) {
    const toasts = this.getToast();
    localStorage.removeItem('toast');
    toasts[item] = value;
    localStorage.setItem('toast', JSON.stringify(toasts));
  }

  getToast() {
    return JSON.parse(localStorage.getItem('toast')||'');
  }
}
