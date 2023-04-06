import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ToastService } from "../service/toast.service";
import { UserData } from "../interface/userData";
import {StartTranslateService} from "../service/startTranslate.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, public authService: AuthService, private fireAuth: AngularFireAuth,
              private toastService: ToastService, private translateService: StartTranslateService) {}

  @Output() sigInClick = new EventEmitter();

  registerForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  });

  //blockChars: RegExp = /^[^<>*!.:;|?/]+$/;
  name: RegExp = /\w/;
  strong: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  invalidEmail: number = 0;
  invalidPass: boolean = false;

  userData!: UserData;

  register() {
    let userName = '' + this.registerForm.value.userName; userName = userName.trim();
    let email = '' + this.registerForm.value.email; email = email.trim();
    let password = '' + this.registerForm.value.password; password = password.trim();
    this.fireAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.invalidEmail = 0;
      this.invalidPass = false;
      this.registerForm.reset();
      if(user.additionalUserInfo?.isNewUser) {
        this.toastService.onNotRegister();
        this.toastService.successRegistration();
        this.sigInClick.emit();
        this.fireAuth.currentUser.then((user) => {
          user?.sendEmailVerification();
          user?.updateProfile({
            displayName: userName,
            photoURL: 'assets/images/avatar.jpg'
          }).then(() => {
            this.authService.generateBD(user);
          });
        });
      }
    }).catch((error) => {
      console.log(error);
      switch (error.code) {
        case ('auth/email-already-in-use'): {
          this.invalidEmail = 1;
        }
          break;
        case ('auth/invalid-email'): {
          this.invalidEmail = 2;
        }
          break;
        case ('auth/operation-not-allowed'): {
          this.toastService.operationNotAllowed();
        }
          break;
        case ('auth/weak-password'): {
          this.invalidPass = true;
        }
          break;
        default: {
          this.toastService.errorRegistration();
        }
          break;
      }
    });
  }

  validForm() {
    return this.strong.test(String(this.registerForm.value.password)) && this.registerForm.valid
      && this.registerForm.value.repeatPassword === this.registerForm.value.password
  }

  strongPass() {
    return !this.strong.test(String(this.registerForm.value.password))
  }

  validRepeatPassword() {
    return this.strong.test(String(this.registerForm.value.password))? !!this.registerForm.value.repeatPassword?.length
      && this.registerForm.value.repeatPassword !== this.registerForm.value.password : false
  }
}
