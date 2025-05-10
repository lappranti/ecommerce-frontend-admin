import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { Session } from '../../models/session';

export enum AuthConstant {
  tokenLocalName = 'token',
  sessionLocalName = 'userSession',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlAuth =
    'https://ecommerce-backend-backend-admin.onrender.com/admin/auth';

  private userSubject!: BehaviorSubject<any>;
  private currentUser!: Observable<any>;

  constructor(private http: HttpClient) {
    const session = this.getSessionAsObject();
    this.userSubject = new BehaviorSubject<any>(session ? session.user : null);
    this.currentUser = this.userSubject.asObservable();
  }

  registerUser(userData: User): Observable<any> {
    const newUser: User = userData;
    return this.http.post(`${this.apiUrlAuth}/signup`, newUser).pipe(
      tap((res: any) => {
        // console.log(res);

        const session = res as Session;
        this.finalizeAuthentification(session);
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  requestResetPassword(payload: { email: string }) {
    return this.http.post<{ result: string }>(
      `${this.apiUrlAuth}/request-reset-password`,
      payload
    );
  }

  resetPassword(payload: { token: string; newPassword: string }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post(`${this.apiUrlAuth}/resetPassword`, payload, { headers })
      .pipe(
        tap((res: any) => {
          const session = res as Session;
          this.finalizeAuthentification(session);
        }),
        catchError((error) => {
          console.error('Reset-password error:', error);
          return throwError(error);
        })
      );
  }

  loginUser(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrlAuth}/login`, userData).pipe(
      tap((res: any) => {
        const session = res as Session;
        this.finalizeAuthentification(session);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  modifyUser(user: User) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // const modifiedUser = { ...user, userId: user.userId };

    return this.http
      .put(`${this.apiUrlAuth}/${user._id}`, user, { headers })
      .pipe(
        tap((res) => {
          this.finalizeAuthentification(res as Session);
        }),
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(error);
        })
      );
  }

  finalizeAuthentification(session: Session) {
    this.saveToken(session.token);
    this.saveSession(session);
  }

  saveToken(token: string) {
    localStorage.setItem(AuthConstant.tokenLocalName, token);
  }

  getToken() {
    return localStorage.getItem(AuthConstant.tokenLocalName);
  }

  getSession() {
    return localStorage.getItem(AuthConstant.sessionLocalName);
  }

  isLogedIn() {
    return Boolean(this.getSession());
  }

  saveSession(session: Session) {
    localStorage.setItem(
      AuthConstant.sessionLocalName,
      JSON.stringify(session)
    );
    this.userSubject.next(session.userId); // Update the userSubject with the new user data
  }

  getSessionAsObject() {
    const session = localStorage.getItem(AuthConstant.sessionLocalName);
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  cleanAuthData() {
    localStorage.removeItem(AuthConstant.sessionLocalName);
    localStorage.removeItem(AuthConstant.tokenLocalName);
    this.userSubject.next(null); // Update the userSubject to null

    const session = localStorage.getItem(AuthConstant.sessionLocalName);
    const token = localStorage.getItem(AuthConstant.tokenLocalName);
    const isClean = !session && !token;
    return of(isClean);
  }
}
