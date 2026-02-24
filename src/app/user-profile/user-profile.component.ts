import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  updatedUser = {
    userName: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const userName = localStorage.getItem('user');
    if (userName) {
      this.fetchApiData.getUser(userName).subscribe((resp: any) => {
        this.user = resp;
        this.updatedUser.userName = resp.userName;
        this.updatedUser.email = resp.email;
        this.updatedUser.password = resp.password;
        this.updatedUser.birthday = resp.birthday;
      });
    }
  }

  updateUser(): void {
    const userName = localStorage.getItem('user');
    if (userName) {
      this.fetchApiData
        .editUser(userName, this.updatedUser)
        .subscribe((resp) => {
          this.snackBar.open('Profile updated!', 'OK', { duration: 2000 });
        });
    }
  }
  deleteUser(): void {
    const userName = localStorage.getItem('user');

    if (userName && confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser(userName).subscribe(() => {
        localStorage.clear();
        alert('Account deleted.');
        window.location.href = '/welcome';
      });
    }
  }
}
