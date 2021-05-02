import { Injectable } from '@angular/core';
import axios from 'axios';

import { Pokedex, PokedexResponse } from '../components/pokedex/pokedex.component';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor() { }

  getAllPokedex() : Promise<Pokedex[]> {
    return axios.get<PokedexResponse>("https://pokeapi.co/api/v2/pokedex")
      .then(res => res.data.results);
  }

}
