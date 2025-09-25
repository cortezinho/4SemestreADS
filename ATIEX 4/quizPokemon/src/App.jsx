import React from "react";
import "./App.css";

const images = {
  bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  zubat: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
};


function App() {
  return (
    <div className="container">
      <h1 className="title">DESCUBRA<br />SEU<br />CURSO</h1>
      <p className="press">PRESS START</p>

      <div className="pokemons">
        <img
          src={images.bulbasaur}
          alt="bulbasaur"
          className="bulbasaur flip-right"
          draggable={false}
        />
        <img
          src={images.charmander}
          alt="charmander"
          className="charmander flip-right"
          draggable={false}
        />
        <img
          src={images.pikachu}
          alt="pikachu"
          className="pikachu"
          draggable={false}
        />
      </div>

      <div className="zubats">
        <img src={images.zubat} alt="zubat" className="zubat" draggable={false} />
      </div>

      <div className="pokemons">
        <img
        src={images.squirtle}
        alt="squirtle"
        className="character squirtle flip-right"
        draggable={false}
      />
      </div>
    </div>
  );
}

export default App;
