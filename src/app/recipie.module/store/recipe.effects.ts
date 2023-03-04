import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  addRecipe,
  addRecipeSuccess,
  deleteRecipe,
  deleteRecipeSuccess,
  fetchRecipe,
  fetchRecipes,
  fetchRecipesSuccess,
  fetchRecipeSuccess,
  updateRecipe,
} from './recipe.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Recipie } from '../recipie.model';

@Injectable()
export class RecipeEffects {
  timer: any;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  recipeList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecipes.type),
      switchMap(() => {
        return this.http.get<{ [key: string]: Recipie }>('recipes.json').pipe(
          catchError(() => of()),
          map((respData) => {
            const updatedResponse: Recipie[] = [];
            for (const key in respData) {
              updatedResponse.push({ ...respData[key], id: key });
            }
            return fetchRecipesSuccess({ recipes: updatedResponse });
          })
        );
      })
    )
  );

  getRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecipe.type),
      switchMap(({ id }) => {
        return this.http.get<Recipie>(`recipes/${id}.json`).pipe(
          map((respData) => {
            return fetchRecipeSuccess({
              recipe: {
                ...respData,
                id,
                ingredients: respData.ingredients ? respData.ingredients : [],
              },
            });
          }),
          catchError(() => of())
        );
      })
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRecipe.type),
      switchMap(({ id }) => {
        return this.http.delete(`recipes/${id}.json`).pipe(
          map((respData) => {
            return deleteRecipeSuccess();
          }),
          catchError(() => of())
        );
      })
    )
  );

  deleteRecipeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRecipeSuccess.type),
      tap(() => this.router.navigate(['recipes'])),
      map(() => {
        return fetchRecipes();
      })
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRecipe.type),
      switchMap((recipe) => {
        return this.http.post(`recipes.json`, recipe).pipe(
          map((respData) => {
            return fetchRecipes();
          }),
          catchError(() => of())
        );
      })
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRecipe.type),
      switchMap(({ id, recipe }) => {
        return this.http.put(`recipes/${id}.json`, recipe).pipe(
          tap((respData) => {
            this.router.navigate(['../']);
          }),
          map((respData) => {
            return fetchRecipes();
          }),
          catchError(() => of())
        );
      })
    )
  );
}
