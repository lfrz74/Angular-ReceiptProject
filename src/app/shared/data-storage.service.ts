import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
//Poner Injectable cuando se vaya a consumir un srv dentro de otro srv v
//Se pone esto: {providedIn: 'root'} para no poner el srv en los providers del app.module.ts
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService ) {
        
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://angular-receiptproject-backend-default-rtdb.firebaseio.com/recipes.json', 
                recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://angular-receiptproject-backend-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    //el de arriba es map operator, el de abajo es el map normal de javascript
                    return recipes.map(recipe => {
                        return {
                            ...recipe, 
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
  

}