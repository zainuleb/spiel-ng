import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import IClip from '../modals/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClipsService {
  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.clipsCollection = db.collection('clips');
  }

  createClips(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data);
  }

  getUserClips() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }

        const query = this.clipsCollection.ref.where('uid', '==', user.uid);
        return query.get();
      })
    );
  }
}
