import React from "react";
import StartScreen from "./components/StartScreens";
import GameScreen from "./components/GameScreens";
import ResultScreen from "./components/ResultScreens";
import BackgroundWrapper from "./components/BackgroundWrapper";

import { useGameController } from "./hooks/useGameController";
import "./styles/App.css";

function App() {
  const {
    gameState,
    setGameState,
    backgroundImg,
    currentDialogue,
    scores,
    handleChoice,
    handleRestart,
  } = useGameController();

  return (
    <BackgroundWrapper backgroundImg={backgroundImg}>
      {gameState === "start" && (
        <StartScreen onStart={() => setGameState("intro")} />
      )}

      {(gameState === "intro" || gameState === "quiz") && (
        <GameScreen
          currentDialogue={currentDialogue}
          handleChoice={handleChoice}
        />
      )}

      {gameState === "result" && (
        <ResultScreen scores={scores} onRestart={handleRestart} />
      )}
    </BackgroundWrapper>
  );
}

export default App;
