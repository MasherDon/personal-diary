import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor(public messageService: MessageService) { }

  arrayString!: string[];

  isDeleteUser!: boolean;

  generateTranslate(stringTranslate: string[]) {
    this.arrayString = stringTranslate;
  }

  operationNotAllowed() {
    this.massage('error', this.arrayString[0], this.arrayString[1]);
  }
  errorRegistration() {
    this.massage('error', this.arrayString[0], this.arrayString[2]);
  }
  successRegistration() {
    this.massage('success', this.arrayString[3], this.arrayString[4]);
  }
  sigInSuccess() {
    this.massage('success', this.arrayString[3], this.arrayString[5]);
  }
  sigIngError() {
    this.massage('error', this.arrayString[0], this.arrayString[6]);
  }
  restore() {
    this.massage('success', this.arrayString[3], this.arrayString[7]);
  }
  notRestore() {
    this.massage('error', this.arrayString[0], this.arrayString[8]);
  }

  massage(severity: string, summary: string, detail: string) {
    this.messageService.add({ key: 'massage', severity: severity, summary: summary, detail: detail, life: 10000 });
  }

  offVerified() {
    this.messageService.add({ key: 'verified', severity: 'error', sticky: true });
  }
  offNotRegister() {
    this.messageService.add( {key: 'notRegister', severity: 'warn', sticky: true});
  }
  onVerified() {
    this.messageService.clear('verified');
  }
  onNotRegister() {
    this.messageService.clear('notRegister');
  }
}
