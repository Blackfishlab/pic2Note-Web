import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-noteviewedit',
  templateUrl: './noteviewedit.component.html',
  styleUrls: ['./noteviewedit.component.css']
})
export class NotevieweditComponent implements OnInit, OnDestroy {

  // Tmp variables
  tmpNoteId: string;

  // Template note vars
  templateNoteDate: Date;
  templateNotePic: string ='';
  templateNoteTitle: string ='';
  templateNoteNote: string = '';

  // For storing note subscription
  noteSub: Subscription;

  constructor(private route: ActivatedRoute, private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    // Get noteId from current route
    this.tmpNoteId = this.route.snapshot.params['noteId'];

    // Subscribe to note subscription
    this.noteSub = this.notesService.getNote(this.tmpNoteId).subscribe((note) => {
      // Prepare template note vars
      this.templateNoteDate = note.date.toDate();
      this.templateNotePic = note.pic;
      this.templateNoteTitle = note.title;
      this.templateNoteNote = note.note;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe note subscription
    this.noteSub.unsubscribe();
  }

  onSubmitForm() {
    // Call update note service
    this.notesService.updateNote(this.tmpNoteId, this.templateNoteTitle, this.templateNoteNote);

    // Navigate back to /notes
    this.router.navigate(['/notes']);
}

  onClickCancel() {
    // Navigate back to /notes
    this.router.navigate(['/notes']);
  }

}
