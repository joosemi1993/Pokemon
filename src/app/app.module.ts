import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokedexDetailComponent } from './components/pokedex-detail/pokedex-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokedexDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
