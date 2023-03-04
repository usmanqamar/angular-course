import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.module/auth.service';
import { map, Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { logout } from '../auth.module/store/auth.actions';
import { AuthState } from '../auth.module/store/auth.reducer';
import { selectError, selectIsLoading } from '../global/global.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  isLoading: boolean;
  sub: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .select('auth')
      .pipe(map((authState: AuthState) => authState))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    this.store.select(selectIsLoading).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
  onLogout() {
    this.store.dispatch(logout());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
