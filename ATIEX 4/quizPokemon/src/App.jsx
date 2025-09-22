import React from "react";
import "./App.css";

// Aqui você pode trocar as URLs das imagens, coloque URLs de imagens que quiser
const images = {
  bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  // birdBlue: "https://cdn.iconscout.com/icon/free/png-256/bird-1046-433419.png",
  // birdYellow: "https://cdn.iconscout.com/icon/free/png-256/yellow-bird-1605.png",
  // treeLeft: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
  // treeRight: "https://cdn-icons-png.flaticon.com/512/427/427744.png",
  // bush: "https://cdn-icons-png.flaticon.com/512/427/427737.png",
  background: "./assets/img/fundoTelaInicial.png",
};

function App() {
  return (
    <div className="container" style={{ backgroundImage: `url(${images.background})` }}>
      <img
        src={images.treeLeft}
        alt="tree left"
        className="tree left"
        draggable={false}
      />
      <img
        src={images.treeRight}
        alt="tree right"
        className="tree right"
        draggable={false}
      />
      <h1 className="title">DESCUBRA<br />SEU<br />CURSO</h1>
      <p className="press">PRESS START</p>

      <div className="characters">
        <img
          src={images.bulbasaur}
          alt="bulbasaur"
          className="character bulbasaur"
          draggable={false}
        />
        <img
          src={images.squirtle}
          alt="squirtle"
          className="character squirtle"
          draggable={false}
        />
        <img
          src={images.charmander}
          alt="charmander"
          className="character charmander"
          draggable={false}
        />
        <img
          src={images.pikachu}
          alt="pikachu"
          className="character pikachu"
          draggable={false}
        />
      </div>

      <div className="birds">
        <img
          src={images.birdBlue}
          alt="bird blue"
          className="bird blue"
          draggable={false}
        />
        <img
          src={images.birdYellow}
          alt="bird yellow"
          className="bird yellow"
          draggable={false}
        />
      </div>

      <img src={images.bush} alt="bush" className="bush left" draggable={false} />
      <img src={images.bush} alt="bush" className="bush right" draggable={false} />
    </div>
  );
}

export default App;