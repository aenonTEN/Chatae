import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';
import firebase from 'firebase/compat/app';
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  //authentication
  //storing the route param value, room/:id -> id value

  private pathParamState: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pathParam: Observable<string>


  //user

  private user!: firebase.User



  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) { 


this.pathParam = this.pathParamState.asObservable();

this.afAuth.authState.subscribe(user => {

  if(user) {
    this.user = user;
    localStorage['set']('user', JSON.stringify(this.user));
    this.router.navigateByUrl('').then();
  } else {
    localStorage.setItem('user', null!);
  }
});

    }


    loginWithGoogle(): void {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data: UserCredential): void => {
        if (data.user) {
          this.user = data.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigateByUrl('').then();
        } else {
          localStorage.setItem('user', null!);
        }
      })
      
    }


    logout(): void {
      this.afAuth.signOut().then((): void => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login').then();
      })
    }

    updatePathParamState(newpathParam: string): void {
      this.pathParamState.next(newpathParam);

    }


    getUser(): firebase.User {
      return this.user;
    }
}
