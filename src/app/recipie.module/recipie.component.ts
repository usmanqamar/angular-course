import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipieListComponent } from './recipie-list/recipie-list.component';

@Component({
  standalone: true,
  selector: 'app-recipie',
  templateUrl: './recipie.component.html',
  styleUrls: ['./recipie.component.css'],
  imports: [RouterModule, RecipieListComponent],
})
export class RecipieComponent {
  constructor() {}
}
