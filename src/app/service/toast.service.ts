import { Injectable } from '@angular/core';
import { Toast } from '../interface/toast'

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor() { }

  arrayToast!: Toast;

  generate() {
    this.arrayToast = {
      notRegister: true,
    }
  }

  setToast(item: string, value: boolean) {
    switch(item) {
      case ('notRegister'):
        this.arrayToast.notRegister = value;
        break;
    }
  }

  getToast() {
    return this.arrayToast;
  }
}
