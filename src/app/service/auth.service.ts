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
  sigIn: boolean = false;

  generate() {
    this.data = {
      userName: 'User',
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

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/']).then();
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']).then();
    })
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('register');
      this.router.navigate(['/login']).then();
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']).then();
    })
  }

  logout() {
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('auth');
      this.router.navigate(['/login']).then();
    }, err => {
      alert(err.message);
    });
  }
}
