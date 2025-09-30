// App.jsx (versão integrada)
import React, { useState, useEffect } from 'react';
import DialogueBox from './components/DialogueBox';
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
  { question: 'Gosta de colocar a mão na massa para montar ou consertar algo?', course: 'Mecatrônica' },
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

  const startQuiz = () => {
    setQuestions(shuffleArray([...allQuestions]));
    setGameState('quiz');
  };

  const handleChoice = (choice) => {
    if (gameState === 'intro') {
      if (choice === 'Sim') {
        startQuiz();
      } else {
        handleRestart();
      }
      return;
    }

    if (gameState === 'quiz') {
      if (choice === 'Sim') {
        const currentCourse = questions[currentQuestionIndex].course;
        setScores(prevScores => ({
          ...prevScores,
          [currentCourse]: prevScores[currentCourse] + 1,
        }));
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('result');
      }
    }
  };

  const handleDialogueAdvance = () => {
    if (gameState === 'intro' && !introScript[scriptIndex].choices) {
      if (scriptIndex < introScript.length - 1) {
        setScriptIndex(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleDialogueAdvance);
    return () => window.removeEventListener('click', handleDialogueAdvance);
  }, [gameState, scriptIndex]);

  useEffect(() => {
    // Intervalo que recarrega a página a cada 10 segundos
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // 10000ms = 10 segundos

    return () => clearInterval(interval); // limpa o intervalo quando o componente desmonta
  }, []);


  const handleRestart = () => {
    setGameState('start');
    setScriptIndex(0);
    setCurrentQuestionIndex(0);
    setScores({ Mecatrônica: 0, ADS: 0 });
  };

  // Tela de Início (com digitação palavra por palavra sem cursor sobrando)
  if (gameState === 'start') {
    return (
      <div className="container" onClick={() => setGameState('intro')}>
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
    );
  }





  // 2. Tela de Resultado
  if (gameState === 'result') {
    let winner = 'Indefinido';
    let winnerMessage = `Parabéns! Com base nas suas respostas, este curso parece ser uma ótima escolha para você!`;

    if (scores.ADS > scores.Mecatrônica) {
      winner = 'Análise e Desenvolvimento de Sistemas';
    } else if (scores.Mecatrônica > scores.ADS) {
      winner = 'Tecnólogo em Mecatrônica Industrial';
    } else {
      winner = 'Ambos os cursos!';
      winnerMessage = 'Você se saiu bem em ambas as áreas! Recomendamos pesquisar um pouco mais sobre os dois cursos.'
    }

    return (
      <div className="app-container result-screen">
        <div className="result-content">
          <h2>Resultado Final</h2>
          <p>Seu curso recomendado é:</p>
          <h1 className="winner-course">{winner}</h1>
        </div>
        <DialogueBox text={winnerMessage} />
        <button className="restart-button" onClick={handleRestart}>Fazer o teste novamente</button>
      </div>
    );
  }

  // 3. Introdução e Quiz
  const currentDialogue = gameState === 'intro'
    ? introScript[scriptIndex]
    : { text: questions[currentQuestionIndex]?.question, choices: ['Sim', 'Não'] };

  return (
    <div className="app-container">
      <DialogueBox
        text={currentDialogue.text}
        choices={currentDialogue.choices}
        onChoice={handleChoice}
      />
    </div>
  );
}

export default App;
