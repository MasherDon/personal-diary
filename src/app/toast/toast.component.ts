import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastService } from "../service/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})

export class ToastComponent {
  constructor(public toastService: ToastService, public messageService: MessageService, public confirmationService: ConfirmationService) {}

  @Output() clickButton = new EventEmitter();

  sigOrReg(value: number) {
    this.clickButton.emit(value);
    this.toastService.onNotRegister();
  }
}
