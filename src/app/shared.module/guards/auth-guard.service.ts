import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.module/auth.service';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth.module/store/auth.reducer';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      map((authState: AuthState) => authState.user),
      map((user) => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
