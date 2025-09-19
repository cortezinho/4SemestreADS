import React from 'react';

function MyBooks() {
  const booksRead = [
    { title: '1984', author: 'George Orwell' },
    { title: 'Dom Casmurro', author: 'Machado de Assis' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
  ];

  return (
    <div className="my-books">
      <div className="tab-container">
        <button className="tab-btn active">Lidos</button>
        <button className="tab-btn">Retirados</button>
      </div>
      <div className="books-list">
        <ul>
          {booksRead.map((book, index) => (
            <li key={index} className="book-item">
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyBooks;
