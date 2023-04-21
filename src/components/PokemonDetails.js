// Import the necessary packages and components
import React from 'react';
import '/root/sei/projects/pokemon-project/src/App.css';

// Define the PokemonDetails component with props
function PokemonDetails({ pokemon, favorites, toggleAllFavorites, toggleFavorite, removeFromFavorites }) {

  // Destructure the necessary values from the pokemon object
  const { name, height, weight, type, description } = pokemon;

  // Calculate the height and weight in the appropriate units
  const heightInches = Math.round(height * 3.937);  // Convert height from meters to inches
  const feet = Math.floor(heightInches / 12);  // Calculate feet from inches
  const inches = heightInches % 12;  // Calculate remaining inches
  const pounds = Math.round(weight * 0.220462);  // Convert weight from kilograms to pounds

  // Capitalize the first letter of the type
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

// Define a function to remove all favorites
  const removeAllFavorites = () => {
    toggleAllFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };


  // Define a function to remove selected favorites
  const removeSelectedFavorites = () => {
    // Filter the favorites list to only include checked favorites
    const selectedFavorites = favorites.filter((favorite) => favorite.checked);
    // Remove each selected favorite
    selectedFavorites.forEach((favorite) => removeFromFavorites(favorite.id));
  };

  // Return the JSX for the PokemonDetails component
  return (
    <div>
  
      <h2>{name}</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} className="PokemonDetails-img" />
  
      <div className="circle">
        <p><strong>Type:</strong> {capitalizedType}</p>
        <p><strong>Height:</strong> {feet} ft {inches} in</p> 
        <p><strong>Weight:</strong> {pounds} lbs</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
  
      {favorites.length > 0 && ( 
        <div>
          <h3>Favorites:</h3>
          
          <button onClick={toggleAllFavorites}>Select All</button>
          
          <button onClick={removeSelectedFavorites}>Remove Selected</button>

          <button onClick={removeAllFavorites}>Remove All Favorites</button>


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

// Export the PokemonDetails component
export default PokemonDetails;
