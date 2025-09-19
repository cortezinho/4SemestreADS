import React from 'react';
import './App.css';
import Profile from './components/Profile';
import BooksList from './components/BookList';
import MyBooks from './components/MyBooks';

function App() {
  return (
    <div className="app">
      <div className="profile-section">
        <Profile />
      </div>
      <div className="books-section">
        <BooksList />
      </div>
      <div className="my-books-section">
        <MyBooks />
      </div>
    </div>
  );
}

export default App;
