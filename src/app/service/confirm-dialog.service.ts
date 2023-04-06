import { Injectable } from '@angular/core';
import { ConfirmationService } from "primeng/api";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class ConfirmDialogService {
  constructor(private confirmationService: ConfirmationService, private authService: AuthService) {}

  confirm(translate: string) {
    this.confirmationService.confirm({
      message: translate,
      icon: 'pi pi-user-minus',
      accept: async () => {
        this.authService.deleteUser().then();
      }
    });
  }
}
