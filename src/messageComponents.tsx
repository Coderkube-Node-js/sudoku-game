import React from 'react';

const ShowMessage = ({message}) => {
  return (
    <div className="winner-container">
      <div className="winner-message">
        <h2>Congratulations!</h2>
        <p>{message}</p>
      </div>
      <button className="restart-btn" onClick={onRestartGame}>
        Start New Game
      </button>
    </div>
  );
};

export default ShowMessage;
