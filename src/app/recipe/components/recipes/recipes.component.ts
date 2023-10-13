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
    @Output() recipesToDeleteEvent: EventEmitter<IRecipe[]> = new EventEmitter<IRecipe[]>();

    recipesToDelete: IRecipe[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    viewRecipeDetails(userRecipe: IRecipe): void {
        this.selectedRecipeEvent.emit(userRecipe);
    }

    updateCheckedRecipes(event: any, userRecipe: IRecipe) {
        if (event.checked) {
            this.recipesToDelete.push(userRecipe);
        } else {
            let index = this.recipesToDelete.findIndex(x => x.id == userRecipe.id);
            if (index != -1) {
                this.recipesToDelete.splice(index, 1);
            }
        }
    }

    deleteSelectedRecipes() {
        this.recipesToDeleteEvent.emit(this.recipesToDelete);
    }

    addNewRecipe() {

    }
}
