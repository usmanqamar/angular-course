import { Component, Input } from '@angular/core';
import { Recipie } from '../../recipie.model';
import { RecipeService } from '../../services/recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css'],
  imports: [RouterModule],
})
export class RecipieItemComponent {
  @Input() recipe: Recipie;
  @Input() id: number;
  constructor(private recipeService: RecipeService) {}
}
