import React from 'react';
import './App.css';


function PokemonDetails({ pokemon, favorites, toggleAllFavorites, toggleFavorite, removeFromFavorites }) {
  const { name, height, weight, type, description } = pokemon;

  const heightInches = Math.round(height * 3.937);
  const feet = Math.floor(heightInches / 12);
  const inches = heightInches % 12;
  const pounds = Math.round(weight * 0.220462);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);


  const removeSelectedFavorites = () => {
    const selectedFavorites = favorites.filter((favorite) => favorite.checked);
    selectedFavorites.forEach((favorite) => removeFromFavorites(favorite.id));
  };



  return (
    <div>
      <h2>{name}</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} className="PokemonDetails-img" />
      <div className="circle">
        <p>Type: {capitalizedType}</p>
        <p>Height: {feet} ft {inches} in</p>
        <p>Weight: {pounds} lbs</p>
        <p>Description: {description}</p>
      </div>
      {favorites.length > 0 && (
        <div>
  <h3>Favorites:</h3>
  <button onClick={toggleAllFavorites}>Select All</button>
  <button onClick={removeSelectedFavorites}>Remove Selected</button>
  <ul>
    {favorites.map((favorite) => (
      <li key={favorite.id}>
        <img src={favorite.imageUrl} alt={favorite.name} />
        {favorite.name}
        <input type="checkbox" checked={favorite.checked} onChange={() => toggleFavorite(favorite.id)} /*style={{display: "none"}}*/ />
      </li>
    ))}
  </ul>
</div>

      )}
    </div>
  );
}

export default PokemonDetails;
