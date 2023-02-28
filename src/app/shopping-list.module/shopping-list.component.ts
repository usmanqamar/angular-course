import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared.module/ingredient.model';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingListService) {}
  private subscription: Subscription;
  ngOnInit() {
    this.ingredients = this.shoppingService.getList();
    this.subscription = this.shoppingService.ingredientAdded.subscribe(
      (data: Ingredient[]) => (this.ingredients = data)
    );
  }
  onSelect(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
