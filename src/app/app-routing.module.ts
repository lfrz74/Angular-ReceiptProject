import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo: '/recipes', 
        pathMatch: 'full'
    },
    { 
        path: 'recipes', 
        //lazy load, download when need it
        loadChildren: './recipes/recipe.module#RecipesModule'
    },
    { 
        path: 'shopping-list', 
        //lazy load, download when need it
        loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
    },
    { 
        path: 'auth', 
        //lazy load, download when need it
        loadChildren: './auth/auth.module#AuthModule'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(
        appRoutes, 
        { 
            //preload the bundles as it's possible, precargar info
            preloadingStrategy: PreloadAllModules 
        }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {

}