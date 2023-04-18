import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import PokemonDetails from './PokemonDetails';

function App() {
  
  const [pokemon, setPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="App">
      <h1>Pokemon Search</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleKeyPress={handleKeyPress}
        search={search}
      />
      {pokemon && <PokemonDetails pokemon={pokemon} />}
    </div>
  );
}

export default App;





