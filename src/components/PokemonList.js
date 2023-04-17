import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/")
      .then(response => {
        setPokemon(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ul>
      {pokemon.map(p => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}

export default PokemonList;
