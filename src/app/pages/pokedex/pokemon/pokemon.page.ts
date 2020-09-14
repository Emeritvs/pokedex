import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SearchService } from 'src/app/services/search.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  @Input() pokemonId: number;
  private pokemon : any = {};
  private favourited : any = {
    icon: 'star-outline',
    color: 'button-icon'
  };

  constructor(
    private modalController : ModalController,
    private searchService : SearchService,
    private platform : Platform,
    private toastService : ToastService,
    private favouritesService : FavoritesService
  ) {
    this.platform.ready().then(() => {
      this.favouritesService.getAllFavorites().then(favourites => {
        if (favourites != null) {
          favourites.forEach(favourite => {
            if (favourite.id == this.pokemonId) {
              this.favourited.icon = 'star';
              this.favourited.color = 'warning';
            }
          })
        }
      })
    })
  }

  ngOnInit() {
    if (this.pokemonId != undefined && this.pokemonId != null) {
      this.loadPokemon(this.pokemonId);
    }
    else {
      alert('Falha ao carregar Pokemon !');
    }
  }

  async loadPokemon(pokemonId : number){
    this.pokemon =  await this.searchService.getPokemonInfo(pokemonId);

    this.searchService.getPokemonEvolutions(pokemonId).then(res => {
      console.log(res);
    })
  }

  async favoritePokemon(pokemon : any){
    const favourite = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image
    };

    if (this.favourited.icon == 'star') {
      await this.favouritesService.deleteFavourite(favourite.id).then(() => {
        this.favouritesService.getAllFavorites();
        this.favourited.icon = 'star-outline';
        this.favourited.color = 'button-icon';
        this.toastService.presentToast({message: 'Pokémon removido dos favoritos', color: 'primary', position: 'bottom'});
      })
    }
    else if(this.favourited.icon == 'star-outline') {
      await this.favouritesService.setFavourite(favourite).then(() => {
        this.favouritesService.getAllFavorites();
        this.favourited.icon = 'star';
        this.favourited.color = 'warning';
        this.toastService.presentToast({message: 'Pokémon adicionado aos favoritos', color: 'primary', position: 'bottom'});
      })
    }
    else {
      console.error('Falha ao processar favorito');
      return 0;
    }
  }

  closeModal(){
    this.modalController.dismiss(this.favouritesService.getAllFavorites());
  }
}
