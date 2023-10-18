import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../../recipe';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    @Input() userRecipes$: Observable<IRecipe[]> = {} as Observable<IRecipe[]>;
    @Output() selectedRecipeEvent: EventEmitter<IRecipe> = new EventEmitter<IRecipe>();
    @Output() editRecipeEvent: EventEmitter<IRecipe> = new EventEmitter<IRecipe>();
    @Output() deleteRecipesEvent: EventEmitter<IRecipe[]> = new EventEmitter<IRecipe[]>();

    checkedRecipes: IRecipe[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    viewRecipeDetails(userRecipe: IRecipe): void {
        this.selectedRecipeEvent.emit(userRecipe);
    }

    updateCheckedRecipes(event: any, userRecipe: IRecipe) {
        if (event.checked) {
            this.checkedRecipes.push(userRecipe);
        } else {
            let index = this.checkedRecipes.findIndex(x => x.id == userRecipe.id);
            if (index != -1) {
                this.checkedRecipes.splice(index, 1);
            }
        }
    }

    editRecipe(recipe: IRecipe) {
        this.editRecipeEvent.emit(recipe);
    }

    deleteRecipes() {
        this.deleteRecipesEvent.emit(this.checkedRecipes);
    }
}
