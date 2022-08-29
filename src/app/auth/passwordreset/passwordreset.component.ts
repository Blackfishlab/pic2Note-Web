import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  // Tmp variables
  templateEmail: string = '';
  showErrorModal: boolean = false;
  errMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm() {

    // Call auth service passwordReset
    this.authService.passwordReset(this.templateEmail).then(() => {

      // Navigate to login page
      this.router.navigate(['/login']);

    }).catch((error) => {

      // Prepare error message for error modal
      this.errMessage = error;

      // Show error modal
      this.showErrorModal = true;

    });;

  }

  // Handle error modal close event
  handleErrorModalClose() {

    // Hide Note delete modal window
    this.showErrorModal = false;

  }

}
