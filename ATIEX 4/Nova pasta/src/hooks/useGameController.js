import { useState, useEffect } from "react";
import { allQuestions } from "../data/questions";
import { introScript } from "../data/introScript";

import fundoInicial from "../assets/img/fundoTelaInicial.png";
import fundoC from "../assets/img/fundoC.png";
import fundoQuiz from "../assets/img/fundoC.png";      // você pode trocar depois
import fundoResultado from "../assets/img/fundoC.png"; // você pode trocar depois

// Função auxiliar para embaralhar
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export function useGameController() {
  const [gameState, setGameState] = useState("start");
  const [scriptIndex, setScriptIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ Mecatrônica: 0, ADS: 0 });
  const [backgroundImg, setBackgroundImg] = useState(fundoInicial);

  // Atualiza o fundo conforme estado
  useEffect(() => {
    if (gameState === "start") setBackgroundImg(fundoInicial);
    if (gameState === "intro") setBackgroundImg(fundoC);
    if (gameState === "quiz") setBackgroundImg(fundoQuiz);
    if (gameState === "result") setBackgroundImg(fundoResultado);
  }, [gameState]);

  const startQuiz = () => {
    setQuestions(shuffleArray([...allQuestions]));
    setGameState("quiz");
  };

  const handleChoice = (choice) => {
    if (gameState === "intro") {
      if (choice === "Sim") startQuiz();
      else handleRestart();
      return;
    }

    if (gameState === "quiz") {
      if (choice === "Sim") {
        const currentCourse = questions[currentQuestionIndex].course;
        setScores((prev) => ({
          ...prev,
          [currentCourse]: prev[currentCourse] + 1,
        }));
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setGameState("result");
      }
    }
  };

  const handleDialogueAdvance = () => {
    if (gameState === "intro" && !introScript[scriptIndex].choices) {
      if (scriptIndex < introScript.length - 1) {
        setScriptIndex((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleDialogueAdvance);
    return () => window.removeEventListener("click", handleDialogueAdvance);
  }, [gameState, scriptIndex]);

  const handleRestart = () => {
    setGameState("start");
    setScriptIndex(0);
    setCurrentQuestionIndex(0);
    setScores({ Mecatrônica: 0, ADS: 0 });
  };

  const currentDialogue =
    gameState === "intro"
      ? introScript[scriptIndex]
      : { text: questions[currentQuestionIndex]?.question, choices: ["Sim", "Não"] };

  return {
    gameState,
    setGameState,
    backgroundImg,
    currentDialogue,
    scores,
    handleChoice,
    handleRestart,
  };
}
