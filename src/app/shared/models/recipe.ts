import { IIngredient } from './ingredient';

export interface IRecipe {
    id: number;
    name: string;
    ingredients: IIngredient[];
    userId: number;
}
