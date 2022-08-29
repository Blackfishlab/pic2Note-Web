import { Timestamp } from '@angular/fire/firestore';

export interface Note {
  date: Timestamp,
  note: string,
  noteId: string
  pic: string,
  title: string,
  userId: string,
};

