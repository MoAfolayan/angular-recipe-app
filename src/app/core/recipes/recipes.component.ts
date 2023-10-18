import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../../shared/models/recipe';

interface ICheckedRecipe {
    checked: boolean;
    recipe: IRecipe;
}

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    @Input() userRecipes$: Observable<IRecipe[]> = {} as Observable<IRecipe[]>;
    @Output() selectedRecipeEvent: EventEmitter<IRecipe> = new EventEmitter<IRecipe>();
    @Output() editRecipeEvent: EventEmitter<IRecipe> = new EventEmitter<IRecipe>();
    @Output() updateCheckedRecipesEvent: EventEmitter<ICheckedRecipe> = new EventEmitter<ICheckedRecipe>();

    checkedRecipes: IRecipe[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    viewRecipeDetails(userRecipe: IRecipe): void {
        this.selectedRecipeEvent.emit(userRecipe);
    }

    updateCheckedRecipes(event: any, recipe: IRecipe) {
        let update: ICheckedRecipe = { checked: event.checked, recipe: recipe };
        this.updateCheckedRecipesEvent.emit(update);
    }

    editRecipe(recipe: IRecipe) {
        this.editRecipeEvent.emit(recipe);
    }
}
