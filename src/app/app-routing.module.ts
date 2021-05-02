import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokedexComponent } from './components/pokedex/pokedex.component'
import { PokedexDetailComponent } from './components/pokedex-detail/pokedex-detail.component';

const routes: Routes = [
  {
    path: "pokedex",
    component: PokedexComponent,
  },
  {
    path: "pokedex/:entry",
    component: PokedexDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
