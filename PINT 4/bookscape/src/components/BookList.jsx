import React, { useState } from 'react';

function BooksList() {
  const [searchTerm, setSearchTerm] = useState(''); // 1. Estado para o termo de busca

  const allBooks = [
    { title: 'Dom Casmurro', author: 'Machado de Assis' },
    { title: '1984', author: 'George Orwell' },
    { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
  ];

  // 2. Filtra os livros com base no termo de busca
  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="books-section">
      <h2>Livros</h2>
      {/* 3. Adiciona o onChange para capturar o valor do input */}
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="books-list">
        <ul>
          {/* 4. Mapeia a lista filtrada */}
          {filteredBooks.map((book, index) => (
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

export default BooksList;