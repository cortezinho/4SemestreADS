import React from 'react';
import DialogueBox from './DialogueBox';

function ResultScreen({ scores, onRestart }) {
    const winnerCourse =
        scores.ADS > scores.Mecatrônica
            ? 'Análise e Desenvolvimento de Sistemas'
            : scores.Mecatrônica > scores.ADS
                ? 'Tecnólogo em Mecatrônica Industrial'
                : 'Ambos os cursos!';

    return (
        <div className="app-container result-screen">
            <div className="result-content">
                <h2>Resultado Final</h2>
                <p>Seu curso recomendado é:</p>
                <h1 className="winner-course">{winnerCourse}</h1>
            </div>

            <DialogueBox
                text={`Parabéns! Com base nas suas respostas, este curso parece ser uma ótima escolha para você!`}
            />

            <button className="restart-button" onClick={onRestart}>
                Fazer o teste novamente
            </button>
        </div>
    );
}

export default ResultScreen;
