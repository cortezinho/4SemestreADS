import React, { useState } from 'react';
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
    
    // Passa para a próxima pergunta ou finaliza o quiz
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
      <div className="quiz-result">
        <h2>{resultText}</h2>
      </div>
    );
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgrounds})` }}
    >
      {quizFinished ? (
        renderResult()
      ) : (
        <div className="question-container">
          <p className="question-text">{quizData[currentQuestionIndex].question}</p>
          <div className="dialogue-choices">
            <button onClick={() => handleAnswer('yes')}>Sim</button>
            <button onClick={() => handleAnswer('no')}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizScreen;