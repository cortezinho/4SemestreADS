import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import './DialogueBox.css';

// O componente agora aceita 'choices' e uma função 'onChoice'
const DialogueBox = ({ text, choices = [], onChoice }) => {
  const typedText = useTypewriter(text);

  // Verifica se o texto terminou de ser "digitado" para mostrar as opções
  const showChoices = choices.length > 0;

  return (
    <div className="dialogue-box-container">
      <p className="dialogue-text">{typedText}</p>
      
      {/* Mostra as opções de escolha quando aplicável */}
      {showChoices && (
        <div className="choices-container">
          {choices.map((choice) => (
            <button
              key={choice}
              className="choice-button"
              onClick={() => onChoice(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DialogueBox;