import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
/**
 * WelcomePageComponent
 *
 * Displays the application's welcome page.
 *
 * This component serves as the landing page of the application and provides
 * access to user authentication features.
 * Opens sign in and registration forma
 * @remarks
 * - Uses Angular Material dialogs for authentication forms
 * - Acts as the main entry point for unauthenticated users
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   *
   * @param dialog - Angular Material dialog
   */
  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {}
  /**
   * Angular lifecycle hook that is called after component initialization.
   *
   * Currently does not contain initialization logic (but can be in the future).
   */

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['movies']);
    }
  }

  /**
   * Opens the user registratiion dialog.
   * This method launches the UserLoginFormComponent
   * @returns void
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  /**
   * Opens the user login dialog.
   * This method launches the UserLoginFormComponent
   * @returns void
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
