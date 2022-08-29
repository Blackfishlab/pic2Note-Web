import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Tmp variables
  templateEmail: string = '';
  templatePassword: string = '';
  showErrorModal: boolean = false;
  errMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSubmitForm() {

    // Call login service
    this.authService.login(this.templateEmail, this.templatePassword).then((result) => {

      // Call emit new user
      const tmpUser = new User(result.user.uid, result.user.email, result.user.emailVerified);

      // Emit new user subject
      this.authService.emitNewUser(tmpUser);

      // Store new user data to local storage
      localStorage.setItem('userData', JSON.stringify(tmpUser));

      // Navigate away
      this.router.navigate(['/notes']);

    }).catch((error) => {

      // Prepare error message for error modal
      this.errMessage = error;

      // Show error modal
      this.showErrorModal = true;

    });

  }

  // Handle error modal close event
  handleErrorModalClose() {

    // Hide Note delete modal window
    this.showErrorModal = false;

  }

}
