import { Subject } from 'rxjs';
import { Ingredient } from '../../shared.module/ingredient.model';
//
// @Injectable({
//   providedIn: 'root',
// })
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getList() {
    return this.ingredients.slice();
  }
  getById(id: number) {
    return this.ingredients[id];
  }
  addToList(name: string, amount: string) {
    this.ingredients.push(new Ingredient(name, parseInt(amount)));
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients.splice(id, 1, ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ing) => {
      const found = this.ingredients.find((elem) => elem.name === ing.name);
      if (found) found.amount = +found.amount + +ing.amount;
      else {
        this.ingredients.push(ing);
      }
    });
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
