// src/App.jsx
import React, { useState } from 'react';
import BookList from './components/BookList';
import { Header } from './components/BookCard';
import Modal from './components/Modal'; // Importar o Modal

// Dados iniciais para simular a biblioteca
const initialBooksData = [
  { id: 1, title: 'Título 1', author: 'Autor A', returnDate: '00/00/00' },
  { id: 2, title: 'Título 2', author: 'Autor B', returnDate: '00/00/00' },
  { id: 3, title: 'Título 3', author: 'Autor C', returnDate: '00/00/00' },
  { id: 4, title: 'Título 4', author: 'Autor D', returnDate: '00/00/00' },
  { id: 5, title: 'Título 5', author: 'Autor E', returnDate: '00/00/00' },
  { id: 6, title: 'Título 6', author: 'Autor F', returnDate: '00/00/00' },
  { id: 7, title: 'Título 7', author: 'Autor G', returnDate: '00/00/00' },
  { id: 8, title: 'Título 8', author: 'Autor H', returnDate: '00/00/00' },
  { id: 9, title: 'Título 9', author: 'Autor I', returnDate: '00/00/00' },
  { id: 10, title: 'Título 10', author: 'Autor J', returnDate: '00/00/00' },
  { id: 11, title: 'Título 11', author: 'Autor K', returnDate: '00/00/00' },
  { id: 12, title: 'Título 12', author: 'Autor L', returnDate: '00/00/00' },
  { id: 13, title: 'Título 13', author: 'Autor M', returnDate: '00/00/00' },
  { id: 14, title: 'Título 14', author: 'Autor N', returnDate: '00/00/00' },
  { id: 15, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 16, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 17, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 18, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 19, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 20, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 21, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 22, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 23, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 24, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },
  { id: 25, title: 'Título 15', author: 'Autor O', returnDate: '00/00/00' },

];

// Função utilitária para formatar a data para o input date (AAAA-MM-DD)
const getFormattedDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

// Sugere 7 dias no futuro como padrão
const getDefaultReturnDate = () => getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 7)));
// Data de hoje para o limite mínimo do input date
const getTodayDate = () => getFormattedDate(new Date());


function App() {
  const [availableBooks, setAvailableBooks] = useState(initialBooksData);
  const [myBooks, setMyBooks] = useState([]);
  
  // Estados do Modal: armazena qual ação e qual livro foi selecionado
  const [modalData, setModalData] = useState(null); // { bookId: number, type: 'borrow' | 'return', bookTitle: string }
  const [customReturnDate, setCustomReturnDate] = useState(getDefaultReturnDate());

  // --- Funções de Abertura do Modal ---

  // Lógica quando clica em um livro DISPONÍVEL (Empréstimo)
  const handleBorrowAction = (bookId) => {
    const book = availableBooks.find(b => b.id === bookId);
    if (!book) return;

    setModalData({ 
        bookId, 
        type: 'borrow', 
        bookTitle: `${book.title} - ${book.author}` 
    });
    // Reseta para a data padrão ao abrir o modal de empréstimo
    setCustomReturnDate(getDefaultReturnDate()); 
  };

  // Lógica quando clica em um livro de MEUS LIVROS (Devolução)
  const handleReturnAction = (bookId) => {
    const book = myBooks.find(b => b.id === bookId);
    if (!book) return;
    
    setModalData({ 
        bookId, 
        type: 'return', 
        bookTitle: `${book.title} - ${book.author}` 
    });
  };

  // --- Funções de Confirmação (Execução da Ação) ---
  
  const handleConfirmAction = () => {
    if (!modalData) return;

    const { bookId, type } = modalData;

    if (type === 'borrow') {
        const bookToBorrow = availableBooks.find(book => book.id === bookId);
        if (!bookToBorrow) return;

        // 1. Remove dos disponíveis
        setAvailableBooks(prev => prev.filter(book => book.id !== bookId));
        
        // 2. Adiciona em Meus Livros com a data personalizada
        // Converte a data do input (AAAA-MM-DD) para exibição (DD/MM/AAAA)
        const [year, month, day] = customReturnDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        setMyBooks(prev => [
            ...prev,
            { ...bookToBorrow, returnDate: formattedDate }
        ]);

    } else if (type === 'return') {
        const bookToReturn = myBooks.find(book => book.id === bookId);
        if (!bookToReturn) return;

        // 1. Remove de Meus Livros
        setMyBooks(prev => prev.filter(book => book.id !== bookId));
        
        // 2. Adiciona de volta nos disponíveis
        const returnedBook = { 
            id: bookToReturn.id, 
            title: bookToReturn.title, 
            author: bookToReturn.author, 
            returnDate: '00/00/00' 
        };

        setAvailableBooks(prev => {
            const newAvailable = [...prev, returnedBook];
            // Mantém a ordem por ID para consistência visual
            return newAvailable.sort((a, b) => a.id - b.id);
        });
    }

    // Fecha o modal após a confirmação
    setModalData(null);
  };
  
  // Função para fechar o modal (Cancelamento)
  const handleCancelAction = () => {
    setModalData(null);
  };

  // --- Renderização Condicional do Modal ---

  const renderModalContent = () => {
    if (!modalData) return null;

    if (modalData.type === 'borrow') {
      return (
        <Modal
          title="Confirmar Empréstimo"
          onConfirm={handleConfirmAction}
          onCancel={handleCancelAction}
          confirmText="Emprestar"
        >
          <p>Deseja confirmar o empréstimo do livro <strong>{modalData.bookTitle}</strong>?</p>
          <div className="date-input-group">
            <label htmlFor="return-date">Data de Devolução Sugerida:</label>
            <input 
              type="date" 
              id="return-date"
              value={customReturnDate}
              onChange={(e) => setCustomReturnDate(e.target.value)}
              min={getTodayDate()} // Impede datas passadas
            />
          </div>
        </Modal>
      );
    } 
    
    if (modalData.type === 'return') {
      return (
        <Modal
          title="Confirmar Devolução"
          onConfirm={handleConfirmAction}
          onCancel={handleCancelAction}
          confirmText="Devolver"
        >
          <p>Deseja confirmar a devolução do livro <strong>{modalData.bookTitle}</strong>?</p>
          <p>Ele voltará para a lista de livros disponíveis.</p>
        </Modal>
      );
    }
  };


  return (
    <>
      <div className="library-screen">
        <BookList
          title="DISPONÍVEIS"
          books={availableBooks}
          onBookAction={handleBorrowAction} // Abre Modal Empréstimo
          variant="available"
        />
        <BookList
          title="MEUS LIVROS"
          books={myBooks}
          onBookAction={handleReturnAction} // Abre Modal Devolução
          variant="my-books"
        />
      </div>
      
      {/* Renderiza o modal se modalData não for nulo */}
      {modalData && renderModalContent()}

    </>
  );
}

export default App;