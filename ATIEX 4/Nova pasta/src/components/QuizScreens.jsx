// src/components/QuizScreen.jsx
import React, { useState } from 'react';
import DialogueBox from './DialogueBox'; // Importa o novo componente
import backgrounds from '../assets/backgrounds/quiz-bg.png';
import quizData from '../data/quizData';

function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [adsScore, setAdsScore] = useState(0);
  const [mecatronicaScore, setMecatronicaScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (answer === 'yes') {
      setAdsScore(prev => prev + currentQuestion.scores.ads);
      setMecatronicaScore(prev => prev + currentQuestion.scores.mecatronica);
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const renderResult = () => {
    let resultText = '';
    if (adsScore > mecatronicaScore) {
      resultText = 'Seu curso ideal é Análise e Desenvolvimento de Sistemas!';
    } else if (mecatronicaScore > adsScore) {
      resultText = 'Seu curso ideal é Tecnologia em Mecatrônica Industrial!';
    } else {
      resultText = 'Você se encaixa bem nos dois cursos!';
    }
    return (
      <DialogueBox>
        <p>Parabéns! O resultado é:</p>
        <h2>{resultText}</h2>
      </DialogueBox>
    );
  };
  
  const choices = [
    { text: 'Sim', value: 'yes' },
    { text: 'Não', value: 'no' },
  ];

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgrounds})` }}
    >
      {quizFinished ? (
        renderResult()
      ) : (
        <DialogueBox choices={choices} onChoice={handleAnswer}>
          <p>{quizData[currentQuestionIndex].question}</p>
        </DialogueBox>
      )}
    </div>
  );
}

export default QuizScreen;