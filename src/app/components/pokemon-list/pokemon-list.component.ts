import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList : Pokemon[] = [];
  pokemonEntryIndex : number = 20
  pokemonNextListUrl : string = "";
  pokemonPrevListUrl : string = "";

  constructor(private pokemonService: PokemonService) {
    pokemonService.getPokemonList()
      .then(res => {
        this.pokemonList = res.results;
        this.pokemonNextListUrl = res.next;
        this.pokemonPrevListUrl = res.previous;
      });
    this.infoPokemon(this.pokemonEntryIndex);
  }

  ngOnInit(): void {
  }

  infoPokemon(index: number) {
    let routePokemonList : string[] = [];
    for(let i = index - 19; i <= index; i++) {
      routePokemonList.push("https://pokeapi.co/api/v2/pokemon/" + i);
    }

    const details = routePokemonList.map(route => axios.get(route));

    Promise.all(details)
      .then(res => res.map(r => r.data))
      .then(data => {
        this.pokemonList.forEach((pokemon, index) => {
          pokemon.img = data[index].sprites.other.dream_world.front_default;
          pokemon.height = data[index].height;
          pokemon.weight = data[index].weight;
        })
      })
  }


  next() {
    this.pokemonService.getNextPokemonList(this.pokemonNextListUrl)
      .then(res => {
        this.pokemonList = res.results;
        this.pokemonNextListUrl = res.next;
        this.pokemonPrevListUrl = res.previous;
        this.pokemonEntryIndex += 20;
        this.infoPokemon(this.pokemonEntryIndex);
      })
  }

  back() {
    this.pokemonService.getPrevPokemonList(this.pokemonPrevListUrl)
      .then(res => {
        this.pokemonList = res.results;
        this.pokemonNextListUrl = res.next;
        this.pokemonPrevListUrl = res.previous;
        this.pokemonEntryIndex -= 20;
        this.infoPokemon(this.pokemonEntryIndex);
      })
  }
}

export interface Pokemon {
  name: string;
  url: string;
  img: string;
  height: number;
  weight: number;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}

export interface Ability2 {
  name: string;
  url: string;
}

export interface Ability {
  ability: Ability2;
}

export interface  Front {
  front_default: string;
}

export interface Other {
  dream_world: Front,
}

export interface Image {
  back_default: string;
  front_default: string;
  other: Other;
}

export interface PokemonInfoResponse {
  abilities: Ability[];
  id: number;
  sprites: Image;
  weight: number;
}

