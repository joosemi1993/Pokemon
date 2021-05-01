import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokedexList : Pokedex[] = [];

  constructor(private pokedexService: PokedexService) {
    pokedexService.getAllPokedex()
      .then(res => this.pokedexList = res);
  }

  ngOnInit(): void {
  }

}

export interface Pokedex {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  next: string;
  previous?: any;
  results: Pokedex[];
}
