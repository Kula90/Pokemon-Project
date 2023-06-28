# <u>Pokemon-Pokedex</u> #

## <u>Description</u> ##

My Pokemon project involves creating an API using React that organizes a dataset of Pokemon. Basically, I'm making a website where people can search for their favorite Pokemon and save them to their favorites.

To do this, I'll need to use a dataset that has information about all the different Pokemon, like their names, types, height, weight, and desciption. Then, I'll design an API that lets people search for Pokemon based on things like their name or type. I'll also create a way for people to save their favorite Pokemon so they can easily find them again later.

Overall, I'm making a really cool website that lets people interact with Pokemon data in a fun and user-friendly way!

## <u> User stories </u> ##

As a user of the Pokédex app, I want to be able to search for Pokémon by their name or Pokédex number, so that I can easily access their information and learn more about them.

As a user, I also want the app to display each Pokémon's name, image, weight, height, and description, so that I can easily visualize and learn about their characteristics.

As a user, I want the ability to add my favorite Pokémon to a favorites section within the app, so that I can easily access and review information about them whenever I want.

As a user, I want the ability to create my own Pokémon and add them to my collection within the app. This feature should allow me to select the Pokémon's name, type, image, weight, height, and description, so that I can customize the characteristics of my own unique Pokémon.

As a user, I expect the app to be user-friendly and intuitive, with a simple interface that is easy to navigate and use.

## <u>Deployment link</u> ##

The Project is now live and can be accessed without any specific requirements.

<li>Git repository: https://github.com/Kula90/Pokemon-Project</li>
<li>Pokemon-Pokedex-Project:<mark>LINK HERE</mark></li>

## <u>Installation</u> ##

You don't need to install anything to use this app. All you need is a web browser that supports JavaScript and an internet connection.

## <u>Technologies used</u> ##

<li> React </li>
<li> CSS </li>
<li> Javascript </li>
<li> HTML </li>
<br></br>

# Approach
## <u>Planning</u> ##

Before diving into the design process of my project, I took some time to plan it out properly. To begin, I created a preliminary low-fidelity wireframe to sketch out a rough outline of the design. This allowed me to visualize the overall structure and layout of the game, which was essential for creating a clear vision of what the finished product would look like.

I used multiple methods to plan out the structure and functionality of the API. One of these methods involved writing pseudocode, which helped me to outline andorganize the different components and functions of the API. By creating a structured representation of the code, I was able to better visualize how the various elements of the API would interact and work together.

In addition to creating wireframes, utilizing pseudocode was an effective way for me to stay organized and focused throughout the development process. This technique helped me to track my progress, make any necessary adjustments, and ensure that the final product met the requirements and expectations. Ultimately, combining these planning techniques resulted in a more streamlined and efficient development process.

## <u>Pseudocode</u> ##

Please take a look at the pseudocode I have created for my project.
```js
FUNCTION search_pokemon(pokedex, name):
    FOR each pokemon in pokedex:
        IF pokemon.name == name:
            RETURN pokemon
    RETURN null

FUNCTION add_to_favorites(pokemon):
    ADD pokemon TO favorites_list

FUNCTION remove_from_favorites(pokemon):
    REMOVE pokemon FROM favorites_list

FUNCTION display_pokemon_info(pokemon):
    PRINT "Name: " + pokemon.name
    PRINT "Type: " + pokemon.type
    PRINT "Height: " + pokemon.height
    PRINT "Weight: " + pokemon.weight
    PRINT "Description: " + pokemon.description

FUNCTION generate_random_pokemon():
    CREATE pokemon
    SET pokemon.name = random_name
    SET pokemon.type = random_type
    SET pokemon.height = random_height
    SET pokemon.weight = random_weight
    SET pokemon.description = random_description
    RETURN pokemon

START:
    CREATE pokedex
    CREATE favorites_list
    WHILE true:
        PRINT "Enter a Pokemon name to search, 'generate' for a random Pokemon:"
        READ user_input
        IF user_input == "generate":
            pokemon = generate_random_pokemon()
            display_pokemon_info(pokemon)
            PRINT "Add to favorites? (y/n)"
            READ add_favorite
            IF add_favorite == "y":
                add_to_favorites(pokemon)
        ELSE:
            pokemon = search_pokemon(pokedex, user_input)
            IF pokemon != null:
                display_pokemon_info(pokemon)
                PRINT "Add to favorites? (y/n)"
                READ add_favorite
                IF add_favorite == "y":
                    add_to_favorites(pokemon)
            ELSE:
                PRINT "Pokemon not found."
```

