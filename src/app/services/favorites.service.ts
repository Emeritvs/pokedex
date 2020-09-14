import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Favorite } from '../interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private STORAGE_KEY = 'favoritos';

  constructor(
    private storage : Storage
  ) { }

  getAllFavorites() : Promise<Favorite[]> {
    this.storage.get(this.STORAGE_KEY);
    return this.storage.get(this.STORAGE_KEY);
  }

  async setFavourite(pokemon : Favorite) : Promise<any> {
    return this.storage.get(this.STORAGE_KEY).then((favoritos : Favorite[]) => {
      if (favoritos) {
        favoritos.push(pokemon);
        console.log('Adicionando favorito');
        return this.storage.set(this.STORAGE_KEY, favoritos);
      }
      else {
        return this.storage.set(this.STORAGE_KEY, [pokemon]);
      }
    });
  }

  async deleteFavourite(id : number) : Promise<any> {
    return await this.storage.get(this.STORAGE_KEY).then((favoritos : Favorite[]) => {
      console.log(favoritos);

      if (!favoritos || favoritos.length === 0) {
        return null;
      }

      let toKeep : Favorite[] = [];

      for(let i of favoritos) {
        if(i.id !== id){
          toKeep.push(i);
        }
      }

      console.log(toKeep);
      return this.storage.set(this.STORAGE_KEY, toKeep);
    });
  }
}

