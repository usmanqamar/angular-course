import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipie } from '../recipie.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css'],
})
export class RecipieDetailComponent implements OnInit {
  @Input() recipe: Recipie = {} as Recipie;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  getRecipe(id: number) {
    this.recipeService.getRecipe(id).subscribe((data) => (this.recipe = data));
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getRecipe(params['id']);
    });
  }
  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
  onDelete() {
    this.recipeService
      .deleteRecipe(this.id)
      .subscribe(() => this.recipeService.recipeAdded.next(true));
    this.router.navigate(['/recipes']);
  }
}
