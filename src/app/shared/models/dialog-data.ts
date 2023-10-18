import { IRecipe } from "./recipe";

export interface DialogData {
    title: string;
    message: string;
    recipe: IRecipe;
    displayButtons: boolean;
}