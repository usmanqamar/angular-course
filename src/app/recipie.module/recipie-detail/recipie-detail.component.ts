import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipie } from '../recipie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { deleteRecipe } from '../store/recipe.actions';

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
    private router: Router,
    private store: Store<AppState>
  ) {}
  getRecipe(id: number) {
    //this.store.dispatch(fetchRecipe({ id }));
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getRecipe(params['id']);
    });
    this.route.data.subscribe((recipe) => (this.recipe = recipe[0]));
  }
  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
  onDelete() {
    // this.recipeService
    //   .deleteRecipe(this.id)
    //   .subscribe(() => this.recipeService.recipeAdded.next(true));
    this.store.dispatch(deleteRecipe({ id: this.id }));
    //this.router.navigate(['/recipes']);
  }
}
