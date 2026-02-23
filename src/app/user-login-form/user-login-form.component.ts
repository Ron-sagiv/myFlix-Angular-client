/**
 *  User Login Form Component.
 * This component renders the user login form and handles user login functionality.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service'; //changed from userRegistration

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { userName: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService, //changed from userRegistration
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {}
  /**
   * This method will send the form inputs to the backend
   * @param void
   * @returns user object
   * @memberof UserLoginFormComponent
   * @see FetchApiDataService.userLogin()
   * @example loginUser()
   */
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (response) => {
        // Store user + token
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        // Close dialog
        this.dialogRef.close();

        // Navigate to movies page
        this.router.navigate(['movies']);

        // Success message
        this.snackBar.open('Login successful!', 'OK', {
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
