import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.module/auth.service';
import { filter, Subscription } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-course';
  subscription: Subscription;
  appError: string;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.autoLogin();
    this.authService.apiError.subscribe((error) => {
      this.appError = error;
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.appError = '';
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
