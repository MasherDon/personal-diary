import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ToastService } from "../service/toast.service";

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})

export class RestoreComponent {
  constructor(private formBuilder: FormBuilder, private fireAuth: AngularFireAuth, private toastService: ToastService) {}

  @Input() focus!: boolean;
  @Output() sigInEvent = new EventEmitter();

  restoreForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  });

  invalidEmail: number = 0;

  restore() {
    let email = '' + this.restoreForm.value.email; email = email.trim();
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.invalidEmail = 0;
      this.restoreForm.reset();
      this.toastService.restore();
      this.sigInEvent.emit();
    }).catch((error) => {
      switch (error.code) {
        case ('auth/invalid-email'): {
          this.invalidEmail = 1;
        }
        break;
        case ('auth/user-not-found'): {
          this.invalidEmail = 2;
        }
        break;
        case ('auth/operation-not-allowed'): {
          this.toastService.operationNotAllowed();
        }
        break;
        default: {
          this.toastService.notRestore();
        }
        break;
      }
    });
  }
}
