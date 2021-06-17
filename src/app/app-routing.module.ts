import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokedexComponent } from './components/pokedex/pokedex.component'
import { PokedexDetailComponent } from './components/pokedex-detail/pokedex-detail.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {
    path: "pokemon",
    component: PokemonListComponent,
  },
  {
    path: "pokedex",
    component: PokedexComponent,
  },
  {
    path: "pokedex/:entry",
    component: PokedexDetailComponent,
  },
  {
    path: "pokemon/:entry",
    component: PokemonDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
