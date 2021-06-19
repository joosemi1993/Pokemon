import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

import { faAngleRight, faAngleLeft, faCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { PokedexService } from '../../services/pokedex/pokedex.service';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.component.html',
  styleUrls: ['./pokedex-detail.component.css']
})
export class PokedexDetailComponent implements OnInit {
  faArrowCircleLeft = faArrowCircleLeft;
  faCircle = faCircle;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  pokedexEntryList: PokemonEntry[] = [];
  pokedexEntryFilteredList : PokemonEntry[] = [];
  pokedexEntryIndex : number = 8;
  speciesRoute: string = "pokemon-species";

  constructor(private pokedexService: PokedexService, private route : ActivatedRoute) {
    this.loadAsync()
  }

  ngOnInit(): void {
  }

  loadAsync = async () => {
    const id = this.route.snapshot.paramMap.get("entry") as string;
    await this.pokedexService.getPokedex(id)
      .then(res => this.pokedexEntryList = res)
      .then(res => this.pokedexEntryFilteredList = res.slice(0, this.pokedexEntryIndex));
    this.infoPokemon();
  }

  async infoPokemon() {
    let routePokemonList : string[] = [];
    let pokemonAuxUrl: string;
    let pokemonUrl: string;

    for(let i = 1; i <= 8; i++) {
      pokemonAuxUrl = this.pokedexEntryFilteredList[i-1].pokemon_species.url;
      pokemonUrl = pokemonAuxUrl?.slice(pokemonAuxUrl?.indexOf(this.speciesRoute) + this.speciesRoute.length + 1);
      routePokemonList.push("https://pokeapi.co/api/v2/pokemon/" + pokemonUrl);
    }

    const details = routePokemonList.map(route => axios.get(route));

    await Promise.all(details)
      .then(res => res.map(r => r.data))
      .then(data => {
        this.pokedexEntryFilteredList.forEach((pokemon, index) => {
          pokemon.image = data[index].sprites.other.dream_world.front_default;
        })
      })
  }

  next() : void {
    this.pokedexEntryFilteredList = this.pokedexEntryList
    .slice(this.pokedexEntryIndex, this.pokedexEntryIndex + 8);
    this.pokedexEntryIndex += 8;
    this.infoPokemon();
  }

  back() : void {
    this.pokedexEntryFilteredList = this.pokedexEntryList
    .slice(this.pokedexEntryIndex - 16, this.pokedexEntryIndex - 8);
    this.pokedexEntryIndex -= 8;
    this.infoPokemon();
  }

}

export interface Language {
  name: string;
  url: string;
}

export interface Description {
  description: string;
  language: Language;
}

export interface Language2 {
  name: string;
  url: string;
}

export interface Name {
  language: Language2;
  name: string;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: PokemonSpecies;
  image: string;
}

export interface SinglePokedex {
  descriptions: Description[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon_entries: PokemonEntry[];
  region?: any;
  version_groups: any[];
}
