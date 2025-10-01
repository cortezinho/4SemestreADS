import React from 'react';
import images from '../data/images';

function StartScreen({ onStart }) {
    return (
        <div className="container start" onClick={onStart}>
            <h1 className="title">
                <span className="word delay1">DESCUBRA</span><br />
                <span className="word delay2">SEU</span><br />
                <span className="word delay3 end">CURSO</span>
            </h1>
            <p className="press">PRESS START</p>

            <img src={images.bulbasaur} alt="bulbasaur" className="bulbasaur flip-right" draggable={false} />
            <img src={images.charmander} alt="charmander" className="charmander flip-right" draggable={false} />
            <img src={images.pikachu} alt="pikachu" className="pikachu" draggable={false} />

            <div className="zubats">
                <img src={images.zubat} alt="zubat" className="zubat" draggable={false} />
            </div>

            <img src={images.squirtle} alt="squirtle" className="character squirtle flip-right" draggable={false} />
        </div>
    );
}

export default StartScreen;
