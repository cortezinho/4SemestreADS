// src/components/BookList.jsx
import React from 'react';
import BookCard, { SearchBar } from './BookCard';

const BookList = ({ title, books, onBookAction, variant = 'available' }) => {
  const listClassName = variant === 'available' ? 'available-books-grid' : 'my-books-list';

  return (
    <div className={`section ${variant === 'available' ? 'available-books-section' : 'my-books-section'}`}>
      <h2 className="section-title">{title}</h2>
      <SearchBar title="Pesquisar" />
      <div className={listClassName}>
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onAction={onBookAction}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;