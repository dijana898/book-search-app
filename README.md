# Book Search Web Application

This web application allows users to search for books from a merged dataset of JSON and CSV files.
You can access the Book Search Web Application [here](https://dijana898.github.io/book-search-app/).

## Features

- Book search by title, author, or genre.
- Sorting options by title, author, or genre.
- Responsive design for various screen sizes.

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   
2. **Install dependencies**

   ```bash
   npm install

3. **Install PapaParse**

   ```bash
   npm install papaparse

- PapaParse is used for parsing CSV files.

4. **Run the application**

   ```bash
   npm start
   
- This command runs the app in development mode. Open http://localhost:3000 to view it in the browser.

5. **Loading Data**

- The application loads book data from books.json and books.csv.
- Ensure both files are correctly placed in the public/data folder for the application to merge and display the books.

6. **Usage**

- Enter a search query in the search bar to filter books based on title, author, or genre.
- Use the dropdown menu to sort the displayed books by title, author, or genre.

7. **Technologies Used**

- React.js
- JavaScript
- CSS

