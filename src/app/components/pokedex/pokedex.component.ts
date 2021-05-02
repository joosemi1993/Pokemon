import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokedexList : Pokedex[] = [];
  pokedexColorList : string[] = [
    "#FFCDD2", "#F8BBD0","#E1BEE7", "#D1C4E9","#C5CAE9", "#BBDEFB","#B3E5FC", "#B2EBF2","#B2DFDB", "#C8E6C9","#DCEDC8", "#F0F4C3","#FFF9C4", "#FFECB3","#FFE0B2", "#FFCCBC","#D7CCC8", "#F5F5F5","#CFD8DC", "#EF9A9A",
  ];

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
