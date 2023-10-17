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

    addRecipes(recipes: IRecipe[]): Observable<any> {
        return this.http.post(`${this.recipeUrl}`, recipes);
    }

    editRecipes(recipes: IRecipe[]): Observable<any> {
        return this.http.put(`${this.recipeUrl}`, recipes);
    }

    deleteRecipes(recipes: IRecipe[]): Observable<any> {
        return this.http.post(`${this.recipeUrl}/delete`, recipes);
    }

    addIngredients(ingredients: IIngredient): Observable<any> {
        return this.http.post(`${this.ingredientUrl}`, ingredients);
    }

    editIngredients(ingredients: IIngredient): Observable<any> {
        return this.http.put(`${this.ingredientUrl}`, ingredients);
    }

    deleteIngredients(ingredients: IIngredient): Observable<any> {
        return this.http.post(`${this.ingredientUrl}/delete`, ingredients);
    }
}
