import React from 'react';
import './App.css';
import Profile from './components/Profile';
import BooksList from './components/BookList';
import MyBooks from './components/MyBooks';

function App() {
  return (
    <div className="app">
      <Profile />
      <BooksList />
      <MyBooks />
    </div>
  );
}

export default App;