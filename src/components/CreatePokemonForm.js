import '/root/sei/projects/pokemon-project/src/App.css'; // import App.css file

import React, { useState } from 'react'; // import React and useState hook

function CreatePokemonForm({ onSubmit }) { // create functional component with onSubmit prop
  const [name, setName] = useState(''); // create state variable for name
  const [type, setType] = useState(''); // create state variable for type
  const [height, setHeight] = useState({ feet: 0, inches: 0 }); // create state variable for height object
  const [weight, setWeight] = useState(0); // create state variable for weight
  const [description, setDescription] = useState(''); // create state variable for description
  const [image, setImage] = useState('');
  
  // const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = (event) => { // create function to handle form submission
    event.preventDefault(); // prevent default form submission behavior
    const totalInches = height.feet * 12 + height.inches; // calculate total height in inches
    const pounds = weight * 2.20462; // convert weight to pounds
    const pokemon = { name, type, height: totalInches, weight: pounds, description }; // create pokemon object with user input
    onSubmit(pokemon); // call onSubmit prop with pokemon object as argument
    setName(''); // reset name state variable to empty string
    setType(''); // reset type state variable to empty string
    setHeight({ feet: 0, inches: 0 }); // reset height state variable to object with 0 feet and 0 inches
    setWeight(0); // reset weight state variable to 0
    setDescription(''); // reset description state variable to empty string
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
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </label>

      <br />

      <label>
        Height (ft):
        <input type="number" value={height.feet} onChange={(event) => setHeight({ ...height, feet: parseInt(event.target.value) })} required />
               (in):
        <input type="number" value={height.inches} onChange={(event) => setHeight({ ...height, inches: parseInt(event.target.value) })} required />
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

    <button type="submit">Create your Pokemon</button>
  </form>
 );
}

export default CreatePokemonForm;


