import { Injectable } from '@angular/core';
import IPlayer from '../modals/player.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IPlayer>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.userCollection = db.collection('players');
    auth.user.subscribe();
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
  }

  public async createUser(userData: IPlayer) {
    //Exception Handling of Password
    if (!userData.password) throw new Error('Password Not Provided');

    //Create User using Email and Password
    const playerCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData?.password
    );

    if (!playerCred.user) throw new Error('User Not Created');

    //Add User to Firestore
    await this.userCollection.doc(playerCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phone_number: userData.phone_number,
    });

    playerCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }

    await this.auth.signOut();

    await this.router.navigateByUrl('/');
  }
}
