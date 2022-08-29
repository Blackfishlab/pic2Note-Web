import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { AngularFireAuth } from '@angular/fire/compat/auth'


@Injectable()
export class AuthService {

  userChanged = new BehaviorSubject<User>(new User('','', false));

  constructor(private router: Router, private firestoreAuth: AngularFireAuth){}

  // Login
  login(email: string, password: string) {

    // Call firestore signInWithEmailAndPassword and return promise
    return this.firestoreAuth.signInWithEmailAndPassword(email, password);

  }

  // Logout
  logout() {

    return this.firestoreAuth.signOut().then(() => {

      // Emit new user subject
      this.userChanged.next(new User('','', false));

      // Clear local storage
      localStorage.removeItem('userData');

      // Navigate away
      this.router.navigate(['/login']);

    }).catch((error) => {
      alert(error);
    });
  }

  // Emit new user
  emitNewUser(newUser: User) {

    // Emit new user event
    this.userChanged.next(newUser);

  }

  // Send password reset mail
  passwordReset(email: string) {

    // Send password reset request
    return this.firestoreAuth.sendPasswordResetEmail(email);

  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    //return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  // Return user id for logged user
  get getUserId(): string {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    return user !== null ? user.uid : '';
  }

}
