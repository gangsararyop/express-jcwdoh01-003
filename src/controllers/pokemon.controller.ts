import { NextFunction, Request, Response } from "express";
import PokemonService from "../services/pokemon.service";

export default class PokemonController {
  private pokemonService: PokemonService;

  constructor() {
    this.pokemonService = new PokemonService();
  }

  async getPokemons(req: Request, res: Response, next: NextFunction) {
    try {
      const pokemons = await this.pokemonService.getPokemons();

      res.status(200).json(pokemons);
    } catch (error) {
      next(error);
    }
  }
}
