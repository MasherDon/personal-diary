import { Injectable } from '@angular/core';
import { Toast } from '../interface/toast'

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor() { }

  arrayToast!: any;

  generate() {
    this.arrayToast = {
      notRegister: true,
    }
  }

  setToast(item: string, value: boolean) {
    this.arrayToast[item] = value;
  }

  getToast() {
    return this.arrayToast;
  }
}
