import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Note } from './note/note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  // Notes observable
  notes: Observable<Note[]>;

  // Temporary note id
  tmpNoteId!: string;

  // Notedelete  component display switch
  showNoteDelete: boolean = false;

  // Data loaded switch
  dataLoaded: boolean = true;

  // Subscription to notes observable
  notesSub: Subscription;

  constructor(private notesService: NotesService, private router: Router, private authService: AuthService, private firestore: AngularFirestore ) {

  }

  ngOnInit(): void {

    // Get user id for logged user
    const userId = this.authService.getUserId;

    // Load notes from firebase
    this.notes = this.notesService.getNotes(userId);

    // Subscribe to notes observable to get number of notes
    this.notesSub = this.notesService.getNotes(userId).pipe(catchError(error => of([]))).subscribe((value) => {

      // Set data loaded switch
      this.dataLoaded = (value.length === 0) ? false : true;

    }, (error) => {
      alert(error);
    } );
  }

  ngOnDestroy(): void {}

  // Handle View & Edit note
  handleViewEditNote(noteId: string) {
    this.router.navigate(['note/' + noteId]);
  }

  // Handle delete note
  handleDeleteNote(noteId: string) {

    // Store note id
    this.tmpNoteId = noteId;

    // Show Note delete modal window
    this.showNoteDelete = true;
  }

  // Handle modal window close event
  handleModalWindowClose(action:boolean) {
    if(action) {
      // Call notes service to delete note
      this.notesService.deleteNote(this.tmpNoteId);
    }
    // Hide Note delete modal window
    this.showNoteDelete = false;
  }

}
