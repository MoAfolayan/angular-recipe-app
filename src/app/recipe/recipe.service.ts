import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from './recipe';
import { IIngredient } from './ingredient';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private recipeUrl: string = 'https://localhost:5001/api/recipe';
    private ingredientUrl: string = 'https://localhost:5001/api/ingredient';

    constructor(private http: HttpClient) { }

    getUserRecipes(id: number): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(`${this.recipeUrl}/userid/${id}`);
    }

    addRecipe(recipe: IRecipe): Observable<any> {
        return this.http.post(`${this.recipeUrl}`, recipe);
    }

    editRecipe(recipe: IRecipe): Observable<any> {
        return this.http.put(`${this.recipeUrl}`, recipe);
    }

    deleteRecipe(recipe: IRecipe): Observable<any> {
        return this.http.post(`${this.recipeUrl}/delete`, recipe);
    }

    deleteRecipes(recipes: IRecipe[]): Observable<any> {
        return this.http.post(`${this.recipeUrl}/delete-multiple`, recipes);
    }

    addIngredient(ingredient: IIngredient): Observable<any> {
        return this.http.post(`${this.ingredientUrl}`, ingredient);
    }

    editIngredient(ingredient: IIngredient): Observable<any> {
        return this.http.put(`${this.ingredientUrl}`, ingredient);
    }

    deleteIngredient(ingredient: IIngredient): Observable<any> {
        return this.http.post(`${this.ingredientUrl}/delete`, ingredient);
    }

    deleteIngredients(ingredient: IIngredient): Observable<any> {
        return this.http.post(`${this.ingredientUrl}/delete-multiple`, ingredient);
    }
}
