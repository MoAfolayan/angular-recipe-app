import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IRecipe } from '../../recipe';
import { IIngredient } from '../../ingredient';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

    @Input() selectedRecipe: IRecipe = {} as IRecipe;
    @Output() addIngredientEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() editIngredientEvent: EventEmitter<IIngredient> = new EventEmitter<IIngredient>();
    @Output() deleteIngredientEvent: EventEmitter<IIngredient> = new EventEmitter<IIngredient>();
    @Output() deleteIngredientsEvent: EventEmitter<IIngredient[]> = new EventEmitter<IIngredient[]>();

    checkedIngredients: IIngredient[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    updateCheckedIngredients(event: any, ingredient: IIngredient) {
        if (event.checked) {
            this.checkedIngredients.push(ingredient);
        } else {
            let index = this.checkedIngredients.findIndex(x => x.id == ingredient.id);
            if (index != -1) {
                this.checkedIngredients.splice(index, 1);
            }
        }
    }

    addIngredient() {
        this.addIngredientEvent.emit(true);
    }

    editIngredient(ingredient: IIngredient) {
        this.editIngredientEvent.emit(ingredient);
    }

    deleteIngredient(ingredient: IIngredient) {
        this.deleteIngredientEvent.emit(ingredient);
    }

    deleteIngredients(ingredients: IIngredient[]) {
        this.deleteIngredientsEvent.emit(ingredients);
    }
}
