import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import IClip from '../modals/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, of, map, BehaviorSubject, combineLatest, last } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ClipsService {
  public clipsCollection: AngularFirestoreCollection<IClip>;
  pageClips: IClip[] = [];
  pendingReq: boolean = false;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.clipsCollection = db.collection('clips');
  }

  createClips(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data);
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap((values) => {
        const [user, sort] = values;

        if (!user) {
          return of([]);
        }

        const query = this.clipsCollection.ref
          .where('uid', '==', user.uid)
          .orderBy('timestamp', sort == '1' ? 'desc' : 'asc');
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({
      title,
    });
  }

  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`);
    const screenshotRef = this.storage.ref(
      `screenshot/${clip.screenshotFileName}`
    );
    await clipRef.delete();
    await screenshotRef.delete();
    await this.clipsCollection.doc(clip.docID).delete();
  }

  async getClips() {
    if (this.pendingReq) return;
    let query = this.clipsCollection.ref.orderBy('timestamp', 'desc').limit(4);

    const { length } = this.pageClips;

    if (length) {
      const lastDocId = this.pageClips[length - 1].docID;
      const lastDoc = await this.clipsCollection
        .doc(lastDocId)
        .get()
        .toPromise();

      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    snapshot.forEach((doc) => {
      this.pageClips.push({
        docID: doc.id,
        ...doc.data(),
      });
    });

    this.pendingReq = false;
  }
}
