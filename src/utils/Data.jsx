import axios from "axios";

export async function Data() {
  try {
    const [pokemonResponse, typeResponse] = await Promise.all([
      axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=386"),
      axios.get("https://pokeapi.co/api/v2/type/")
    ]);

    const pokemonData = await Promise.all(
      pokemonResponse.data.results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;
      })
    );

    const typeData = typeResponse.data.results;

    return { pokemonData, typeData };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
