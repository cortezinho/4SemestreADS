import React from 'react';

function BackgroundWrapper({ backgroundImg, children }) {
  return (
    <div
      className="app-wrapper"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}

export default BackgroundWrapper;
