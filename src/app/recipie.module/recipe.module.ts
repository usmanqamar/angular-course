import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipieComponent } from './recipie.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SharedModule } from '../shared.module/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    RecipieComponent,
    RecipieListComponent,
    RecipieItemComponent,
    RecipieDetailComponent,
    RecipeStartComponent,
    EditRecipeComponent,
  ],

  imports: [RecipeRoutingModule, SharedModule],
  // providers: [LoggingService],
})
export class RecipeModule {}
