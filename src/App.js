import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import PokemonDetails from './PokemonDetails';
import pokedexLogo from './icons/Pokédex_logo.png';
import favouritePokemonIcon from './icons/PokemonFavoriteIcon.png';

function App() {
  
  const [pokemon, setPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);



  const search = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
    const data = await response.json();
    setPokemon({
      name: `#${data.id} ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`,
      height: data.height,
      weight: data.weight,
      type: data.types[0].type.name,
      description: '',
      id: data.id,
    });
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    const flavorTextEntries = speciesData.flavor_text_entries;
    const englishFlavorText = flavorTextEntries.find((entry) => entry.language.name === 'en');
    setPokemon((prevState) => ({
      ...prevState,
      description: englishFlavorText.flavor_text,
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const addToFavorites = () => {
    if (pokemon) {
      const alreadyFavorited = favorites.some((favorite) => favorite.id === pokemon.id);
      if (!alreadyFavorited) {
        setFavorites((prevState) => [...prevState, pokemon]);
      }
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevState) => prevState.filter((favorite) => favorite.id !== id));
  };

  return (
    <div className="App">
      <h1>
      <img src={pokedexLogo} alt="Pokedex logo" />
      </h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleKeyPress={handleKeyPress}
        search={search}
      />
      {pokemon && ( 
        <div> <PokemonDetails pokemon={pokemon} />
          <a href="#" onClick={addToFavorites}>
            <img src={favouritePokemonIcon} alt="Add to Favorites" />
          </a>
        </div>
      )}
        <div>
          <h3>Favorites:</h3>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                {favorite.name}{' '}

                <a href="#" onClick={removeFromFavorites}>
<img src=''

                <button onClick={() => removeFromFavorites(favorite.id)}>Remove</button>


              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default App;





