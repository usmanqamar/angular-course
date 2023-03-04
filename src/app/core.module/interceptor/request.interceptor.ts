import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth.module/auth.service';
import { Injectable } from '@angular/core';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { setLoading } from '../../global/global.actions';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  baseUrl =
    'https://angular-e6a67-default-rtdb.asia-southeast1.firebasedatabase.app/';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(setLoading({ isLoading: true, error: '' }));
    const url = !req.url.includes('signInWithPassword')
      ? this.baseUrl + req.url
      : req.url;

    const token = JSON.parse(localStorage.getItem('userData') || '{}')[
      '_token'
    ];

    const newReq = req.clone({
      url,
      params: req.params.append('auth', token),
    });
    return next.handle(newReq).pipe(
      tap((events) => {
        if (events.type === HttpEventType.Response) {
          this.store.dispatch(setLoading({ isLoading: false, error: '' }));
        }
      }),
      catchError(({ error: { error } }) => {
        this.store.dispatch(
          setLoading({ isLoading: false, error: error.message })
        );
        return throwError(error);
      })
    );
  }
}
