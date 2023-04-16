import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { UserData } from '../interface/userData';
import { ToastService } from "./toast.service";
import { StartTranslateService } from "./startTranslate.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { RecordsService } from "./records.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router, private toastService: ToastService, private recordsService: RecordsService,
              private translateService: StartTranslateService, private angularFirestore: AngularFirestore) { }

  data!: UserData;
  sigIn!: boolean;

  generate() {
    this.data = {
      userName: 'Not authorized user',
      image: 'assets/images/avatar.jpg',
    }
    if(!this.getPersistence()) {
      this.setPersistence('local')
    }
  }

  setPersistence(value: string) {
    localStorage.removeItem('persistence');
    localStorage.setItem('persistence', value)
  }

  getPersistence() {
    return localStorage.getItem('persistence');
  }

  startAuth() {
    this.fireAuth.authState.subscribe(user => {
      if (user && user?.emailVerified) {
        this.setSigIn(true);
        this.userUpdate();
        if (localStorage.getItem('records')) this.toastService.offLocalSave();
      } else {
        this.setSigIn(false);
        this.generate();
        this.toastService.offNotRegister();
      }
    });
  }

  userUpdate() {
    this.fireAuth.user.subscribe(user => {
      if (user && user?.emailVerified) {
        this.data.userName = user.displayName || 'User';
        this.data.email = user.email || '';
        this.data.image = user.photoURL || 'assets/images/avatar.jpg';
        this.setDataUser(user.uid).then();
      }
    });
  }

  async setDataUser(uid: string) {
    const dataBD = await this.getUserBD(uid);
    const languageBD = dataBD['lang'];
    const language = this.translateService.getLanguage();
    if (language !== languageBD) {
      this.translateService.setTranslate(languageBD).then();
    }
    const record = await this.recordsService.getAllRecordsBD(uid);
    this.data.records = record.docs.length;
    const tags = await this.recordsService.getTagsBD(uid);
    this.data.tag = tags.length;
  }

  async getUserBD(uid: string) {
    const name = 'user/' + uid + '/data';
    const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
    return  arrayDoc.docs[0].data();
  }

  generateBD() {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/data';
      this.angularFirestore.firestore.collection(name).add({
        userName: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        lang: this.translateService.getLanguage(),
        uid: user?.uid
      }).then();
    });
  }

  async updateLangBD(lang: string) {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/data';
      const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
      this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({lang: lang}).then();
    });
  }

  async updateNameBD(userName: string) {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/data';
      const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
      this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({userName: userName}).then();
    });
  }

  async updateEmailBD(email: string) {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/data';
      const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
      this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({email: email}).then();
    });
  }

  async updateImageBD(image: string) {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/data';
      const arrayDoc = await this.angularFirestore.firestore.collection(name).get();
      this.angularFirestore.firestore.collection(name).doc(arrayDoc.docs[0].id).update({image: image}).then();
    });
  }

  async deleteUser() {
    this.fireAuth.authState.subscribe(async user => {
      const data = 'user/' + user?.uid + '/data';
      const arrayData = await this.angularFirestore.firestore.collection(data).get();
      this.angularFirestore.firestore.collection(data).doc(arrayData.docs[0].id).delete().then();

      const records = 'user/' + user?.uid + '/records';
      const arrayRecords = await this.angularFirestore.firestore.collection(records).get();
      for (let n = 0; n < arrayRecords.docs.length; n++) {
        this.angularFirestore.firestore.collection(records).doc(arrayRecords.docs[0].id).delete().then();
      }

      this.fireAuth.currentUser.then(user => {
        user?.delete().then(() => {
          this.router.navigate(['/']).then();
        });
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
