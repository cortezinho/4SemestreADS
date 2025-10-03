import React from 'react';

function Character({ src, alt, className }) {
  return (
    <img src={src} alt={alt} className={className} draggable={false} />
  );
}

export default Character;