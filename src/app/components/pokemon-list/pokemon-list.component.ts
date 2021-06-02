import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList : Pokemon[] = [];
  pokemonImgList : string[] = [];
  pokemonNextListUrl : string = "";
  pokemonPrevListUrl : string = "";

  

  constructor(private pokemonService: PokemonService) {
    pokemonService.getPokemonList()
      .then(res => {
        this.pokemonList = res.results;
        this.pokemonNextListUrl = res.next;
        this.pokemonPrevListUrl = res.previous;
      });
  }

  ngOnInit(): void {
    this.pokemonList.forEach(pokemon => {
      console.log(pokemon)
      this.pokemonService.getPokemonImg(pokemon.url)
        .then(res => {
          this.pokemonImgList.push(res.back_default)
        })
    });
  }

  next() {
    this.pokemonService.getNextPokemonList(this.pokemonNextListUrl)
      .then(res => {
        this.pokemonList = res.results;
        this.pokemonNextListUrl = res.next;
        this.pokemonPrevListUrl = res.previous;
      })
  }

  back() {
    this.pokemonService.getPrevPokemonList(this.pokemonPrevListUrl)
      .then(res => {
        this.pokemonList = res.results;
        this.pokemonNextListUrl = res.next;
        this.pokemonPrevListUrl = res.previous;
      })
  }
}

export interface Pokemon {
  name: string;
  url: string;
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

export interface Image {
  back_default: string;
}

export interface PokemonInfoResponse {
  abilities: Ability[];
  id: number;
  sprites: Image;
  weight: number;
}

