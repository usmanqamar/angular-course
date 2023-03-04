import { createAction, props } from '@ngrx/store';
import { Recipie } from '../recipie.model';

export const fetchRecipes = createAction('[Recipe] Get Recipes');
export const fetchRecipesSuccess = createAction(
  '[Recipe] Get Recipes Success ',
  props<{ recipes: Recipie[] }>()
);

export const fetchRecipe = createAction(
  '[Recipe] Get Recipe',
  props<{ id: number }>()
);

export const fetchRecipeSuccess = createAction(
  '[Recipe] Get Recipe Success',
  props<{ recipe: Recipie }>()
);

export const addRecipe = createAction('[Recipe] Add Recipe', props<Recipie>());

export const addRecipeSuccess = createAction(
  '[Recipe] Add Recipe Success',
  props<{ recipe: Recipie }>()
);

export const updateRecipe = createAction(
  '[Recipe] Update Recipe',
  props<{ id: number; recipe: Recipie }>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{ id: number }>()
);

export const deleteRecipeSuccess = createAction(
  '[Recipe] Delete Recipe Success'
);
