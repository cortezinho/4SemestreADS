import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreens';
import './styles/App.css';

function App() {
  const [gameState, setGameState] = useState('start');

  const handleStart = () => {
    setGameState('quiz');
  };

  return (
    <div className="app-wrapper">
      {gameState === 'start' ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <QuizScreen />
      )}
    </div>
  );
}

export default App;