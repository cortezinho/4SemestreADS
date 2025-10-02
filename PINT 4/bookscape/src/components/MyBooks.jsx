import React, { useState } from 'react';

function MyBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const allBooksRead = [
    { title: '1984', author: 'George Orwell' },
    { title: 'Dom Casmurro', author: 'Machado de Assis' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
  ];

  const filteredBooksRead = allBooksRead.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-books-section">
      <h2>Meus Livros</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="my-books-list">
        <ul>
          {filteredBooksRead.map((book, index) => (
            <li key={index} className="book-item">
              <div className="book-info">
                <span className="book-title">{book.title}</span>
                <span className="book-author">{book.author}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyBooks;