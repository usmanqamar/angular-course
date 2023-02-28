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

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  baseUrl =
    'https://angular-e6a67-default-rtdb.asia-southeast1.firebasedatabase.app/';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService.isLoading.next(true);
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
          this.authService.isLoading.next(false);
        }
      }),
      catchError(({ error }) => {
        this.authService.isLoading.next(false);

        this.authService.apiError.next(
          typeof error === 'object' ? error.error.message : error
        );
        return throwError(error);
      })
    );
  }
}
