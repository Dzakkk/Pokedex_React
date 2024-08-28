import React, { useState } from "react";
import Modal from "./Modal";

const Card = ({ pokemon, types, onCatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveAlias = (alias) => {
    const finalName = alias ? alias : pokemon.name;
    onCatch(pokemon, finalName);
  };

  return (
    <div className="p-4 m-1 bg-white rounded-lg shadow-md flex w-48 flex-col items-center">
      <h2 className="text-xl font-bold text-gray-900 capitalize mb-2">{pokemon.id}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 mb-2" />
      <h2 className="text-xl font-bold text-gray-900 capitalize mb-2">{pokemon.name}</h2>
      <div className="flex flex-wrap justify-center">
        {pokemon.types.map((type) => (
          <span key={type.type.name} className="px-2 py-1 m-1 text-sm text-gray-900 font-medium bg-gray-200 rounded-lg">
            {type.type.name}
          </span>
        ))}
      </div>
      <h2 className="text-sm font-semibold text-gray-900 capitalize m-1">{parseFloat(pokemon.height / 10).toFixed(1)} m | {parseFloat(pokemon.weight / 10).toFixed(1)} kg</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="p-1 mt-3 border rounded text-sm font-semibold hover:bg-gray-800 hover:text-gray-200 transition duration-200 text-gray-900 bg-gray-400"
      >
        Catch
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAlias}
      />
    </div>
  );
};

export default Card;
