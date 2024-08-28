import React, { useEffect, useState } from "react";
import { Data } from "./../utils/Data";
import Card from "./Card";
import Search from "./Search";
import Bag from "./Bag";
import Filter from "./Filter";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [bag, setBag] = useState([]);
  const [view, setView] = useState("pokedex");

  useEffect(() => {
    async function loadData() {
      try {
        const { pokemonData, typeData } = await Data();
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
        setTypes(typeData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSearch = (searchTerm) => {
    filterPokemons(searchTerm, selectedType);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterPokemons('', type);
  };

  const filterPokemons = (searchTerm, type) => {
    let filtered = pokemons;
    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (type) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === type)
      );
    }
    setFilteredPokemons(filtered);
  };

  const handleCatch = (pokemon, alias) => {
    setBag([...bag, { ...pokemon, alias }]);
  };

  const removePokemonFromBag = (id) => {
    setBag(bag.filter((pokemon) => pokemon.id !== id));
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="px-auto pt-3">
      <h1 className="text-5xl text-center font-bold mb-4">Pokédex</h1>
      <div className="flex justify-around mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setView("pokedex")}
        >
          Show Pokédex
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setView("bag")}
        >
          Show Bag
        </button>
      </div>

      {view === "pokedex" ? (
        <>
          <div className="flex justify-center gap-4 mb-4">
            <Search onSearch={handleSearch} />
            <Filter types={types} onTypeChange={handleTypeChange} />
          </div>

          <div className="flex justify-center flex-wrap gap-1 mb-6">
            {filteredPokemons.length === 0 ? (
              <p>No Pokémon found</p>
            ) : (
              filteredPokemons.map((pokemon) => (
                <Card
                  key={pokemon.name}
                  pokemon={pokemon}
                  types={types}
                  onCatch={handleCatch}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <Bag bag={bag} removePokemon={removePokemonFromBag} />
      )}
    </div>
  );
};

export default Pokedex;
