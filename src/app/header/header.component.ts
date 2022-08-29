import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Set menu icon code
  menuIconCode: string = '&#9776;';

  // Mobile menu display switch
  displayMobileMenu: boolean = false;

  // User authenticated switch
  isAuthenticated = false;

  // Stores subscription to userChanged
  private userSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.userChanged.subscribe(user => {
      if(user.uid !== '') {
        this.isAuthenticated = true;
      }
    });

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  menuIconClick() {
    // Toggle mobile menu display switch
    this.displayMobileMenu = !this.displayMobileMenu;
    // Update mobile menu button symbol
    this.menuIconCode = this.displayMobileMenu ? '&#9747;' : '&#9776;';
  }

  onLogin() {

    // Toggle mobile menu display switch
    this.displayMobileMenu = !this.displayMobileMenu;

    // Update mobile menu button symbol
    this.menuIconCode = this.displayMobileMenu ? '&#9747;' : '&#9776;';

    // Navigate to /login
    this.router.navigate(['/login']);

  }

  onLogout() {

    // If logout was called through aside menu...
    if(this.displayMobileMenu) {

      // Toggle mobile menu display switch
      this.displayMobileMenu = !this.displayMobileMenu;

      // Update mobile menu button symbol
      this.menuIconCode = this.displayMobileMenu ? '&#9747;' : '&#9776;';

    }

    // Clear user authenticated switch
    this.isAuthenticated = false;

    // Call logout service
    this.authService.logout();
  }

}
