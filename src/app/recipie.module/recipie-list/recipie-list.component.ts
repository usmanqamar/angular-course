import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipie } from '../recipie.model';
import { RecipeService } from '../services/recipe.service';
import { LoggingService } from '../../logging.service';
import * as fromRecipe from '../store/recipe.selctors';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Observable } from 'rxjs';
import { fetchRecipes } from '../store/recipe.actions';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css'],
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[] = [];
  //recipies: Observable<Recipie[]>;
  @Output() selectedRecipe = new EventEmitter<Recipie>();
  error: any;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private logSvc: LoggingService,
    private store: Store<AppState>
  ) {}

  fetchRecipes() {
    // this.recipeService.getRecipes().subscribe((data) => {
    //   this.recipies = data;
    // });
  }
  ngOnInit() {
    // this.recipeService.recipeAdded.subscribe((data) => {
    //   this.fetchRecipes();
    // });
    this.store.dispatch(fetchRecipes());

    //this.fetchRecipes();
    this.store.select(fromRecipe.selectRecipesList).subscribe((data) => {
      this.recipies = data;
    });
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
