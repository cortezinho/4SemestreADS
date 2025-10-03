// ...outros imports
import React, { useState } from 'react';
import './styles/main.css';
import Profile from './components/Profile';
import BooksList from './components/BookList';
import MyBooks from './components/MyBooks';

const bookColors = [
  '#ffe0b2', // Laranja claro
  '#b3e5fc', // Azul claro
  '#e1f5fe', // Azul mais claro
  '#c8e6c9', // Verde claro
  '#ffcdd2', // Vermelho claro
  '#f0f4c3', // Amarelo claro
  '#d1c4e9', // Roxo claro
];

function App() {
  const [books, setBooks] = useState([
    { title: 'Dom Casmurro', author: 'Machado de Assis' },
    { title: '1984', author: 'George Orwell' },
    { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
    { title: 'A Metamorfose', author: 'Franz Kafka' },
    { title: 'Crime e Castigo', author: 'Fiódor Dostoiévski' },
    { title: 'O Apanhador no Campo de Centeio', author: 'J.D. Salinger' },
    { title: 'Grande Sertão: Veredas', author: 'João Guimarães Rosa' },
    { title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis' },
    { title: 'O Processo', author: 'Franz Kafka' },
    { title: 'O Morro dos Ventos Uivantes', author: 'Emily Brontë' },
    { title: 'Capitães da Areia', author: 'Jorge Amado' },
    { title: 'O Sol é Para Todos', author: 'Harper Lee' },
    { title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez' },
    { title: 'A Revolução dos Bichos', author: 'George Orwell' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury' },
    { title: 'Ulisses', author: 'James Joyce' },
    { title: 'A Hora da Estrela', author: 'Clarice Lispector' },
    { title: 'Hamlet', author: 'William Shakespeare' },
    { title: 'Vidas Secas', author: 'Graciliano Ramos' },
    { title: 'O Retrato de Dorian Gray', author: 'Oscar Wilde' },
    { title: 'Orgulho e Preconceito', author: 'Jane Austen' },
  ]);

  const [myBooks, setMyBooks] = useState([]);

  const getRandomColor = () => {
    return bookColors[Math.floor(Math.random() * bookColors.length)];
  };

  const addBookToMyList = (book) => {
    // Adiciona uma propriedade 'color' com um valor aleatório
    const bookWithColor = { ...book, color: getRandomColor() };
    setBooks(books.filter(b => b.title !== book.title));
    setMyBooks([...myBooks, bookWithColor]);
  };

  const removeBookFromMyList = (book) => {
    setMyBooks(myBooks.filter(b => b.title !== book.title));
    setBooks([...books, book]);
  };

  return (
    <div className="app">
      <Profile />
      <BooksList books={books} onAddBook={addBookToMyList} />
      <MyBooks myBooks={myBooks} onRemoveBook={removeBookFromMyList} />
    </div>
  );
}

export default App;