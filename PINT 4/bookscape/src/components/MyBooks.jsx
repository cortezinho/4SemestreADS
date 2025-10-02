import React, { useState } from 'react';

function MyBooks({ myBooks, onRemoveBook }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooksRead = myBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (book) => {
    const confirmRemove = window.confirm(`Deseja remover "${book.title}" da sua lista?`);
    if (confirmRemove) {
      onRemoveBook(book);
    }
  };

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
            <li key={index} className="book-item" onClick={() => handleBookClick(book)}>
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