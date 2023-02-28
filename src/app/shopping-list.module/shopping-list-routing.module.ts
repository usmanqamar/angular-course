import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class ShoppingListRoutingModule {}
