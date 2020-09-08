import React from 'react';
import GameComponent from './components/GameComponent'

function App() {
  return (
    <div>
      <div className='game-container'>
        <GameComponent />
      </div>
      <div className="footer-info">
        <p>By Wilfred Lopez</p>
        <a href="https://github.com/wilfredlopez/">Github @WilfredLopez</a>
      </div>
    </div>
  );
}

export default App;
