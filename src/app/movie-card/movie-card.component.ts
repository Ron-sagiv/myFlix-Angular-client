import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

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
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
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
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.addFavoriteMovie(user, movie._id).subscribe(() => {
        alert('Added to favorites!');
      });
    }
  }
}
