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
  private loading : boolean = true;
  private scroll : boolean = true;
  private paginate : boolean = false;
  private noResults : boolean = false;
  private tab : string = "all";
  private showPaginate : boolean = true;

  constructor(
    private pokemonService : SearchService,
    private favouritesService : FavoritesService,
    private platform : Platform,
    private modalController : ModalController
  ) { 
  }

  ngOnInit() {
    if (this.platform.width() < 500) {
      this.colSize = 12;
    }
    else {
      this.colSize = 2;
    }
    
    this.listPokemon(this.pokemonOffset).then(() => {
      this.loading = false;
      this.paginate = true;
    });
    this.pokemonService.getPaginate().then(res => this.pokemonOffsetTotal = res.count / 50);
  }

  ngOnDestroy(){
    this.loadFilter('all');
  }

  async listPokemon(params : number){
    this.showPaginate = true;
    console.log(this.pokemonOffset); // ! Indice para trazer resultados
    this.pokemons = [];

    await this.pokemonService.getAll(params).then(async data => {

      for (let i = 0; i < data.results.length; i++) {
        await this.pokemonService.getPokemonCard(data.results[i].url).then(res => {

          const pokemonCard = {
            id: res['id'],
            name: data.results[i].name,
            image: res['image'],
            url: data.results[i].url,
          };
          
          let alreadyExists = this.pokemons.some(pokemon => pokemon.id === pokemonCard.id);
          if (!alreadyExists) {
            this.pokemons.push(pokemonCard);
          }
          else {
            console.log(`Pokemon com ID: ${pokemonCard.id} já existe!`);
          }
        });
      }

      // data.results.forEach(pokemon => {
      //   this.pokemonService.getPokemonCard(pokemon.url).then(res => {
      //     const pokemonCard = {
      //       id: res['id'],
      //       name: pokemon.name,
      //       image: res['image'],
      //       url: pokemon.url,
      //     };
          
      //     let alreadyExists = this.pokemons.some(pokemon => pokemon.id === pokemonCard.id);
      //     if (!alreadyExists) {
      //       this.pokemons.push(pokemonCard);
      //     }
      //     else {
      //       console.log(`Pokemon com ID: ${pokemonCard.id} já existe!`);
      //     }
      //   })
      // });

      this.filteredPokemons = this.pokemons; // ! Vetor que recebe o objeto resultante das requisições
    });
  }

  async loadFavourites(){
    await this.favouritesService.getAllFavorites().then(favourites => {
      this.favourites = [];

      if (favourites != null && favourites.length > 0) {
        for (let i = 0; i < favourites.length; i++) {
          let alreadyExists = this.favourites.some((pokemon : any) => pokemon.id === favourites[i].id);
  
          if (!alreadyExists) {
            this.favourites.push(favourites[i]);
          }
        }
      }
      else {
        this.filteredPokemons = this.favourites;
        this.tab = "favourites";
      }


      // this.favourites = favourites;
    });
  }

  async loadFilter(params : string){
    if (params == 'favourites') {
      await this.loadFavourites().then(() => {
        this.scroll = false;
        this.paginate = false;
        this.noResults = false;
        this.filteredPokemons = this.favourites;
      });
    }
    else {
      this.tab = "all";
      this.scroll = true;
      this.paginate = true;
      this.noResults = false;
      this.filteredPokemons = this.pokemons;
    }
  }

  async loadMore(params : any){
    this.paginate = false;
    this.loading = true;

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
      this.loading = false;
      this.paginate = true;
    });
  }

  pokemonSearch(event : any) {
    clearTimeout(this.time);
    this.loading = true;
    this.paginate = false;
    this.noResults = false;
    this.filteredPokemons = [];

    this.time = setTimeout(() => {
      this.queryText = event.target.value;

      if (this.queryText == "") {
        this.showPaginate = true;
        this.filteredPokemons = this.pokemons;
        this.loading = false;
        this.paginate = true;
      }
      else {
        const filter = this.queryText.toLowerCase();

        this.pokemonService.getPokemonName(filter).then(res => {
          if (res == 'none') {
            this.loading = false;
            this.noResults = true;
          }
          else {
            this.loading = false;
            this.filteredPokemons.push(res);
          }
        })
      }
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
