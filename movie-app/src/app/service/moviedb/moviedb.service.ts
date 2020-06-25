import { Injectable } from '@angular/core';

import { ajax } from 'rxjs/ajax';
import { map, catchError, throttle, throttleTime } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {
  private apiKey = environment.moviedbApiKey;

  searchMovie(query: string) {
    const observable = new Observable((observer) => {
      this.searchMovieRequest(query).subscribe((response) => {
        observer.next(response);
      });
    });
    return observable;
  }

  searchMovieRequest(query) {
    query = query.replace(/ /g, '+');
    const request = ajax(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`).pipe(
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      }));
    return request;
  }

}

// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

// https://api.themoviedb.org/3/movie/550?api_key=59b1b6d0847d625f838d4f042251b24c