import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Platform, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { PokemonPage } from 'src/app/pages/pokedex/pokemon/pokemon.page'
import { Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private pokemons : any = [];
  private favourites : any = [];
  private filteredPokemons : any = [];
  private pokemonOffset : number = 0;
  private pokemonOffsetTotal : number = 0;
  private queryText : string;
  private colSize : number = 2;
  public scrollAuto:boolean = false;
  public selecionarItem:boolean;
  private time : any = null;
  private loading : boolean = false;
  private scroll : boolean = true;
  private showPaginate : boolean = true;

  constructor(
    private pokemonService : SearchService,
    private favouritesService : FavoritesService,
    private platform : Platform,
    private modalController : ModalController
  ) { 
    this.platform.ready().then(() => {
      this.loadFavourites();
    });
  }

  ngOnInit() {
    if (this.platform.width() < 500) {
      this.colSize = 12;
    }
    else {
      this.colSize = 2;
    }
    
    this.listPokemon(this.pokemonOffset);
    this.pokemonService.getPaginate().then(res => this.pokemonOffsetTotal = res.count / 50);
  }

  ngOnDestroy(){
    this.loadFilter('all');
  }

  async listPokemon(params : number){
    this.showPaginate = true;
    console.log(this.pokemonOffset); // ! Indice para trazer resultados
    this.pokemons = [];

    (await this.pokemonService.getAll(this.pokemonOffset)).subscribe(res => {
      this.pokemons = res;
      this.filteredPokemons = this.pokemons;
    });

    // await this.pokemonService.getAll(params).then(data => {
    //   data.results.forEach(pokemon => {
    //     this.pokemonService.getPokemonCard(pokemon.url).then(res => {
    //       const pokemonCard = {
    //         id: res['id'],
    //         name: pokemon.name,
    //         image: res['image'],
    //         url: pokemon.url,
    //       };
          
    //       let alreadyExists = this.pokemons.some(pokemon => pokemon.id === pokemonCard.id);
    //       if (!alreadyExists) {
    //         this.pokemons.push(pokemonCard);
    //       }
    //       else {
    //         console.log(`Pokemon com ID: ${pokemonCard.id} já existe!`);
    //       }
    //     })
    //   });

    //   this.filteredPokemons = this.pokemons; // ! Vetor que recebe o objeto resultante das requisições
    // });
  }

  async loadFavourites(){
      this.favouritesService.getAllFavorites().then(favourites => {
        this.favourites = favourites;
      })
  }

  async loadFilter(params : string){
    if (params == 'favourites') {
      await this.loadFavourites().then(() => {
        this.showPaginate = false;
        this.filteredPokemons = this.favourites;
      })
    }
    else {
      this.showPaginate = true;
      this.filteredPokemons = this.pokemons;
    }
  }

  async loadMore(params : any){
    if (params == 'next') {
      this.pokemonOffset >= 1050 ? this.pokemonOffset =  1050 : this.pokemonOffset+= 50;
    }
    else {
      this.pokemonOffset-= 50;

      if (this.pokemonOffset < 0) {
        this.pokemonOffset = 0;
      }

      this.pokemonOffset <= 0 ? this.pokemonOffset = 0 : this.pokemonOffset-= 50;
    }

    await this.listPokemon(this.pokemonOffset).then(() => {
      // event.target.complete();
      // console.log(this.pokemonOffset)
    });
  }

  pokemonSearch(event : any) {
    clearTimeout(this.time);
    this.loading = true;
    this.showPaginate = false;
    this.filteredPokemons = [];

    this.time = setTimeout(() => {
      this.queryText = event.target.value;

      if (this.queryText == "") {
        this.showPaginate = true;
        this.filteredPokemons = this.pokemons;
      }
      else {
        // const filter = this.queryText.toUpperCase();
        const filter = this.queryText.toLowerCase();

        this.pokemonService.getPokemonName(filter).then(res => {
          res == 'none' ? this.filteredPokemons = this.filteredPokemons : this.filteredPokemons.push(res);
        })
  
        // this.filteredPokemons = this.pokemons.filter((pokemon : any) => {
        //   if (pokemon.name != undefined && pokemon.name != '') {
        //     for (let i = 0; i < pokemon.name.length; i++) {
        //       let pokemonName = pokemon.name || ' ';
            
        //       if (pokemonName.toUpperCase().indexOf(filter) > -1) {
        //         return pokemon.name;
        //       }
        //     }
        //   }
        //   else {
        //     console.log(`Pokemon ${pokemon.id} sem nome !`);
        //   }
        // });
      }
      this.loading = false;
    }, 1000);
  }

  async viewPokemon(id : string) {
    const modal = await this.modalController.create({
      component: PokemonPage,
      componentProps: { pokemonId: id }
    });
    return await modal.present();
  }
}
