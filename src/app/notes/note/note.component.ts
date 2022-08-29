import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from './note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  // Note coming form notes parent component
  @Input('noteComponent') noteComponent: Note;

  // Delete note event
  @Output() deleteNoteEvent = new EventEmitter<string>();

  // View & Edit note event
  @Output() viewEditNoteEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // Start view & edit note action
  startViewEditNote(event: any, noteId: string) {
    this.viewEditNoteEvent.emit(noteId);
  }

  // Start delete note action
  startDeleteNote(event: any, noteId: string) {
    this.deleteNoteEvent.emit(noteId);
  }

}
