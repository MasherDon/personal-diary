import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { UserData } from '../interface/userData';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  data!: UserData;
  sigIn: boolean = false;

  generate() {
    this.data = {
      userName: 'Not authorized user',
      image: 'https://ie.wampi.ru/2023/03/19/9ringpaJHV4.jpg'
    }
  }

  startAuth() {
    this.generate();
  }

  getSigIn() {
    return this.sigIn;
  }

  gatImage() {
    return this.data.image;
  }

  getUserDate() {
    return this.data;
  }

  login(email:string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem('auth', 'true');

    }).catch((error) => {

    })
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
      //localStorage.setItem('auth', 'true');
      console.log(user)
    }).catch((error) => {
      console.log(error)
    })
  }

  logout() {
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('auth');
      //this.router.navigate(['/login']).then();
    }, err => {
      //alert(err.message);
    });
  }
}
