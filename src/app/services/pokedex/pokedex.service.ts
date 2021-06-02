import { Injectable } from '@angular/core';
import axios from 'axios';

import { Pokedex, PokedexResponse } from '../../components/pokedex/pokedex.component';
import { PokemonEntry, SinglePokedex } from '../../components/pokedex-detail/pokedex-detail.component';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  allPokedexUrl : string = "https://pokeapi.co/api/v2/pokedex";
  singlePokedexUrl : string = "https://pokeapi.co/api/v2/pokedex/";

  constructor() { }

  getAllPokedex() : Promise<Pokedex[]> {
    return axios.get<PokedexResponse>(this.allPokedexUrl)
      .then(res => res.data.results);
  }

  getPokedex(name: string) : Promise<PokemonEntry[]> {
    return axios.get<SinglePokedex>(this.singlePokedexUrl + name)
      .then(res => res.data.pokemon_entries)
  }
}
