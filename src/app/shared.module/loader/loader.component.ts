import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loader',
  styleUrls: ['./loader.component.css'],
  template:
    '<div class="d-flex justify-content-center position-absolute start-50 top-50 "><div class="lds-dual-ring"></div></div>',
})
export class LoaderComponent {}
