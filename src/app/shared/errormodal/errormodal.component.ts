import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrormodalComponent implements OnInit {

  // Error message input
  @Input() errorMessage: string;

  // Modal window close note event
  @Output() errorModalCloseEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  // Handle Ok click
  onClickOk() {
    // Emit modal window close event
    this.errorModalCloseEvent.emit();
  }
}
