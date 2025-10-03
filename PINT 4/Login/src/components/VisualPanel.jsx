import React from 'react';
import '../styles/main.css';
import logo from '../assets/images/logo1.png';
import pattern from '../assets/images/bookscape1.png';

const VisualPanel = () => (
    <div className="visual-panel">

        <div className="logo-section">
            <img
                src={logo}
                alt="Bookscape Logo - Sistema de Monitoramento"
            />
        </div>

        <div className="pattern-section">
            <img
                src={pattern}
                alt="Padrão de livros em preto e branco"
            />
        </div>
    </div>
);

export default VisualPanel;
