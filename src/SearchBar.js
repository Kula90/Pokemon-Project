import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, handleKeyPress, search }) {
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


