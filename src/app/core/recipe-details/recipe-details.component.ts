import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IRecipe } from '../../shared/models/recipe';
import { IIngredient } from '../../shared/models/ingredient';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

    @Input() selectedRecipe: IRecipe = {} as IRecipe;
    @Output() editIngredientEvent: EventEmitter<IIngredient> = new EventEmitter<IIngredient>();

    constructor() { }

    ngOnInit(): void {
    }

    editIngredient(ingredient: IIngredient) {
        this.editIngredientEvent.emit(ingredient);
    }
}
