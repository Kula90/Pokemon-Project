import React from 'react';

function PokemonDetails({ pokemon }) {
  const { name, id, height, weight, type, description } = pokemon;

  const feet = Math.floor(height * 3.2808);
  const inches = Math.round((height * 3.2808 - feet) * 12);
  const pounds = Math.round(weight * 2.20462);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div>
      <h2>{name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <p>Type: {capitalizedType}</p>
      <p>Height: {feet} ft {inches} in</p>
      <p>Weight: {pounds} lbs</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default PokemonDetails;
