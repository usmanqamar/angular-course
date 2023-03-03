import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.module/auth.service';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../shared.module/loader/loader.component';
import { NgIf } from '@angular/common';
import { DropdownDirective } from '../shared.module/directives/dropdown.directive';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [LoaderComponent, NgIf, DropdownDirective, RouterModule],
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
