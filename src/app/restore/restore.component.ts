import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})

export class RestoreComponent {
  constructor(private formBuilder: FormBuilder) {}

  restoreForm = this.formBuilder.group({
    email: ['', Validators.email]
  });

  restore() {

  }
}
