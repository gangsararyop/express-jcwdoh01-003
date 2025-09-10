import axios from "axios";

export default class PokemonService {
  async getPokemons() {
    const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");

    return pokemons.data.results;
  }
}
