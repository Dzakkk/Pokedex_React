import React from "react";

const Bag = ({ bag, removePokemon }) => {

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">Your Bag</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {bag.length === 0 ? (
          <p>Bag is empty. Go catch some Pokémon!</p>
        ) : (
          bag.map((pokemon, index) => (
            <div key={index} className="p-4 m-1 bg-white rounded-lg shadow-md flex w-48 flex-col items-center">
              <h2 className="text-xl font-bold text-gray-900 capitalize mb-2">
                {pokemon.alias || pokemon.name}
              </h2>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32 mb-2"
              />
              <div className="flex flex-wrap justify-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-2 py-1 m-1 text-sm text-gray-900 font-medium bg-gray-200 rounded-lg"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <h2 className="text-sm font-semibold text-gray-900 capitalize m-1">
                {parseFloat(pokemon.height / 10).toFixed(1)} m | {parseFloat(pokemon.weight / 10).toFixed(1)} kg
              </h2>
              <button
                onClick={() => removePokemon(pokemon.id)}
                className="p-1 mt-3 border rounded text-sm font-semibold hover:bg-red-600 hover:text-white transition duration-200 text-gray-900 bg-red-400"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bag;
