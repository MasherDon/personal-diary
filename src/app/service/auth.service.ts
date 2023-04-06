import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { UserData } from '../interface/userData';
import { ToastService } from "./toast.service";
import { StartTranslateService } from "./startTranslate.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router, private toastService: ToastService,
              private translateService: StartTranslateService, private angularFirestore: AngularFirestore) { }

  data!: UserData;
  sigIn!: boolean;

  generate() {
    this.data = {
      userName: 'Not authorized user',
      image: 'assets/images/avatar.jpg',
    }
  }

  startAuth() {
    this.fireAuth.authState.subscribe((user) => {
      if (user && user?.emailVerified) {
        this.setSigIn(true);
        this.userUpdate();
      } else {
        this.setSigIn(false);
        this.generate();
        this.toastService.offNotRegister();
        this.fireAuth.languageCode = new Promise(() => this.translateService.getLanguage());
      }
    });
  }

  userUpdate() {
    this.fireAuth.user.subscribe(async (user) => {
      if (user && user?.emailVerified) {
        this.data.userName = user.displayName || 'User';
        this.data.email = user.email || '';
        this.data.image = user.photoURL || 'assets/images/avatar.jpg';
        this.data.uid = user.uid;
        const getData = await this.getUserBD();
        this.data.lang = getData['lang'];
        const lang = this.translateService.getLanguage();
        if (lang !== this.data.lang && this.data?.lang) {
          this.translateService.setTranslate(this.data.lang).then();
        }
      }
    });
  }

  generateBD(user: any) {
    const name = 'user/' + user?.uid + '/data';
    this.angularFirestore.firestore.collection(name).add({
      userName: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      lang: this.translateService.getLanguage(),
      uid: user?.uid
    }).then();
  }

  async getUserBD() {
    const name = 'user/' + this.data.uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    return arrayDoc.docs[0].data();
  }

  async updateLangBD(lang: string) {
    const name = 'user/' + this.data.uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({lang: lang}).then();
  }

  async updateNameBD(user: string) {
    const name = 'user/' + this.data.uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({userName: user}).then();
  }

  async updateEmailBD(email: string) {
    const name = 'user/' + this.data.uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({email: email}).then();
  }

  async updateImageBD(image: string) {
    const name = 'user/' + this.data.uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({image: image}).then();
  }

  async deleteUser() {
    const name = 'user/' + this.data.uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    this.angularFirestore.firestore.collection(name).doc(name + `/${arrayDoc.docs[0].id}`).delete().then();
    this.fireAuth.currentUser.then(user => {
      user?.delete().then(() => {
        this.router.navigate(['/']).then();
      });
    });
  }

  getSigIn() {
    return this.sigIn;
  }

  setSigIn(sigIn: boolean) {
    this.sigIn = sigIn;
  }

  gatImage() {
    return this.data.image;
  }

  getUserDate() {
    return this.data;
  }

  logOut() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/']).then();
    });
  }
}
