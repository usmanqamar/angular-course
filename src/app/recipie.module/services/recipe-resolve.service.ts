import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Recipie } from '../recipie.model';
import { RecipeService } from './recipe.service';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { fetchRecipe, fetchRecipeSuccess } from '../store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recipie> {
  constructor(
    private recipeService: RecipeService,
    private store: Store<AppState>,
    private action$: Actions
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipie> | Promise<Recipie> | Recipie {
    this.store.dispatch(fetchRecipe({ id: route.params['id'] }));
    return this.action$.pipe(
      ofType(fetchRecipeSuccess.type),
      map((data: any) => data.recipe)
    );
  }
}
