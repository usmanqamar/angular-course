import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recipe.reducer';

export const selectRecipes = createFeatureSelector<RecipeState>('recipes');
export const selectRecipesList = createSelector(
  selectRecipes,
  (state: RecipeState) => state.list
);

export const selectRecipe = createSelector(
  selectRecipes,
  (state: RecipeState) => state.selectedRecipe
);
