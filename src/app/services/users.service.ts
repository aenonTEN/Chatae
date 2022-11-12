import { AuthService } from 'src/app/services/auth.service';
import { ProfileUser } from '../models/user';
import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable, of, switchMap, from } from 'rxjs';
import { collection, query, setDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  get currentUserProfile$(): Observable<ProfileUser | null> {

    return this.auth.isLoggedIn$.pipe(
      switchMap(user => {

        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    )
  }


  get allUsers$(): Observable<ProfileUser[]>{
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>
  }

  constructor(private firestore:Firestore, private auth: AuthService) { }

  addUser(user: ProfileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user))
  }

  updateUser(user: ProfileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, {...user}));
  }


}
