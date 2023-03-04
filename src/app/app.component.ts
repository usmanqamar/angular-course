import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.module/auth.service';
import { filter, Subscription } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth.module/store/auth.actions';
import { selectError } from './global/global.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-course';
  subscription: Subscription;
  appError: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.store.select(selectError).subscribe((error) => {
      this.appError = error;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
