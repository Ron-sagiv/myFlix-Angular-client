import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  isFavorite(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(movieId) > -1;
  }

  openMovieDetails(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: movie,
      width: '500px',
    });
  }

  openDirector(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: movie.director,
      width: '400px',
    });
  }

  openGenre(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: movie.genre,
      width: '400px',
    });
  }

  addToFavorites(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.fetchApiData
        .addFavoriteMovie(user.userName, movie._id)
        .subscribe(() => {
          this.snackBar.open('Movie added to Favorite List!', 'OK', {
            duration: 2000,
          });
          // Update the LocalStorage user object
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
          // Update the Favorites ID by maintaining a variable or sync user local storage
        });
    }
  }
}
