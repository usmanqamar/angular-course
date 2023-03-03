import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggingService } from '../logging.service';

@Component({
  standalone: true,
  selector: 'app-test-child',
  template: `<p>this is child</p>`,
})
export class ChildComponent {
  authForm: FormGroup;
  error: string;
  constructor() {}
}
