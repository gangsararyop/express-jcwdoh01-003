"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemon_controller_1 = __importDefault(require("../controllers/pokemon.controller"));
class PokemonRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.pokemonController = new pokemon_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ==== GET ====
        // /pokemons
        this.router.get("/", this.pokemonController.getPokemons.bind(this.pokemonController));
    }
}
exports.default = PokemonRoute;
