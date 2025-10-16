// src/components/BookList.jsx
import React from 'react';
import BookCard, { SearchBar } from './BookCard';

const BookList = ({ title, books, onBookAction, variant = 'available' }) => {
  // Classes para o conteúdo interno
  const contentClassName = variant === 'available' ? 'available-books-grid' : 'my-books-list';
  
  // Classe para o DIV que irá aplicar o scrollbar
  const scrollContainerClass = variant === 'available' 
    ? 'available-books-scroll-container' 
    : 'my-books-scroll-container';

  return (
    <div className={`section ${variant === 'available' ? 'available-books-section' : 'my-books-section'}`}>
      <h2 className="section-title">{title}</h2>
      <SearchBar title="Pesquisar" />
      
      {/* NOVO CONTAINER DE SCROLL */}
      <div className={scrollContainerClass}>
          {/* Conteúdo interno da lista/grid */}
          <div className={contentClassName}>
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
    </div>
  );
};

export default BookList;