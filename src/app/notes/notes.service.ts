import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "./note/note.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Timestamp } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth//auth.service';

@Injectable()
export class NotesService {

  constructor(private fireStore: AngularFirestore, private storage: AngularFireStorage, private authService: AuthService){}

  // Get all notes
  getNotes(userId: string): Observable<Note[]> {

    // Set notes collection with query and return observable to notes
    return this.fireStore.collection<Note>('notes', ref => ref.where('userId', '==', userId).orderBy('date', 'desc')).valueChanges();

  }

  // Get note by note id
  getNote(noteId: string) {

    // Return observable to Note
    return this.fireStore.doc<Note>('notes/'+ noteId).valueChanges().pipe(take(1));

  }

  // Update note by id
  updateNote(noteId: string, title: string, note: string){

    // Update firestore notes document
    this.fireStore.collection('notes').doc('/'+ noteId).update({
      date: Timestamp.fromDate(new Date()),
      title: title,
      note: note,
    });

  }

  // Delete note by note id
  deleteNote(noteId: string) {

    // get uer id for currently logged user
    const userId = this.authService.getUserId;

    // Delete firestore document
    this.fireStore.collection('notes').doc('/'+ noteId).delete();

    // Delete storage file
    this.storage.ref('note_images/' + userId + '/' + noteId + '.jpeg').delete();

  }

}
