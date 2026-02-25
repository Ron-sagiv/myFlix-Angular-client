import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://flixirama-1ce078bad93f.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  //changed from userRegistration
  constructor(private http: HttpClient) {}

  // ==========================
  // USER REGISTRATION
  // ==========================
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // ==========================
  // USER LOGIN
  // ==========================
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // ==========================
  // GET ALL MOVIES
  // ==========================
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // GET ONE MOVIE
  // ==========================
  public getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // GET DIRECTOR
  // ==========================
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'director/' + directorName, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // GET GENRE
  // ==========================
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genre/' + genreName, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // GET USER
  // ==========================
  public getUser(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // GET FAVORITE MOVIES
  // ==========================
  public getFavoriteMovies(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map((response: any) => response.favoriteMovies))
      .pipe(catchError(this.handleError));
  }

  // ==========================
  // ADD MOVIE TO FAVORITES
  // ==========================
  public addFavoriteMovie(userName: string, movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + 'users/' + userName + '/movies/' + movieId,
        {},
        {
          headers: this.getTokenHeaders(),
        },
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // DELETE MOVIE FROM FAVORITES
  // ==========================
  public deleteFavoriteMovie(
    userName: string,
    movieId: string,
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + movieId, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // EDIT USER
  // ==========================
  public editUser(userName: string, updatedDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userName, updatedDetails, {
        headers: this.getTokenHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ==========================
  // DELETE USER
  // ==========================
  public deleteUser(userName: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + userName, {
      headers: this.getTokenHeaders(),
    });
  }

  // ==========================
  // Token Header Helper (NEW METHOD)
  // ==========================
  private getTokenHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  // ==========================
  // RESPONSE HANDLER
  // ==========================
  private extractResponseData(res: any): any {
    return res || {};
  }

  // ==========================
  // ERROR HANDLER
  // ==========================
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Client error:', error.error.message);
    } else {
      console.error(
        `Server error ${error.status}, ` + `Error body: ${error.error}`,
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
