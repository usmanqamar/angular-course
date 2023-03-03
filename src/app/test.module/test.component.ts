import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggingService } from '../logging.service';
import { ChildComponent } from './child.component';
import { HighlightDirective } from '../shared.module/directives/highlight.directive';
import { RecipeService } from '../recipie.module/services/recipe.service';

@Component({
  standalone: true,
  selector: 'app-test',
  templateUrl: './test.component.html',
  imports: [ChildComponent, HighlightDirective],
  providers: [LoggingService],
})
export class TestComponent {
  authForm: FormGroup;
  error: string;
  constructor(private svc: LoggingService) {
    this.svc.log('hello');
  }
}
