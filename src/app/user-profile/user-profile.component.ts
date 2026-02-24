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
  favoriteMovies: any = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.fetchApiData.getUser(user.userName).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        this.updatedUser.userName = resp.userName;
        this.updatedUser.email = resp.email;
        this.updatedUser.password = '';
        this.updatedUser.birthday = resp.birthday;

        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.favoriteMovies = resp.filter(
            (m: { _id: any }) => this.user.favoriteMovies.indexOf(m._id) >= 0,
          );
        });
      });
    }
  }

  updateUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.fetchApiData
        .editUser(user.userName, this.updatedUser)
        .subscribe((resp) => {
          this.snackBar.open('Profile updated!', 'OK', { duration: 2000 });
          this.user = this.updatedUser;
        });
    }
  }
  removeFromFavorites(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.fetchApiData
        .deleteFavoriteMovie(user.userName, movie._id)
        .subscribe((resp) => {
          this.snackBar.open('Movie removed from Favorite List!', 'OK', {
            duration: 2000,
          });
          this.user = resp;
          this.favoriteMovies = this.favoriteMovies.filter(
            (m: { _id: any }) => resp.favoriteMovies.indexOf(m._id) >= 0,
          );
        });
    }
  }
  deleteUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser(user.userName).subscribe(() => {
        localStorage.clear();
        alert('Account deleted.');
        window.location.href = '/welcome';
      });
    }
  }
}
