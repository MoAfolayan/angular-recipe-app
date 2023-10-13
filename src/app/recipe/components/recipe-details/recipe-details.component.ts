import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IRecipe } from '../../recipe';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

    @Input() selectedRecipe: IRecipe = {} as IRecipe;
    @Output() editEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    editRecipe() {
        this.editEvent.emit(true);
    }

    deleteRecipe() {
        this.deleteEvent.emit(true);
    }
}
