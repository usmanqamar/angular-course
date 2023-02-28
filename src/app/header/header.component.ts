import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.module/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  isLoading: boolean;
  sub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.sub = this.authService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
