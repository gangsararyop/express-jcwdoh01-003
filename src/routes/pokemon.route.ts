import { Router } from "express";
import PokemonController from "../controllers/pokemon.controller";

export default class PokemonRoute {
  public router: Router;

  private pokemonController: PokemonController;

  constructor() {
    this.router = Router();
    this.pokemonController = new PokemonController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    // ==== GET ====
    // /pokemons
    this.router.get(
      "/",
      this.pokemonController.getPokemons.bind(this.pokemonController)
    );
  }
}
