import React from 'react';

function Profile() {
  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-image" alt="Profile" />
        <h2>João Silva</h2>
        <p>ID: 123456</p>
        <p>Membro desde 15 de Março de 2020</p>
      </div>
      <button className="logout-btn">Sair</button>
    </div>
  );
}

export default Profile;
