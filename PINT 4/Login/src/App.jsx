import React from 'react';
import VisualPanel from './components/VisualPanel';
import AuthPanel from './components/Authpage';
import './styles/main.css';

function App() {
  return (
    <div className="login-page">
      {/* Lado Esquerdo: Logo e Imagem */}
      <VisualPanel /> 
      
      {/* Lado Direito: Título e Formulário de Autenticação */}
      <AuthPanel /> 
    </div>
  );
}

export default App;