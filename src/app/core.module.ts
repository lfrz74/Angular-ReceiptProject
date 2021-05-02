import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

//The idea is defining here the srvc rather than in providers of app.module.ts
//for having this last file leaner v
@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService, 
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService,
          multi: true
        }
      ] //app level wide
})
export class CoreModule {

}