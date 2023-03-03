import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipie } from '../recipie.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recipie[]> {
  constructor(private recipeService: RecipeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipie[]> | Promise<Recipie[]> | Recipie[] {
    return this.recipeService.getRecipes();
  }
}
