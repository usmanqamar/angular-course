import { Injectable } from '@angular/core';
import { Recipie } from '../recipie.model';
import { Ingredient } from '../../shared.module/ingredient.model';
import { ShoppingListService } from '../../shopping-list.module/services/shopping-list.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
}
