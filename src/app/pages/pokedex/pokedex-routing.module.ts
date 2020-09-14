import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokedexPage } from './pokedex.page';

const routes: Routes = [
  {
    path: '',
    component: PokedexPage
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pokemon/pokemon.module').then( m => m.PokemonPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexPageRoutingModule {}
