import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  Observable,
  tap,
  catchError,
  BehaviorSubject,
  throwError,
  of,
} from 'rxjs';
import { City } from '../models/city.model';
import { Times } from '../models/times.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endPoint: string = 'https://mock-stg.getpackage-dev.com';
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  header = '';
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('currentUser')}`,
    }),
  };
  httpOptionsPost = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, X-Custom-Header, Upgrade-Insecure-Requests',
    }),
  };

  getCities(): Observable<City> {
    return this.http.get<City>(`${this.endPoint}/cities`);
  }
  getHours(): Observable<Times> {
    return this.http.get<Times>(`${this.endPoint}/times`);
  }

  login(formData: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.endPoint}/login`,
        JSON.stringify(formData),
        this.httpOptionsPost
      )
      .pipe(
        tap((resp: any) => {
          if (resp.token) {
            this.header = resp.token ?? '';
            this.cookieService.set('currentUser', this.header);
            this.loginStatus.next(true);
          }
          return resp;
        }),
        catchError(this.handleError)
      );
  }

  save(formData: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.endPoint}/submit`,
        JSON.stringify(formData),
        this.httpOptions
      )
      .pipe(
        tap((resp: any) => {
          if (resp.status) {
          }
          return resp;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  private hasToken(): boolean {
    return this.cookieService.check('currentUser');
  }
}
