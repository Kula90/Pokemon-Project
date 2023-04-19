import React from 'react';

function PokemonDetails({ pokemon }) {
  const { name, id, height, weight, type, description } = pokemon;

  const heightInches = Math.round(height * 39.37); // fix this!!
  const feet = Math.floor(heightInches / 12);// fix this!!
  const inches = heightInches % 12;// fix this!!
  const pounds = Math.round(weight * 2.20462);// fix this!!
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div>
      <h2>{name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <div className="circle">
        <p>Type: {capitalizedType}</p>
        <p>Height: {feet} ft {inches} in</p>
        <p>Weight: {pounds} lbs</p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
}

export default PokemonDetails;
