import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IClip from '../modals/clip.model';

@Injectable({
  providedIn: 'root',
})
export class ClipsService {
  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private db: AngularFirestore) {
    this.clipsCollection = db.collection('clips');
  }

  async createClips(data: IClip) {
    await this.clipsCollection.add(data);
  }
}
