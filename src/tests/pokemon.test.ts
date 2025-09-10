import request from "supertest";
import nock from "nock";
import App from "../app";

describe("GET /pokemons", () => {
  it("should return an array of pokemons", async () => {
    const mockResponse = {
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      ],
    };

    nock("https://pokeapi.co").get("/api/v2/pokemon").reply(200, mockResponse);

    const response = await request(new App().app).get("/pokemons");

    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockResponse.results);
  });
});
