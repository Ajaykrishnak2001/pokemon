import { useState, useEffect } from "react";
import "./pokemon.css";

const NameList = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1); // Default to Bulbasaur (ID: 1)
  const [search, setSearch] = useState("");

  // Fetch Pokémon from API
  const fetchPokemon = async (idOrName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemon(null);
    }
  };

  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  // Function to go to the next Pokémon
  const nextPokemon = () => {
    setPokemonId((prevId) => prevId + 1);
  };

  // Function to go to the previous Pokémon
  const prevPokemon = () => {
    if (pokemonId > 1) {
      setPokemonId((prevId) => prevId - 1);
    }
  };

  // Handle search input
  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchPokemon(search.toLowerCase());
      setSearch("");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Pokémon Explorer</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Pokémon name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {pokemon ? (
        <div className="pokemon-card">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h3>{pokemon.name.toUpperCase()}</h3>
          <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          <p>Stats:</p>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <div className="buttons">
            <button onClick={prevPokemon} disabled={pokemonId === 1}>
              Previous
            </button>
            <button onClick={nextPokemon}>Next</button>
          </div>
        </div>
      ) : (
        <p>Loading Pokémon...</p>
      )}
    </div>
  );
};

export default NameList;
