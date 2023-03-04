import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  AUTO_LOGIN,
  LOGIN,
  LOGIN_SUCCESS,
  loginSuccess,
  LOGOUT,
} from './auth.actions';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, AuthService } from '../auth.service';
import { UserModel } from '../user.model';
import { Router } from '@angular/router';
import { setError, setLoading } from '../../global/global.actions';

@Injectable()
export class AuthEffects {
  timer: any;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private static handleAuthentication({
    email,
    idToken,
    localId,
    expiresIn,
  }: AuthResponse) {
    const expiryDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(localId, email, idToken, expiryDate);

    localStorage.setItem('userData', JSON.stringify(user));
    return { ...user, redirect: true };
  }

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      switchMap(({ payload }: any) => {
        return this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUFGP4sSEBhd7WjUo0pl8TMAhIb7BaeKc',
            {
              email: payload.email,
              password: payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(({ expiresIn }) => {
              this.authService.autoLogout(+expiresIn * 1000);
            }),
            map((respData: AuthResponse) => {
              return loginSuccess(
                AuthEffects.handleAuthentication({
                  email: respData.email,
                  idToken: respData.idToken,
                  localId: respData.localId,
                  expiresIn: respData.expiresIn,
                })
              );
            }),
            catchError(({ error }) => of())
          );
      })
    )
  );

  authLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGIN_SUCCESS),
        tap((authData: any) => {
          if (authData.payload.redirect) {
            this.router.navigate(['/recipes']);
          }
        })
      ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.authService.clearTimer();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  authAutoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpiryDate: string;
        } = JSON.parse(localStorage.getItem('userData') as string);
        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new UserModel(
          userData.id,
          userData.email,
          userData._token,
          new Date(userData._tokenExpiryDate)
        );
        if (loadedUser.token) {
          const remainingTime =
            new Date(userData._tokenExpiryDate).getTime() -
            new Date().getTime();

          this.authService.autoLogout(remainingTime);
          return loginSuccess(loadedUser);
        }
        return { type: 'DUMMY' };
      })
    )
  );
}
