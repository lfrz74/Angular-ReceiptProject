import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  //providers: [RecipeService] //U can put this in app.module.ts, 
  //but here in for sharing just recipes level, not all app
})
export class RecipesComponent implements OnInit {
  
  constructor() { }

  ngOnInit() { }

}
