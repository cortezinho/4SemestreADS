import React from 'react';

function DialogueBox({ children, choices = [], onChoice }) {
  return (
    <div className="dialogue-box">
      {/* O conteúdo principal (texto da pergunta ou resultado) */}
      <div className="dialogue-content">
        {children}
      </div>

      {/* As opções de escolha (Sim/Não) */}
      {choices.length > 0 && (
        <div className="dialogue-choices">
          {choices.map((choice) => (
            <button
              key={choice.text}
              onClick={() => onChoice(choice.value)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DialogueBox;