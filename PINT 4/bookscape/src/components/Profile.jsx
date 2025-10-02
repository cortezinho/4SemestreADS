import React from 'react';
import perfil from '../assets/images/perfil.jpg';

function Profile() {
  return (
    <div className="profile-section">
      <h2>Perfil</h2>
      <div className="profile-image-container">
        <img src={perfil} alt="Profile" />
      </div>
      <div className="profile-info">
        <h3>João Silva</h3>
        <p>ID: 123456</p>
        <p>Membro desde<br/>15 de Março de 2020</p>
        <p>Gênero favorito<br/>------------</p>
        <p>Livro favorito<br/>------------</p>
        <p>Autor favorito<br/>------------</p>
      </div>
      <button className="logout-btn">Sair</button>
    </div>
  );
}

export default Profile;