## <u>Wireframes</u> ##

Here are the wireframes I made for my project.

### <u>Low fidelity wireframe:</u> ###
![alt text](./src/Wireframes/Group%201.png)
![alt text](./src/Wireframes/Group%202.png)
![alt text](./src/Wireframes/Group%203.png)


# Build process

The code provided represents different components and functionality for the Pokémon Pokédex. Let's go through each section to understand what each component does and how they contribute to the overall functionality of the application.

## About

The `About` component provides information about the Pokémon application. It displays a simple message on the About page.

**About.js**

```js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Page</h1>
      <p>This is the About page of my Pokémon application.</p>
    </div>
  );
}

export default About;
```

**About.css**

```css
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
```

## API
The `api.js` file contains a function called searchPokemon that interacts with the PokeAPI to retrieve details about a specific Pokémon. The function takes a searchQuery parameter and returns a promise that resolves to a Pokémon object with the specified Pokémon's details.

**api.js**

```js
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
```
## Create Pokémon Form
The CreatePokemonForm component allows users to create their own Pokémon. It provides a form where users can enter the Pokémon's name, type, height, weight, description, and image. When the form is submitted, the onSubmit prop is called with the Pokémon object as an argument.

**CreatePokemonForm.js**

```js
import React, { useState } from 'react';
import './CreatePokemonForm.css';

function CreatePokemonForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [height, setHeight] = useState({ feet: 0, inches: 0 });
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalInches = height.feet * 12 + height.inches;
    const pounds = weight * 2.20462;
    const pokemon = { name, type, height: totalInches, weight: pounds, description };
    onSubmit(pokemon);
    setName('');
    setType('');
    setHeight({ feet: 0, inches: 0 });
    setWeight(0);
    setDescription('');
    setImage('');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
      </label>

      <br />

      <label>
        Type:
        <select value={type} onChange={(event) => setType(event.target.value)} required>
          <option value="">--Please choose a type--</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <!-- More options... -->
        </select>
      </label>

      <br />

      <label>
        Height (ft):
        <input
          type="number"
          value={height.feet}
          onChange={(event) => setHeight({ ...height, feet: parseInt(event.target.value) })}
          required
        />
        (in):
        <input
          type="number"
          value={height.inches}
          onChange={(event) => setHeight({ ...height, inches: parseInt(event.target.value) })}
          required
        />
      </label>

      <br />

      <label>
        Weight (lbs):
        <input type="number" value={weight} onChange={(event) => setWeight(parseInt(event.target.value))} required />
      </label>

      <br />

      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
      </label>

      <br />

      <label>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>

      <br />

      <button type="submit">Create your Pokémon</button>
    </form>
  );
}

export default CreatePokemonForm;
```



# Screenshots
Include relevant screenshots of the code and visuals of the project here.


## Navigation

The Navigation component displays a navigation bar with links to different pages of the Pokémon application, including Home, About, and Contact.

**Navigation.js**

```js
import React from 'react';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;
```

## Pokémon Details
The PokemonDetails component displays detailed information about a Pokémon, including its name, image, type, height, weight, and description. Users can also manage their favorite Pokémon by selecting or removing them.

**PokemonDetails.js**

```js
import React from 'react';
import './PokemonDetails.css';

function PokemonDetails({ pokemon, favorites, toggleAllFavorites, toggleFavorite, removeFromFavorites }) {
  const { name, height, weight, type, description } = pokemon;
  const heightInches = Math.round(height * 3.937);
  const feet = Math.floor(heightInches / 12);
  const inches = heightInches % 12;
  const pounds = Math.round(weight * 0.220462);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const removeAllFavorites = () => {
    toggleAllFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  const removeSelectedFavorites = () => {
    const selectedFavorites = favorites.filter((favorite) => favorite.checked);
    selectedFavorites.forEach((favorite) => removeFromFavorites(favorite.id));
  };

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

                <input type="checkbox" checked={favorite.checked} onChange={() => toggleFavorite(favorite.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
```

