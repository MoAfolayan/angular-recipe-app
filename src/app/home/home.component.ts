import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IRecipe } from '../recipe/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { AddRecipeDialogComponent } from '../shared/add-recipe-dialog/add-recipe-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    userRecipes$: Observable<IRecipe[]> = {} as Observable<IRecipe[]>;
    user: IUser = {} as IUser;
    selectedRecipe: IRecipe = {} as IRecipe;
    recipesToDelete: IRecipe[] = [];
    checkedRecipes: IRecipe[] = [];

    constructor(
        public auth0Service: AuthService,
        private router: Router,
        private recipeService: RecipeService,
        private userService: UserService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.auth0Service.user$
            .pipe(
            // tap(console.log)
        )
            .subscribe();

        this.userRecipes$ = this.getUserRecipes();
    }

    getUserRecipes(): any {
        return this.userService.getUser()
            .pipe(
                // tap(console.log),
                tap((user: IUser) => this.user = user),
                mergeMap((user: IUser) => {
                    if (user.id) {
                        return this.recipeService.getUserRecipes(user.id);
                    } else {
                        return null;
                    }
                })
            )
    }

    displaySelectedRecipe(event: any): void {
        this.selectedRecipe = event;
    }

    updateCheckedRecipes(event: any) {
        if (event.checked) {
            this.checkedRecipes.push(event.recipe);
        } else {
            let index = this.checkedRecipes.findIndex(x => x.id == event.recipe.id);
            if (index != -1) {
                this.checkedRecipes.splice(index, 1);
            }
        }
    }

    addRecipe(): void {
        const dialogRef = this.dialog.open(AddRecipeDialogComponent, {
            maxWidth: "500px",
            data: {
                title: "Add new recipe",
                recipe: {},
                displayButtons: true,
            }
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                let recipe: IRecipe = { id: 0, name: dialogResult.name, ingredients: null, userId: this.user.id }
                let recipes: IRecipe[] = [];
                recipes.push(recipe);
                this.recipeService.addRecipes(recipes).subscribe();
            }
        });
    }

    editRecipe(event: any): void {
        if (event) {
        }
    }

    deleteRecipes(): void {
        if (this.checkedRecipes.length < 1) {
            this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "500px",
                data: {
                    title: "No recipes selected",
                    message: "You have to select recipes in order to delete them",
                    displayButtons: false
                }
            });
        } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "500px",
                data: {
                    title: "Are you sure?",
                    message: "You are about to delete these recipes",
                    displayButtons: true
                }
            });

            dialogRef.afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    this.recipeService.deleteRecipes(this.checkedRecipes)
                        .subscribe();
                }
            });
        }
    }

    addIngredient(event: any): void {
        if (event) {
        }
    }

    editIngredient(event: any): void {
        if (event) {
        }
    }

    deleteIngredients(event: any): void {
        if (event) {
        }
    }

    logout() {
        this.auth0Service.logout();
        this.router.navigate(['login']);
    }

}
