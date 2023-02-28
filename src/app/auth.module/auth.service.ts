import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface AuthResponse {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
}
@Injectable()
export class AuthService {
  user = new BehaviorSubject<UserModel | null>(null);
  timer: any;
  apiError = new Subject<string>();
  isLoading = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  autoLogout(expirationDuration: number) {
    this.timer = setTimeout(() => this.logout(), expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiryDate: string;
    } = JSON.parse(localStorage.getItem('userData') as string);
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpiryDate)
    );
    if (loadedUser.token) {
      const remainingTime =
        new Date(userData._tokenExpiryDate).getTime() - new Date().getTime();

      this.autoLogout(remainingTime);
      this.user.next(loadedUser);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUFGP4sSEBhd7WjUo0pl8TMAhIb7BaeKc',
        { email, password, returnSecureToken: true }
      )
      .pipe(tap((res) => this.handleAuthentication(res)));
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  private handleAuthentication({
    email,
    idToken,
    localId,
    expiresIn,
  }: AuthResponse) {
    const expiryDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(localId, email, idToken, expiryDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }
}
