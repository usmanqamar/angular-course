import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipie } from '../recipie.model';
import { Ingredient } from '../../shared.module/ingredient.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  async onSubmit() {
    const { name, description, imagePath, ingredients } = this.recipeForm.value;
    const recipe = new Recipie(name, description, imagePath, ingredients);
    this.editMode
      ? this.recipeService.updateRecipe(this.id, recipe)
      : await this.recipeService.addRecipe(recipe);

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private async initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients: any = new FormArray([]);

    if (this.editMode) {
      this.recipeService
        .getRecipe(this.id)
        .subscribe(({ name, imagePath, description, ingredients }) => {
          recipeName = name;
          recipeImagePath = imagePath;
          recipeDescription = description;
          if (ingredients) {
            ingredients.forEach((i: Ingredient) => {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(i.name, Validators.required),
                  amount: new FormControl(i.amount, [
                    Validators.min(1),
                    Validators.required,
                  ]),
                })
              );
            });
          }
          console.log(recipeIngredients);
          this.recipeForm.setValue({
            name,
            description,
            imagePath,
            ingredients,
          });
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.min(1), Validators.required]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  get control() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
