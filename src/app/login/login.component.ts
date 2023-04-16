import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { ToastService } from "../service/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private formBuilder: FormBuilder, public authService: AuthService, private fireAuth: AngularFireAuth, private router: Router,
              private toastService: ToastService) {}

  @Output() clickRestore = new EventEmitter();
  @Output() exitSidebar = new EventEmitter();

  errorEmail: number = 0;
  errorPassword: boolean = false;
  persistence!: boolean;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  login() {
    let email = '' + this.loginForm.value.email; email = email.trim();
    let password = '' + this.loginForm.value.password; password = password.trim();
    this.fireAuth.setPersistence(this.authService.getPersistence()||'local').then(() => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then(async (user) => {
        this.errorEmail = 0;
        this.errorPassword = false;
        this.loginForm.reset();
        if (user.user?.emailVerified) {
          this.toastService.onNotRegister();
          this.toastService.sigInSuccess();
          this.exitSidebar.emit();
          this.authService.setSigIn(true);
          this.authService.userUpdate();
          this.router.navigate(['/']).then();
        } else {
          this.toastService.onNotRegister();
          this.toastService.offVerified();
        }
      }).catch((error) => {
        switch (error.code) {
          case ('auth/user-not-found'): {
            this.errorEmail = 1;
          }
            break;
          case ('auth/invalid-email'): {
            this.errorEmail = 2;
          }
            break;
          case ('auth/wrong-password'): {
            this.errorPassword = true;
          }
            break;
          case ('auth/operation-not-allowed'): {
            this.toastService.operationNotAllowed();
          }
            break;
          default: {
            this.toastService.sigIngError();
          }
        }
      });
    });
  }

  changePersistence() {
    this.authService.setPersistence(this.persistence?'local':'session');
  }

  ngOnInit() {
    this.persistence = this.authService.getPersistence() === 'local';
  }

  restore() {
    this.clickRestore.emit();
  }
}
