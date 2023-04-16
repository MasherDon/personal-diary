import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastService } from "../service/toast.service";
import { RecordsService } from "../service/records.service";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})

export class ToastComponent {
  constructor(public toastService: ToastService, public messageService: MessageService, public confirmationService: ConfirmationService,
              private recordsService: RecordsService, private authService: AuthService) {}

  @Output() clickButton = new EventEmitter();

  sigOrReg(value: number) {
    this.clickButton.emit(value);
    this.toastService.onNotRegister();
  }

  save() {
    this.recordsService.addLocalSave().then(() => {
      this.authService.userUpdate();
    });
    this.toastService.onLocalSave()
  }

  delete() {
    this.recordsService.clearLocalSave().then();
    this.toastService.onLocalSave()
  }
}
