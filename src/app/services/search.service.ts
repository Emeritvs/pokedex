import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private urlRoot : string = 'https://pokeapi.co/api/v2';

  constructor(
    private http : HttpClient
  ) { }

  async getAll(offset : number){
    return await axios.get(`${this.urlRoot}/pokemon?limit=50&offset=${offset}`)
    .then(res => {
      console.log(res.data);
      return res.data
    });

    // return this.http.get(`${this.urlRoot}/pokemon?limit=100&offset=${offset}`).pipe(
    //   map(result => {
    //     const temp = [];

    //     result['results'].map(pokemon => {

    //       let oi = {};

    //       this.getPokemonImage(pokemon.name).subscribe(res => {
    //         temp.push({
    //           id: res.id,
    //           name: pokemon.name,
    //           image: res.image,
    //           url: pokemon.url
    //         })
    //       });
    //     })


    //     return temp;
    //   })
    // )

  }

  getPokemonImage(pokemon : string){
    return this.http.get(`${this.urlRoot}/pokemon/${pokemon}`).pipe(
      map(result => {
        const dados = {
          id: result['id'],
          image: result['sprites'].front_default
        };

        return dados;
      })
    )
  }

  getPaginate(){
    return axios.get(`${this.urlRoot}/pokemon/`).then(res => {
      const dados = {
        count: res.data.count
      };

      return dados;
    })
  }

  getPokemons(offset : any){
    return axios.get(`${this.urlRoot}/pokemon?limit=200&offset=${offset}`)
    .then(res => res.data);
  }

  getPokemonCard(pokemonUrl : string) {
    return axios.get(`${pokemonUrl}`)
    .then((res) => {
      const data = {
        id: res.data.id,
        image: res.data.sprites.front_default
      };

      return data;
    })
    .catch((error) => console.log(error));
  }

  getPokemonInfo(pokemonId : number){
    return axios.get(`${this.urlRoot}/pokemon/${pokemonId}`)
    .then((res) => {
      const dados = {
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default,
        types: res.data.types,
        height: res.data.height,
        weight: res.data.weight,
        stats: {
          hp: res.data.stats[0].base_stat,
          atk: res.data.stats[1].base_stat,
          def: res.data.stats[2].base_stat,
          xatk: res.data.stats[3].base_stat,
          xdef: res.data.stats[4].base_stat,
          spd: res.data.stats[5].base_stat
        }
      };

      return dados;
    });
  }

  getPokemonName(pokemonName : string){
    return axios.get(`${this.urlRoot}/pokemon/${pokemonName}`)
    .then((res) => {
      const dados = {
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default,
        types: res.data.types,
        height: res.data.height,
        weight: res.data.weight,
        stats: {
          hp: res.data.stats[0].base_stat,
          atk: res.data.stats[1].base_stat,
          def: res.data.stats[2].base_stat,
          xatk: res.data.stats[3].base_stat,
          xdef: res.data.stats[4].base_stat,
          spd: res.data.stats[5].base_stat
        }
      };

      return dados;
    }).catch(() => {
      return "none";
    })
  }

  getPokemonEvolutions(pokemonId : number){
    return axios.get(`${this.urlRoot}/evolution-chain/${pokemonId}/`)
    .then(res => {
      const dados = {
        chain: res.data.chain
      };

      return dados;
    });
  }

}
