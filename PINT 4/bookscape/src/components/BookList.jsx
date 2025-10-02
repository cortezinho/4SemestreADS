import React, { useState } from 'react';
import Modal from '../Modal';

function BooksList({ books, onAddBook }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dueDate, setDueDate] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Garante que o objeto do livro tenha a propriedade 'dueDate' antes de ser enviado
    onAddBook({ ...selectedBook, dueDate });
    setShowModal(false);
    setDueDate('');
    setSelectedBook(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setDueDate('');
    setSelectedBook(null);
  };

  return (
    <div className="books-section">
      <h2>Livros</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="books-list">
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={index} className="book-item" onClick={() => handleBookClick(book)}>
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
        title="Adicionar Livro"
        message={`Deseja adicionar "${selectedBook?.title}" aos seus livros?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <p>Data de devolução:</p>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default BooksList;