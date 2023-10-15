import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from './recipe';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private recipeUrl: string = 'https://localhost:5001/api/recipes';

    constructor(private http: HttpClient) { }

    getUserRecipes(id: number): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(`${this.recipeUrl}/userid/${id}`);
    }

    deleteRecipes(recipesToDelete: IRecipe[]): Observable<any> {
        return this.http.post(`${this.recipeUrl}/delete-multiple`, recipesToDelete);
    }

    deleteRecipe(recipeToDelete: IRecipe): Observable<any> {
        return this.http.post(`${this.recipeUrl}/delete`, recipeToDelete);
    }
}
