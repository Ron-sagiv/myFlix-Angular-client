// src/app/user-registration-form/user-registration-form.component.ts

/**
 * Imports the core Angular decorators and lifecycle interfaces.
 * - Component: Defines this class as an Angular component.
 * - OnInit: Lifecycle hook that runs after component initialization.
 * - Input: Allows data binding from a parent component.
 */
import { Component, OnInit, Input } from '@angular/core';

/**
 * Provides a reference to the currently opened Angular Material dialog.
 * Used to close the dialog after successful registration.
 */
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Service responsible for handling API requests to the backend.
 * Used here to send user registration data to the server.
 */
import { FetchApiDataService } from '../fetch-api-data.service'; //changed from userRegistration

/**
 * Angular Material service for displaying snack bar notifications.
 * Used to show success or error messages to the user.
 */
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component responsible for handling user registration.
 *
 * Selector: app-user-registration-form
 * Template: user-registration-form.component.html
 * Styles: user-registration-form.component.scss
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Holds the user input data from the registration form.
   * Decorated with @Input to allow optional data binding from a parent component.
   *
   * Properties:
   * - userName: The chosen username of the user.
   * - password: The chosen password.
   * - email: The user's email address.
   * - birthday: The user's date of birth.
   */
  @Input() userData = { userName: '', password: '', email: '', birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param fetchApiData Service used to communicate with the backend API.
   * @param dialogRef Reference to the currently opened dialog.
   * @param snackBar Service used to display feedback notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService, //changed from userRegistration
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) {}

  /**
   * Angular lifecycle hook.
   * Called once after the component has been initialized.
   *
   * Currently not used but implemented to satisfy the OnInit interface.
   */
  ngOnInit(): void {}

  /**
   * Sends the user registration data to the backend API.
   *
   * This method:
   * 1. Calls the userRegistration() method from FetchApiDataService.
   * 2. Subscribes to the returned Observable.
   * 3. On success:
   *    - Closes the registration dialog.
   *    - Displays a success notification.
   * 4. On error:
   *    - Displays an error notification with the backend error message.
   *
   * @returns void
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open(error.message, 'OK', {
          duration: 2000,
        });
      },
    );
  }
}
