// src/components/Game.js
import React, { useState } from 'react';
import Board from './Board';




const Game = () => {
  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [scores, setScores] = useState({ playerX: 0, playerO: 0, ties: 0 });

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const handleScoreUpdate = (result) => {
    if (result === 'X') {
      setScores(prevScores => ({ ...prevScores, playerX: prevScores.playerX + 1 }));
    } else if (result === 'O') {
      setScores(prevScores => ({ ...prevScores, playerO: prevScores.playerO + 1 }));
    } else {
      setScores(prevScores => ({ ...prevScores, ties: prevScores.ties + 1 }));
    }
  };

  const handleBackToMenu = () => {
    setMode(null);
    setDifficulty(null);
  };

  const renderModeSelection = () => (
    <div className="mode-selection">
      <button onClick={() => handleModeSelection('friend')}>Play with a Friend</button>
      <button onClick={() => handleModeSelection('bot')}>Play with a Bot</button>
    </div>
  );

  const renderDifficultySelection = () => (
    <div className="difficulty-selection">
      <h2>Select Difficulty</h2>
      <button onClick={() => handleDifficultySelection('easy')}>Easy</button>
      <button onClick={() => handleDifficultySelection('medium')}>Medium</button>
      <button onClick={() => handleDifficultySelection('hard')}>Hard</button>
    </div>
  );

  return (
    <div className="game">
      <div className="game-scores">
        <div>Player X: {scores.playerX}</div>
        <div>Player O: {scores.playerO}</div>
        <div>Ties: {scores.ties}</div>
      </div>
      <div className="game-board">
        {!mode ? renderModeSelection() : mode === 'bot' && !difficulty ? renderDifficultySelection() : <Board mode={mode} difficulty={difficulty} onScoreUpdate={handleScoreUpdate} />}
      </div>
      {(mode || difficulty) && <button className="back-button" onClick={handleBackToMenu}>Back to Menu</button>}
    </div>
  );
};

export default Game;
