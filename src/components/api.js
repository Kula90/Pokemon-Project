// This function takes a searchQuery parameter and returns a promise that resolves to a Pokemon object with details about the specified Pokemon
const searchPokemon = async (searchQuery) => {
  
  
// Make a GET request to the PokeAPI with the specified search query (converted to lowercase)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
  
  
// Parse the response JSON data into an object
  const data = await response.json();


// Create a new Pokemon object with the necessary data retrieved from the PokeAPI
  const pokemon = {
    name: `#${data.id} ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`, // Set the name to be the Pokemon's ID number and capitalized name
    height: data.height, // Set the height to be the Pokemon's height in decimeters
    weight: data.weight, // Set the weight to be the Pokemon's weight in hectograms
    type: data.types[0].type.name, // Set the type to be the Pokemon's primary type
    description: '', // Initialize the description to an empty string
    id: data.id, // Set the ID to be the Pokemon's ID number
  };


// Make a GET request to the PokeAPI with the URL provided in the species property of the data object
  const speciesResponse = await fetch(data.species.url);

// Parse the species response JSON data into an object
  const speciesData = await speciesResponse.json();

// Retrieve the flavor text entries array from the species data object
  const flavorTextEntries = speciesData.flavor_text_entries;

// Find the first flavor text entry object in the array with a language property set to English
  const englishFlavorText = flavorTextEntries.find((entry) => entry.language.name === 'en');

// Set the description to be the English flavor text retrieved from the previous step
  pokemon.description = englishFlavorText.flavor_text;

// Return the completed Pokemon object
  return pokemon;
  
};

// Export an object with a property called searchPokemon that contains the searchPokemon function
export default { searchPokemon };
