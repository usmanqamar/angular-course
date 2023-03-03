import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared.module/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  imports: [FormsModule, NgIf],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form: NgForm;
  selectedIndex: number | undefined;
  selectedIngredient: Ingredient;
  subscription: Subscription;
  editMode = false;
  constructor(private shoppingService: ShoppingListService) {}

  onAddRecipe(form: NgForm) {
    const { name, amount } = form.value;
    this.editMode
      ? this.shoppingService.updateIngredient(
          this.selectedIndex!,
          new Ingredient(name, amount)
        )
      : this.shoppingService.addToList(name, amount);
    this.onClear();
  }
  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (params) => {
        this.selectedIndex = params;
        this.selectedIngredient = this.shoppingService.getById(
          this.selectedIndex
        );
        this.editMode = true;
        this.form.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount,
        });
      }
    );
  }
  onClear() {
    this.form.reset();
    this.editMode = false;
    this.selectedIndex = undefined;
  }
  onDelete() {
    this.shoppingService.deleteIngredient(this.selectedIndex!);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
