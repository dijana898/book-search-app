import React from 'react';
import './SortDropdown.css';

const SortDropdown = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-dropdown">
      <select onChange={handleSortChange} className="sort-dropdown__select">
        <option value="author">Sort by Author (default)</option>
        <option value="title">Sort by Title</option>
        <option value="genre">Sort by Genre</option>
      </select>
    </div>
  );
};

export default SortDropdown;
