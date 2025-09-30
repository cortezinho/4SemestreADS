// src/App.jsx
import React, { useState, useEffect } from 'react';
import DialogueBox from './components/DialogueBox';

// fundos
import fundoInicial from './assets/img/fundoTelaInicial.png';
import fundoC from './assets/img/fundoC.png';
// import fundoQuiz from './assets/img/fundoQuiz.png';     // opcional, pode usar fundoC
// import fundoResultado from './assets/img/fundoResultado.png'; // opcional

import './styles/App.css';

// Imagens da tela inicial
const images = {
  bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  zubat: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
};

// --- BANCO DE DADOS DAS PERGUNTAS ---
const allQuestions = [
  { question: 'Você gosta de entender como funcionam máquinas e equipamentos?', course: 'Mecatrônica' },
  { question: 'Se interessa por automação e robótica?', course: 'Mecatrônica' },
  { question: 'Gosta da mão na massa para montar ou consertar algo?', course: 'Mecatrônica' },
  { question: 'Ficaria satisfeito em projetar sistemas que unem mecânica, eletrônica e informática?', course: 'Mecatrônica' },
  { question: 'Se sente atraído por indústrias e ambientes tecnológicos?', course: 'Mecatrônica' },
  { question: 'Você gosta de resolver problemas lógicos e desafios de raciocínio?', course: 'ADS' },
  { question: 'Tem interesse em aprender linguagens de programação?', course: 'ADS' },
  { question: 'Gosta da ideia de criar aplicativos ou sistemas para ajudar pessoas ou empresas?', course: 'ADS' },
  { question: 'Se interessa por tecnologia da informação e inovação digital?', course: 'ADS' },
  { question: 'Prefere trabalhar em projetos que envolvam análise de dados e software?', course: 'ADS' },
];

// --- SCRIPT DE INTRODUÇÃO ---
const introScript = [
  { text: "Olá, eu sou o professor Carvalho." },
  { text: "Hoje vou ajudar você a escolher um curso aqui no SENAI..." },
  { text: "Vou fazer algumas perguntas rápidas, ok? Você topa?", choices: ['Sim', 'Não'] },
];

// Função para embaralhar
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

function App() {
  const [gameState, setGameState] = useState('start');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ Mecatrônica: 0, ADS: 0 });

  // Estado do fundo
  const [backgroundImg, setBackgroundImg] = useState(fundoInicial);

  // Troca o fundo automaticamente quando o estado mudar
  useEffect(() => {
    if (gameState === 'start') setBackgroundImg(fundoInicial);
    if (gameState === 'intro') setBackgroundImg(fundoC);
    if (gameState === 'quiz') setBackgroundImg(fundoQuiz);
    if (gameState === 'result') setBackgroundImg(fundoResultado);
  }, [gameState]);

  const startQuiz = () => {
    setQuestions(shuffleArray([...allQuestions]));
    setGameState('quiz');
  };

  const handleChoice = (choice) => {
    if (gameState === 'intro') {
      if (choice === 'Sim') startQuiz();
      else handleRestart();
      return;
    }

    if (gameState === 'quiz') {
      if (choice === 'Sim') {
        const currentCourse = questions[currentQuestionIndex].course;
        setScores(prev => ({ ...prev, [currentCourse]: prev[currentCourse] + 1 }));
      }
      if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
      else setGameState('result');
    }
  };

  // Avança diálogo só na fase 'intro' e apenas se não houver choices
  const handleDialogueAdvance = () => {
    if (gameState === 'intro' && !introScript[scriptIndex].choices) {
      if (scriptIndex < introScript.length - 1) setScriptIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleDialogueAdvance);
    return () => window.removeEventListener('click', handleDialogueAdvance);
  }, [gameState, scriptIndex]);

  const handleRestart = () => {
    setGameState('start');
    setScriptIndex(0);
    setCurrentQuestionIndex(0);
    setScores({ Mecatrônica: 0, ADS: 0 });
  };

  // Current dialogue (intro ou pergunta)
  const currentDialogue = gameState === 'intro'
    ? introScript[scriptIndex]
    : { text: questions[currentQuestionIndex]?.question, choices: ['Sim', 'Não'] };

  return (
    <div
      className="app-wrapper"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      {/* TELA DE INÍCIO */}
      {gameState === 'start' && (
        <div
          className="container start"
          onClick={() => setGameState('intro')}
        >
          <h1 className="title">
            <span className="word delay1">DESCUBRA</span><br />
            <span className="word delay2">SEU</span><br />
            <span className="word delay3 end">CURSO</span>
          </h1>
          <p className="press">PRESS START</p>

          <img src={images.bulbasaur} alt="bulbasaur" className="bulbasaur flip-right" draggable={false} />
          <img src={images.charmander} alt="charmander" className="charmander flip-right" draggable={false} />
          <img src={images.pikachu} alt="pikachu" className="pikachu" draggable={false} />

          <div className="zubats">
            <img src={images.zubat} alt="zubat" className="zubat" draggable={false} />
          </div>

          <img src={images.squirtle} alt="squirtle" className="character squirtle flip-right" draggable={false} />
        </div>
      )}

      {/* INTRO E QUIZ */}
      {(gameState === 'intro' || gameState === 'quiz') && (
        <div className="app-container">
          <DialogueBox
            text={currentDialogue.text}
            choices={currentDialogue.choices}
            onChoice={handleChoice}
          />
        </div>
      )}

      {/* RESULTADO */}
      {gameState === 'result' && (
        <div className="app-container result-screen">
          <div className="result-content">
            <h2>Resultado Final</h2>
            <p>Seu curso recomendado é:</p>
            <h1 className="winner-course">
              {scores.ADS > scores.Mecatrônica
                ? 'Análise e Desenvolvimento de Sistemas'
                : scores.Mecatrônica > scores.ADS
                  ? 'Tecnólogo em Mecatrônica Industrial'
                  : 'Ambos os cursos!'}
            </h1>
          </div>
          <DialogueBox text={`Parabéns! Com base nas suas respostas, este curso parece ser uma ótima escolha para você!`} />
          <button className="restart-button" onClick={handleRestart}>Fazer o teste novamente</button>
        </div>
      )}
    </div>
  );
}

export default App;
