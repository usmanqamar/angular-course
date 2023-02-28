import { Injectable } from '@angular/core';
import { Recipie } from '../recipie.model';
import { Ingredient } from '../../shared.module/ingredient.model';
import { ShoppingListService } from '../../shopping-list.module/services/shopping-list.service';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeAdded = new Subject<Recipie[] | boolean>();
  private recipies: Recipie[] = [
    new Recipie(
      'A Test Recipe',
      'Description',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/olive-garden-ziti-al-forno-recipe-2-1640031063.jpeg',
      [new Ingredient('Meat', 1)]
    ),
    new Recipie(
      'Recipe 2',
      'Some Dummy Description',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/olive-garden-ziti-al-forno-recipe-2-1640031063.jpeg',
      [new Ingredient('French Fries', 20)]
    ),
    new Recipie(
      'A Test Recipe 3',
      'Description',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/olive-garden-ziti-al-forno-recipe-2-1640031063.jpeg',
      [new Ingredient('Bread', 2), new Ingredient('Meat', 1)]
    ),
  ];
  constructor(
    private shoppingService: ShoppingListService,
    private http: HttpClient
  ) {}
  getRecipes(): Observable<any> {
    return this.http.get<{ [key: string]: Recipie }>('recipes.json').pipe(
      map((response) => {
        const updatedResponse: Recipie[] = [];
        for (const key in response) {
          updatedResponse.push({ ...response[key], id: key });
        }
        return updatedResponse;
      })
    );
  }
  getRecipe(id: number): Observable<any> {
    return this.http.get<Recipie>(`recipes/${id}.json`).pipe(
      map((response) => {
        return { ...response, id, ingredients: response?.ingredients || [] };
      })
    );
  }
  deleteRecipe(id: number) {
    //this.recipies.splice(id, 1);
    return this.http.delete(`recipes/${id}.json`);
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
  async addRecipe(recipe: Recipie) {
    //this.recipies.push(recipe);
    await firstValueFrom(this.http.post(`recipes.json`, recipe));
    this.recipeAdded.next(true);
  }
  updateRecipe(index: number, recipe: Recipie) {
    this.recipies[index] = recipe;
    this.recipeAdded.next(this.recipies.slice());
  }
}
