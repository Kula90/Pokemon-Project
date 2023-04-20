import './App.css';
import React, { useState } from 'react';

function CreatePokemonForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [height, setHeight] = useState({ feet: 0, inches: 0 });
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState('');

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
      Height (ft, in):
      <input type="number" value={height.feet} onChange={(event) => setHeight({ ...height, feet: event.target.value })} required /> ft
      <input type="number" value={height.inches} onChange={(event) => setHeight({ ...height, inches: event.target.value })} required /> in
    </label>
  <br />
    <label>
      Weight (lbs):
      <input type="number" value={weight} onChange={(event) => setWeight(event.target.value)} required />
    </label>
  <br />
    <label>
      Description:
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
    </label>
  <br />
    <button type="submit">Create your Pokemon</button>
  </form>
 );
}

export default CreatePokemonForm;
