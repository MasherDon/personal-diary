import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, public authService: AuthService) {}

  registerForm = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  });

  //blockChars: RegExp = /^[^<>*!.:;|?/]+$/;
  block: RegExp = /\w/;

  register() {
    //console.log(this.loginForm);
    const email = '' + this.registerForm.value.email;
    const password = '' + this.registerForm.value.password;
    //console.log(email, password);
    this.authService.register(email, password);
  }
}
