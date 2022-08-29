import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notedelete',
  templateUrl: './notedelete.component.html',
  styleUrls: ['./notedelete.component.css']
})
export class NotedeleteComponent implements OnInit {

  // Modal window close note event
  @Output() modalWindowCloseEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  // Handle Ok click
  onClickOk() {
    // Emit modal window close event
    this.modalWindowCloseEvent.emit(true);
  }

  // Handle Cancel click
  onClickCancel() {
    // Emit modal window close event
    this.modalWindowCloseEvent.emit(false);
  }

}
