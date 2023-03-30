import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { UserData } from '../interface/userData';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  data!: UserData;

  generate() {
    this.data = {
      userName: 'Not authorized user',
      image: 'https://ie.wampi.ru/2023/03/19/9ringpaJHV4.jpg'
    }
    localStorage.removeItem('sigIn');
    localStorage.setItem('sigIn', 'false');
  }

  startAuth() {
    this.generate();
  }

  getSigIn() {
    return localStorage.getItem('sigIn')==='true';
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

    }).catch((error) => {

    })
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {


    }).catch((error) => {

    })
  }

  logout() {
    this.fireAuth.signOut()
      .then((user) => {


    }).catch((error) => {

    })
  }
}
