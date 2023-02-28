import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth.module/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipie.module/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./shopping-list.module/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },

  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
