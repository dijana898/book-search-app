import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import './App.css';
import booksJson from './data/books.json';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('author');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Process JSON data
        const jsonBooks = booksJson.map(book => ({
          ...book,
          id: String(book.id),
          title: book.title || '',
          author: book.author || '',
          genre: book.genre || ''
        }));

        // Fetch and parse CSV data
        const csvResponse = await fetch('/data/books.csv');
        const csvText = await csvResponse.text();
        const { data: csvData } = Papa.parse(csvText, { 
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.trim()
        });

        const csvBooks = csvData
          .filter(book => book.id && book.title) 
          .map(book => ({
            id: String(book.id),
            title: book.title || '',
            author: book.author || '',
            genre: book.genre || ''
          }));

        // Merge JSON and CSV books
        const mergedBooks = mergeBooks(jsonBooks, csvBooks);
        setBooks(mergedBooks);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchBooks();
  }, []);

  const mergeBooks = (jsonBooks, csvBooks) => {
    const booksMap = new Map();

    // Function to add books to the map
    const addBooksToMap = (books, map) => {
      books.forEach(book => {
        map.set(book.id, book);
      });
    };

    addBooksToMap(jsonBooks, booksMap);
    addBooksToMap(csvBooks, booksMap);

    return Array.from(booksMap.values());
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleSortChange = option => {
    setSortOption(option);
  };

  // Filter and sort books based on search query and sort option
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortBooks = (a, b) => {
    switch (sortOption) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      default:
        return a.genre.localeCompare(b.genre);
    }
  };

  const sortedBooks = filteredBooks.sort(sortBooks);

  return (
    <div className="app">
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">Explore the world of books</h1>
          <p className="header__subtitle">Find your next read among thousands of titles!</p>
        </div>
      </header>
      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
        <SortDropdown onSortChange={handleSortChange} />
      </div>
      <BookList books={sortedBooks} query={searchQuery} />
    </div>
  );
};

export default App;
