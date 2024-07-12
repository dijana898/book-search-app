import React from 'react';
import './BookList.css';

const BookList = ({ books, query }) => {
  const highlightText = (text) => {
    if (!text) return '';
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? 
          <span key={index} className="book-list__highlight">{part}</span> : 
          part
        )}
      </>
    );
  };

  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map(book => (
          <div key={book.id} className="book-list__item">
            <h3 className="book-list__title">{highlightText(book.title)}</h3>
            <p className="book-list__author">{highlightText(book.author)}</p>
            <p className="book-list__genre">{highlightText(book.genre)}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default BookList;
