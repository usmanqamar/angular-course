import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { autoLogout, loginSuccess, logout } from './store/auth.actions';
import { AuthState } from './store/auth.reducer';

export interface AuthResponse {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
}
@Injectable()
export class AuthService {
  timer: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  autoLogout(expirationDuration: number) {
    this.timer = setTimeout(
      () => this.store.dispatch(logout()),
      expirationDuration
    );
  }
  clearTimer() {
    this.timer = null;
  }
}
