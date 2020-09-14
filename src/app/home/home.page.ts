import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private searchService : SearchService
  ) {}

  Executar(){
    // this.searchService.getPokemon('ditto').then(data => {
    //   console.log(data);
    // })
  }
}
