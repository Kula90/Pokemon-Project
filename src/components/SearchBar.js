import '/root/sei/projects/pokemon-project/src/App.css';
import React from 'react';

// SearchBar component that takes in three props: searchQuery, setSearchQuery, and search.
function SearchBar({ searchQuery, setSearchQuery, search }) {
  // The component returns a div containing an input and a button.
  return (
    <div>
      <input
        type="text"
        placeholder="Pokemon name or # "
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar;




