import { Injectable } from '@angular/core';
import { Auth, authState, UserInfo} from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, updateProfile, UserCredential } from 'firebase/auth';
// import { UserInfo } from 'os';
import { BehaviorSubject, observable, of, switchMap, Observable, concatMap, from } from 'rxjs';
import { SignUpCredentials, signinCredentials } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.auth);

  
  



  constructor(private auth: Auth) {

   }

   signIn({email, password}: signinCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
   }

  //  signUp({email, password, displayName}: SignUpCredentials){

  //   return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
  //     switchMap(( {user} ) => updateProfile(user, {displayName}))
      
  //     );

    

  // }
  
  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signOut(){
    return from(this.auth.signOut());
  }

  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(

      concatMap(user => {
        if(!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      }
    )
    )

    }
  }