## Search Bar
The SearchBar component provides a search input field and a search button for users to search for Pokémon by name or number.

**SearchBar.js**

```js
import React from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, setSearchQuery, search }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Pokemon name or #"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar;
```

# App.js

## Importing necessary modules and components
The code begins by importing the required modules and components. It imports React, which is the core library for building the user interface. Additionally, it imports various components such as SearchBar, PokemonDetails, CreatePokemonForm, Navigation, and About that are used throughout the application. It also imports some images and styling files.

```js
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonDetails from './components/PokemonDetails';
import pokedexLogo from './icons/Pokédex_logo.png';
import favoritePokemonIcon from './icons/PokemonFavoriteIcon.png';
import CreatePokemonForm from './components/CreatePokemonForm';
import api from './components/api';
import Navigation from './components/Navigation';
import About from './components/About';
```

## Defining the main component of the application

This section defines the main component of the application called App. It contains the entire functionality of the Pokémon application.

```js
// Defining the main component of the application
function App() {
  // ...
}
```

## State initialization

This section initializes the state variables using the useState hook. It creates pokemon to store the current Pokémon data (initially set to null), searchQuery to store the current search query (initially an empty string), and favorites to store the user-favorited Pokémon (initially retrieved from local storage or an empty array).

```js
const [pokemon, setPokemon] = useState(null);  // storing the current Pokemon data, which we initialize as null.
  const [searchQuery, setSearchQuery] = useState('');  // storing the current search query, which we initialize as an empty string.
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []  // storing the list of user-favorited Pokemon, which we initialize with any favorites stored in local storage or an empty array.
  );
```

## Async function for searching a Pokémon

The search function is an asynchronous function that handles the search functionality for a Pokémon. It uses the api module to search for a Pokémon based on the searchQuery and updates the pokemon state with the result.

```js
const search = async () => {  // Declaring an async function called "search"
    const pokemon = await api.searchPokemon(searchQuery);  // Searching for a Pokemon with the searchQuery using the api module
    setPokemon(pokemon);  // Updating the "pokemon" state with the result of the search
  };
```

## Event handler for Enter keypress

The handleKeyPress function is an event handler that triggers the search functionality when the Enter key is pressed. It calls the search function if the Enter key is detected.

```js
const handleKeyPress = (event) => {  // Declaring a function called "handleKeyPress" that takes an event as a parameter
  if (event.key === 'Enter') {  // If the event is a key press of the "Enter" key...
    search();  // Call the search function
  }
};
```

## Function for adding a Pokémon to favorites

The addToFavorites function handles the process of adding a Pokémon to the user's favorites. It checks if the pokemon state exists, verifies whether it's a created Pokémon or not, and ensures that it is not already favorited. If these conditions are met, the function updates the favorites state by adding the new favorite and stores the updated favorites in local storage.

```js
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
```

## Function for removing a Pokémon from favorites

To remove a Pokémon from the user's favorites, the code defines the removeFromFavorites function. It filters the favorites state to exclude the checked favorites, updates the favorites state accordingly, and stores the updated favorites in local storage.

```js
const removeFromFavorites = () => {
  // Using the filter() method to create a new array of favorites that do not have the 'checked' property set to true
  const updatedFavorites = favorites.filter((favorite) => !favorite.checked);
  // Updating the state with the new array of favorites
  setFavorites(updatedFavorites);
  // Storing the updated array of favorites in local storage
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};
```

## Function for toggling all Pokémon as favorites

The toggleAllFavorites function allows the user to toggle all Pokémon as favorites. It checks if all favorites are currently checked and updates the favorites state accordingly.

```js
const toggleAllFavorites = () => {
// Using the Array filter method to get all checked favorites and checking if they are equal to the length of favorites array
  const allChecked = favorites.length === favorites.filter((favorite) => favorite.checked).length;
// Using the Array map method to create a new array of objects with the checked property of each favorite set to the opposite of allChecked
  const updatedFavorites = favorites.map((favorite) => ({ ...favorite, checked: !allChecked }));
// Updating the state of favorites with the updatedFavorites array
  setFavorites(updatedFavorites);
};
```

