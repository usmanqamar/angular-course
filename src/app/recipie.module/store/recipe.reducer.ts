import { Recipie } from '../recipie.model';
import { createReducer, on } from '@ngrx/store';
import {
  addRecipe,
  fetchRecipesSuccess,
  fetchRecipeSuccess,
} from './recipe.actions';

export interface RecipeState {
  list: Recipie[];
  selectedRecipe: Recipie;
}

const initialState: RecipeState = {
  list: [],
  selectedRecipe: {} as Recipie,
};

const onFetchRecipes = (
  state: RecipeState,
  { recipes }: { recipes: Recipie[] }
) => {
  return { ...state, list: recipes };
};

const onFetchRecipe = (state: RecipeState, { recipe }: { recipe: Recipie }) => {
  return { ...state, selectedRecipe: recipe };
};

const onAddRecipe = (state: RecipeState, recipe: Recipie) => {
  return { ...state, list: [...state.list, recipe] };
};

export const reducer = createReducer(
  initialState,
  on(fetchRecipesSuccess, onFetchRecipes),
  on(fetchRecipeSuccess, onFetchRecipe),
  on(addRecipe, onAddRecipe)
);
