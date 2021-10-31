import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() selectedRecipe: Recipe = null;

  constructor() { }

  ngOnInit(): void {
  }

}
