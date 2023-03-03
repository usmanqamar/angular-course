import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoggingService } from '../logging.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  error: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private logSvc: LoggingService
  ) {}

  ngOnInit() {
    this.logSvc.log('Login Page');
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.authService.user.subscribe((d) => {
      if (this.router.url === '/login' && !!d) {
        this.router.navigate(['/recipes']);
      }
    });
  }

  onSubmit() {
    this.authService
      .login(this.authForm.value.email, this.authForm.value.password)
      .subscribe((d) => {
        this.router.navigate(['/recipes']);
      });
  }
}
