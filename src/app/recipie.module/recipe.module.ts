import { NgModule } from '@angular/core';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipieComponent } from './recipie.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SharedModule } from '../shared.module/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/recipe.effects';
import { reducer } from './store/recipe.reducer';

@NgModule({
  declarations: [
    RecipieComponent,
    RecipieListComponent,
    RecipieItemComponent,
    RecipieDetailComponent,
    RecipeStartComponent,
    EditRecipeComponent,
  ],

  imports: [
    RecipeRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', reducer),
    EffectsModule.forFeature([RecipeEffects]),
  ],
})
export class RecipeModule {}
