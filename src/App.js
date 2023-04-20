import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import PokemonDetails from './PokemonDetails';
import pokedexLogo from './icons/Pokédex_logo.png';
import favoritePokemonIcon from './icons/PokemonFavoriteIcon.png';
import CreatePokemonForm from './CreatePokemonForm';

function App() {
  
  const [pokemon, setPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  

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


const addToFavorites = async () => {
if (pokemon) {
  const alreadyFavorited = favorites.some(
    (favorite) => favorite.id === pokemon.id
  );
  if (!alreadyFavorited) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const data = await response.json();
    const imageUrl = data.sprites.front_default;
    const newFavorite = { ...pokemon, imageUrl };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }
 }
};

const removeFromFavorites = () => {
  const updatedFavorites = favorites.filter((favorite) => !favorite.checked);
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};




const toggleAllFavorites = () => {
  const allChecked = favorites.length === favorites.filter((favorite) => favorite.checked).length;
  const updatedFavorites = favorites.map((favorite) => ({ ...favorite, checked: !allChecked }));
  setFavorites(updatedFavorites);
};

const toggleFavorite = (index) => {
  const updatedFavorites = [...favorites];
  updatedFavorites[index] = { ...updatedFavorites[index], checked: !updatedFavorites[index].checked };
  setFavorites(updatedFavorites);
};
  


const handleSubmit = (formData) => {
  const { name, height, weight, type, description } = formData;
  setPokemon({
    name: name,
    height: height,
    weight: weight,
    type: type,
    description: description,
    id: Math.floor(Math.random() * 1000000),
  });
};


return (
<div className='App'>

<div className='pokedexSearchBar'>

<div className='pokedexLogo'>
    <h1>
      <img src={pokedexLogo} alt='Pokedex logo' />
    </h1>
</div>

<div className='SearchBar'>    
  <SearchBar
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    handleKeyPress={handleKeyPress}
    search={search}
  />
</div>
</div>

  {pokemon && (

<div className='PokemonDetailsFavButt'>
<div className='PokemonDetails'>
      <PokemonDetails
        pokemon={pokemon}
        favorites={favorites}
        toggleAllFavorites={toggleAllFavorites}
        toggleFavorite={toggleFavorite}
        removeFromFavorites={removeFromFavorites}
      />
</div>
<div className='addToFavorites'>
    <span>Add to Favorites:</span>
      <a href="#" onClick={addToFavorites}>
        <img src={favoritePokemonIcon} alt="Add to Favorites"  />
      </a>
</div>
</div>
)}


      <div className='MakeAPokemon'>
          <p><strong>Make a Pokemon!</strong></p>
          <CreatePokemonForm onSubmit={handleSubmit} />
      </div>
  </div>
 );}

export default App;





