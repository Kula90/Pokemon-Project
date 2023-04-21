// Importing necessary modules and components
import React, { useState } from 'react';  // Importing React and useState hook
import './App.css';  // Importing App styling
import SearchBar from './components/SearchBar';  // Importing SearchBar component
import PokemonDetails from './components/PokemonDetails';  // Importing PokemonDetails component
import pokedexLogo from './icons/Pokédex_logo.png';  // Importing pokedexLogo image
import favoritePokemonIcon from './icons/PokemonFavoriteIcon.png';  // Importing favoritePokemonIcon image
import CreatePokemonForm from './components/CreatePokemonForm';  // Importing CreatePokemonForm component
import api from './components/api';  // Importing api module


// Defining the main component of the application
function App() {

// Defining initial states using the useState hook
  const [pokemon, setPokemon] = useState(null);  // storing the current Pokemon data, which we initialize as null.
  const [searchQuery, setSearchQuery] = useState('');  // storing the current search query, which we initialize as an empty string.
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []  // storing the list of user-favorited Pokemon, which we initialize with any favorites stored in local storage or an empty array.
  );


// Async function that searches for a Pokemon
  const search = async () => {  // Declaring an async function called "search"
    const pokemon = await api.searchPokemon(searchQuery);  // Searching for a Pokemon with the searchQuery using the api module
    setPokemon(pokemon);  // Updating the "pokemon" state with the result of the search
  };


// Function that handles the Enter keypress event
const handleKeyPress = (event) => {  // Declaring a function called "handleKeyPress" that takes an event as a parameter
  if (event.key === 'Enter') {  // If the event is a key press of the "Enter" key...
    search();  // Call the search function
  }
};


// Function that adds a Pokemon to favorites
const addToFavorites = async () => {  // Declaring an async function called "addToFavorites"
if (pokemon) {  // If "pokemon" state exists...
  const isCreatedPokemon = pokemon.id > 800; // Check whether the current Pokemon is created using the CreatePokemonForm
  const alreadyFavorited = favorites.some(
    (favorite) => favorite.id === pokemon.id
  );  // Check if the current "pokemon" state is already in the "favorites" state
  if (!alreadyFavorited) {  // If it's not already favorited...
    if (isCreatedPokemon) {
      const newFavorite = {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        description: pokemon.description,
        height: pokemon.height,
        weight: pokemon.weight,
        imageUrl: pokemon.imageUrl,
      };  // Create a new favorite object with the data entered in the CreatePokemonForm
      const updatedFavorites = [...favorites, newFavorite];  // Add the new favorite to the "favorites" array using the spread operator
      setFavorites(updatedFavorites);  // Update the "favorites" state with the new array
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Store the updated "favorites" array in local storage
    } else {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);  // Fetch data for the current "pokemon" using the PokeAPI
    const data = await response.json();  // Convert the response to JSON
    const imageUrl = data.sprites.front_default;  // Set the image URL to the front_default sprite URL from the response
    const newFavorite = { ...pokemon, imageUrl };  // Create a new favorite object with the "pokemon" and "imageUrl" properties
    const updatedFavorites = [...favorites, newFavorite];  // Add the new favorite to the "favorites" array using the spread operator
    setFavorites(updatedFavorites);  // Update the "favorites" state with the new array
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Store the updated "favorites" array in local storage
  }
 }
}
};


// Function that removes a Pokemon from favorites
const removeFromFavorites = () => {
  // Using the filter() method to create a new array of favorites that do not have the 'checked' property set to true
  const updatedFavorites = favorites.filter((favorite) => !favorite.checked);
  // Updating the state with the new array of favorites
  setFavorites(updatedFavorites);
  // Storing the updated array of favorites in local storage
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};



// Function that toggles all Pokemon as favorites
const toggleAllFavorites = () => {
// Using the Array filter method to get all checked favorites and checking if they are equal to the length of favorites array
  const allChecked = favorites.length === favorites.filter((favorite) => favorite.checked).length;
// Using the Array map method to create a new array of objects with the checked property of each favorite set to the opposite of allChecked
  const updatedFavorites = favorites.map((favorite) => ({ ...favorite, checked: !allChecked }));
// Updating the state of favorites with the updatedFavorites array
  setFavorites(updatedFavorites);
};



// Function that toggles a single Pokemon as a favorite
const toggleFavorite = (index) => {
// Copying the favorites array using the spread operator
  const updatedFavorites = [...favorites];
// Updating the favorite at the specified index by creating a new object with the same properties as the original object using the spread operator and setting the 'checked' property to the opposite of its current value
  updatedFavorites[index] = { ...updatedFavorites[index], checked: !updatedFavorites[index].checked };
// Updating the state of the favorites array with the updated array
  setFavorites(updatedFavorites);
};

  

// Function that handles form submission to create a new Pokemon
const handleSubmit = (formData) => {
// Destructure form data into individual variables
  const { name, height, weight, type, description } = formData;
// Update the `pokemon` state with the new Pokemon's details
  setPokemon({
    name: name,  // Set the name
    height: height,  // Set the height
    weight: weight,  // Set the weight
    type: type,  // Set the type
    description: description,  // Set the description
    id: Math.floor(Math.random() * 1000000),  // Generate a random ID for the new Pokemon
  });
};


// Rendering the UI components
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
          <span><strong><u>Make a Pokemon!</u></strong></span>
          <CreatePokemonForm onSubmit={handleSubmit} />
      </div>
  </div>

 );}

export default App;





