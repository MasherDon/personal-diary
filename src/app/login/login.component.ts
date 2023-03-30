import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private formBuilder: FormBuilder, public authService: AuthService) {}

  @Output() clickRestore = new EventEmitter();

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  restore() {
    this.clickRestore.emit();
  }

  login() {

  }
}
