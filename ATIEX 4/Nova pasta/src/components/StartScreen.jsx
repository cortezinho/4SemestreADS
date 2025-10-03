// src/components/StartScreen.jsx
import React from 'react';
import PressStartTitle from './PressStartTitle';
import Character from './Character';
import images from '../data/images';
import backgrounds from '../assets/backgrounds/intro-bg.png';

function StartScreen({ onStart }) {
  return (
    <div
      className="container start"
      style={{ backgroundImage: `url(${backgrounds})` }}
      onClick={onStart}
    >
      <PressStartTitle />
      <Character src={images.squirtle} alt="Squirtle" className="character squirtle flip-right" />
      <Character src={images.bulbasaur} alt="Bulbasaur" className="bulbasaur flip-right" />
      <Character src={images.charmander} alt="Charmander" className="charmander flip-right" />
      <Character src={images.pikachu} alt="Pikachu" className="pikachu" />
    </div>
  );
}

export default StartScreen;