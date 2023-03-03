import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth.module/auth.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'test',
    loadChildren: () =>
      import('./test.module/test.module').then((m) => m.ROUTES),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth.module/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipie.module/recipe-routing.module').then(
        (m) => m.RecipeRoutingModule
      ),
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./shopping-list.module/shopping-list-routing.module').then(
        (m) => m.ShoppingListRoutingModule
      ),
  },

  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      /*preloadingStrategy: PreloadAllModules */
    }),
  ],
  // exports: [RouterModule],
})
export class AppRoutingModule {}
