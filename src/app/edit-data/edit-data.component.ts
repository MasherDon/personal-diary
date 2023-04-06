import {Component, EventEmitter, Output} from '@angular/core';
import { AuthService } from "../service/auth.service";
import { StartTranslateService } from "../service/startTranslate.service";
import { EditData } from "../interface/editData";
import { UserData} from "../interface/userData";
import { FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Language } from "../interface/language";
import { ConfirmDialogService } from "../service/confirm-dialog.service";

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css'],
})

export class EditDataComponent {
  constructor(private authService: AuthService, private translateService: StartTranslateService, private formBuilder: FormBuilder,
              private fireAuth: AngularFireAuth, private confirmDialogService: ConfirmDialogService) {}

  @Output() exitSidebar = new EventEmitter;

  label!: EditData;
  labelArray!: EditData[];
  userData!: UserData;
  lang!: Language;
  langArray!: Language[];

  name: RegExp = /\w/;
  strong: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  invalidEmail: number = 0;
  invalidPass: boolean = false;
  errorPassword: boolean = false;

  userNameForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.maxLength(12)]]
  });

  photoURLForm = this.formBuilder.group({
    photoURL: ['', Validators.required]
  });

  passwordForm = this.formBuilder.group({
    password: ['', Validators.required],
    newPassword: ['', Validators.required],
    repeatNewPassword: ['', Validators.required]
  });

  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  deleteForm = this.formBuilder.group({
    password: ['', Validators.required],
  });

  setUserName() {
    this.fireAuth.user.subscribe(user => {
      this.authService.updateNameBD(this.userNameForm.value.userName||'').then();
      user?.updateProfile({
        displayName: this.userNameForm.value.userName,
        photoURL: 'assets/images/avatar.jpg'
      }).then(() => {
        this.userNameForm.reset();
        this.cleanForm();
        this.authService.userUpdate();
      });
    });
  }

  setPhotoURL() {
    this.fireAuth.user.subscribe(user => {
      this.authService.updateImageBD(this.photoURLForm.value.photoURL||'').then();
      user?.updateProfile({
        photoURL: this.photoURLForm.value.photoURL
      }).then(() => {
        this.photoURLForm.reset();
        this.cleanForm();
        this.authService.userUpdate();
      });
    });

  }

  setPassword() {
    let password = '' + this.passwordForm.value.password;
    password = password.trim();
    let newPassword = '' + this.passwordForm.value.newPassword;
    newPassword = newPassword.trim();
    this.fireAuth.signInWithEmailAndPassword(this.userData.email||'', password).then((user) => {
      if (user.user?.emailVerified) {
        user.user.updatePassword(newPassword).then(user => {
          this.authService.userUpdate();
          this.passwordForm.reset();
          this.cleanForm();
        })
      }
    }).catch((error) => {
      switch (error.code) {
        case ('auth/email-already-in-use'): {
          this.invalidEmail = 1;
        }
          break;
        case ('auth/invalid-email'): {
          this.invalidEmail = 2;
        }
          break;
      }
    });
  }

  setEmail() {
    let password = '' + this.emailForm.value.password;
    password = password.trim();
    let email = '' + this.emailForm.value.email;
    email = email.trim();
    this.fireAuth.signInWithEmailAndPassword(this.userData.email||'', password).then((user) => {
      if (user.user?.emailVerified) {
        this.authService.updateEmailBD(email).then();
        user.user.updateEmail(email).then(user => {
          this.emailForm.reset();
          this.cleanForm();
          this.authService.userUpdate();
        });
      }
    }).catch((error) => {
      switch (error.code) {
        case ('auth/wrong-password'): {
          this.errorPassword = true;
        }
          break;
      }
    });
  }

  delete() {
    let password = this.deleteForm.value.password||'';
    password = password.trim();
    this.fireAuth.signInWithEmailAndPassword(this.userData.email||'', password).then(async (user) => {
      if (user.user?.emailVerified) {
        this.exitSidebar.emit();
        this.confirmDialogService.confirm(this.translateService.confirmDialogTranslate());
      }
    }).catch((error) => {
      switch (error.code) {
        case ('auth/wrong-password'): {
          this.errorPassword = true;
        }
          break;
      }
    });
  }

  cleanForm() {
    this.invalidEmail = 0;
    this.invalidPass = false;
    this.errorPassword = false;
  }

  ngOnInit() {
    this.langArray = this.translateService.getMassLanguages();
    const language = this.translateService.getLanguage();
    this.langArray.map((langItem) =>
    { if (langItem.code === language) this.lang = langItem; });
    this.labelArray = this.translateService.getLabel();
    this.label = this.labelArray[0];
    this.userData = this.authService.getUserDate();
  }

  strongPass() {
    return !this.strong.test(String(this.passwordForm.value.newPassword))
  }

  validRepeatPassword() {
    return this.strong.test(String(this.passwordForm.value.newPassword))? !!this.passwordForm.value.repeatNewPassword?.length
      && this.passwordForm.value.repeatNewPassword !== this.passwordForm.value.newPassword : false
  }

  validForm() {
    return this.strong.test(String(this.passwordForm.value.newPassword)) && this.passwordForm.valid
      && this.passwordForm.value.repeatNewPassword === this.passwordForm.value.newPassword
  }
}
