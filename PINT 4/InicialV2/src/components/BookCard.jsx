// src/components/BookCard.jsx
import React from 'react';

// Ícones simples para simular o visual
const SearchIcon = () => <svg className="search-icon" viewBox="0 0 24 24" fill="white" width="20px" height="20px"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;
const UserIcon = () => <svg viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;


// Função para simular o ícone de 'W'
const ActionSymbol = () => <div className="borrow-icon"></div>;


const BookCard = ({ book, onAction, variant = 'available' }) => {
  const { id, title, author, returnDate } = book;

  if (variant === 'available') {
    return (
      // CLICAR EM DISPONÍVEIS -> EMPRESTAR
      <div className="book-card-container" onClick={() => onAction(id)}>
        <div className="book-cover"></div>
        <div className="book-info">
          <div className="book-title-author">{title} - {author}</div>
          <ActionSymbol />
        </div>
      </div>
    );
  }

  if (variant === 'my-books') {
    return (
      // CLICAR EM MEUS LIVROS -> DEVOLVER/REMOVER
      <div className="my-books-card-container" onClick={() => onAction(id)}>
        <div className="book-cover"></div>
        <div className="book-info">
          <div className="book-title-author">{title} - {author}</div>
          <div className="book-return-date">Data de devolução: {returnDate}</div>
        </div>
        <ActionSymbol />
      </div>
    );
  }
  
  return null;
};

// Componente de Pesquisa
export const SearchBar = ({ title = 'Pesquisar' }) => (
  <div className="search-bar">
    <SearchIcon />
    <input type="text" placeholder={title} />
  </div>
);

// Componente de Cabeçalho (Logo e Usuário)
export const Header = () => (
    <div className="header">
        <div className="logo">bookscape</div>
        <div style={{marginLeft: 'auto'}}><UserIcon /></div>
    </div>
);


export default BookCard;