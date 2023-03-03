import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipie } from '../recipie.model';
import { RecipeService } from '../services/recipe.service';
import { LoggingService } from '../../logging.service';
import { RecipieItemComponent } from './recipie-item/recipie-item.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css'],
  imports: [RecipieItemComponent, CommonModule],
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[] = [];
  @Output() selectedRecipe = new EventEmitter<Recipie>();
  error: any;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private logSvc: LoggingService
  ) {}

  fetchRecipes() {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipies = data;
    });
  }
  ngOnInit() {
    this.logSvc.log('On Recipe List');
    this.recipeService.recipeAdded.subscribe((data) => {
      //this.recipies = data;
      this.fetchRecipes();
    });
    this.fetchRecipes();
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
