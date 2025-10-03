import React, { useState } from 'react';
import Modal from '../Modal';

function MyBooks({ myBooks, onRemoveBook }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooksRead = myBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleConfirm = () => {
    onRemoveBook(selectedBook);
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedBook(null);
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
            <li
              key={index}
              className="book-item"
              onClick={() => handleBookClick(book)}
              style={{ backgroundColor: book.color }} // <--- Usa a cor salva aqui
            >
              <div className="book-info">
                <span className="book-title">{book.title}</span>
                <span className="book-author">{book.author}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        show={showModal}
        title="Devolver Livro"
        message={`Data de devolução: ${selectedBook?.dueDate || 'Não especificada'}. Deseja devolver o livro agora?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default MyBooks;