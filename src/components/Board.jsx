// src/components/Board.js
import React, { useState, useEffect } from 'react';
import Square from './Square';

const Board = ({ mode, difficulty, onScoreUpdate }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (mode === 'bot' && !xIsNext) {
      const botMove = calculateBotMove(squares, difficulty);
      if (botMove !== -1) {
        const timer = setTimeout(() => {
          handleClick(botMove);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [xIsNext, mode, squares, difficulty]);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
      onScoreUpdate(winner);
      setTimeout(resetBoard, 2000);
    } else if (!squares.includes(null)) {
      setStatus('Match Tied');
      onScoreUpdate('tie');
      setTimeout(() => {
        resetBoard();
      }, 2000);
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [squares]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="reset-button" onClick={resetBoard}>Reset Game</button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateBotMove(squares, difficulty) {
  switch (difficulty) {
    case 'easy':
      return randomMove(squares);
    case 'medium':
      return firstAvailableMove(squares);
    default:
      return -1;
  }
}

function randomMove(squares) {
  const emptySquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);
  return emptySquares.length > 0 ? emptySquares[Math.floor(Math.random() * emptySquares.length)] : -1;
}

function firstAvailableMove(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return i;
    }
  }
  return -1;
}

function minimaxMove(squares) {
  // Minimax algorithm to determine the best move
  const bestMove = minimax(squares, true);
  return bestMove.index;
}



export default Board;
