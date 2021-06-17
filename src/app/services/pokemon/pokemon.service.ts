import { Injectable } from '@angular/core';
import axios from 'axios';

import {
  PokemonListResponse,
  Pokemon,
  PokemonListComponent,
  PokemonInfoResponse,
  Image,
  Other
} from '../../components/pokemon-list/pokemon-list.component';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  allPokemonUrl : string = "https://pokeapi.co/api/v2/pokemon";

  constructor() { }

  getPokemonList() {
    return axios.get<PokemonListResponse>(this.allPokemonUrl)
      .then(res => res.data);
  }

  getNextPokemonList(url) {
    return axios.get<PokemonListResponse>(url)
      .then(res => res.data);
  }

  getPrevPokemonList(url) {
    return axios.get<PokemonListResponse>(url)
      .then(res => res.data);
  }

  getPokemonImg(url: string) : Promise<Other> {
    return axios.get<PokemonInfoResponse>(url)
      .then(res => {
        return res.data.sprites.other}
      );
  }
}
