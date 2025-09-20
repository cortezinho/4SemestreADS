import React from 'react';

function BooksList() {
  const books = [
    { title: 'Dom Casmurro', author: 'Machado de Assis' },
    { title: '1984', author: 'George Orwell' },
    { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
  ];

  return (
    <div className="books-list">
      <input className="search-input" type="text" placeholder="Search" />
      <ul>
        {books.map((book, index) => (
          <li key={index} className="book-item">
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;
