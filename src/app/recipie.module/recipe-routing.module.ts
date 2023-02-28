import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipieComponent } from './recipie.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipeResolveService } from './services/recipe-resolve.service';
import { AuthGuardService } from '../shared.module/guards/auth-guard.service';

const ROUTES: Routes = [
  {
    path: '',
    component: RecipieComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
      {
        path: 'new',
        component: EditRecipeComponent,
      },
      { path: ':id/edit', component: EditRecipeComponent, pathMatch: 'full' },
      {
        path: ':id',
        component: RecipieDetailComponent,
        resolve: [RecipeResolveService],
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