## Function for toggling a single Pokémon as a favorite

The toggleFavorite function handles toggling a single Pokémon as a favorite based on its index. It updates the favorites state by creating a new array where the checked property of the respective favorite is set to the opposite value.

```js
const toggleFavorite = (index) => {
// Copying the favorites array using the spread operator
  const updatedFavorites = [...favorites];
// Updating the favorite at the specified index by creating a new object with the same properties as the original object using the spread operator and setting the 'checked' property to the opposite of its current value
  updatedFavorites[index] = { ...updatedFavorites[index], checked: !updatedFavorites[index].checked };
// Updating the state of the favorites array with the updated array
  setFavorites(updatedFavorites);
};
```

## Function for handling form submission to create a new Pokémon

The handleSubmit function manages the form submission when creating a new Pokémon. It receives the form data as an argument, updates the pokemon state with the new Pokémon's details, and performs any necessary conversions or operations.

```js
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
```

## Rendering the UI components

The render function returns the JSX markup responsible for rendering the UI components of the application. It includes the SearchBar, PokemonDetails, CreatePokemonForm, Navigation, and other components based on the current state and user interactions.

```js
return (

<div className='App'>
  
<div>
      <Navigation />
</div>

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
```
<br></br>
# Bugs, Blockers & Wins

## Bugs and Blockers

During the development process, I encountered a few bugs and challenges. One of the blockers was an issue with handling form submission in the CreatePokemonForm component. Another bug was related to parsing the favorites stored in local storage. However, through careful debugging and troubleshooting, I was able to resolve these issues and ensure the smooth functioning of the application.

## Wins
One of the wins during the development process was successfully implementing the search functionality using the PokeAPI. This allowed users to search for specific Pokemon and retrieve their details, such as name, height, weight, type, and description. Additionally, the ability to add Pokemon to favorites and manage the favorites list was another significant accomplishment.
<br></br>

# Future Features
The project has the potential for further improvements and additional features. Some possible future features include:


### User Authentication:
<ul>
Adding user authentication functionality would allow users to create accounts and personalize their experience within the application. With user authentication, users could save their favorite Pokemon across sessions, ensuring that their preferences are retained even when they revisit the application. This feature would provide a more personalized and interactive experience for users.
</ul>

### Advanced Filtering:
<ul>
Enhancing the search functionality with advanced filtering options would enable users to refine their searches based on specific criteria. For example, users could filter Pokemon by type, ability, or region, allowing them to narrow down their search results and find Pokemon that meet their specific preferences. This feature would provide more flexibility and customization in discovering Pokemon based on specific characteristics.
</ul>

### Expanded Pokemon Details:
<ul>
 Expand the application to include additional Pokemon details such as moves and evolutionary information. This feature provides users with comprehensive insights into each Pokemon's moveset, abilities, and evolution chain. It empowers users to make informed decisions when selecting Pokemon for battles or team composition. By offering a deeper understanding of a Pokemon's capabilities, this enhancement enriches the user experience and supports strategic decision-making.
</ul>
<br></br>

# Key Learnings
During the development of this project, I acquired valuable insights and knowledge that have contributed to my growth as a developer. Here are the key learnings I gained:
### Proficiency in React:
<ul>
 Through building this project, I deepened my understanding of React and its core concepts, such as component-based architecture, state management, and reusable UI components. This hands-on experience enabled me to strengthen my React skills and become more proficient in developing interactive and dynamic user interfaces.
</ul>

### JavaScript Mastery:
<ul>
 Working on this project allowed me to enhance my JavaScript skills. I encountered various challenges that required problem-solving and implementation of JavaScript functionalities. As a result, I gained a deeper understanding of JavaScript syntax, data manipulation, asynchronous programming, and API integration.
</ul>

### CSS Styling Techniques:
<ul>
 Crafting the visual appearance of the application provided an opportunity to sharpen my CSS styling skills. I learned how to effectively structure and organize CSS code, utilize flexbox and grid layouts, and create responsive designs. This project challenged me to apply CSS best practices and create visually appealing and user-friendly interfaces.
 By working on this project, I was able to enhance my skills in React, JavaScript, and CSS, as well as improve my ability to plan and organize a development project effectively.
</ul>
