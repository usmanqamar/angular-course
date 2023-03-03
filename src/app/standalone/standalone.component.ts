import { Component } from '@angular/core';
import { HighlightDirective } from '../shared.module/directives/highlight.directive';

@Component({
  standalone: true,
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css'],
  imports: [HighlightDirective],
})
export class StandaloneComponent {}
