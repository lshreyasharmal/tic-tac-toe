import React, { useState } from 'react';

export function Square({ value, onSquareClick }) {

  return <button className='square' onClick={onSquareClick}>{value}</button>;
}


export function Board({ turn, board, onPlay }) {

  function handleClick(i) {
    if (board[i] || calculateWinner(board)) {
      return;
    }
    const boardCopy = board.slice();
    if (turn) {
      boardCopy[i] = 'X';
    } else {
      boardCopy[i] = 'O'
    }
    onPlay(boardCopy);
  }

  const winner = calculateWinner(board);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (turn ? 'X' : 'O');
  }


  return (
    <div>
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={board[0]} onSquareClick={() => handleClick(0)} />
        <Square value={board[1]} onSquareClick={() => handleClick(1)} />
        <Square value={board[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={board[3]} onSquareClick={() => handleClick(3)} />
        <Square value={board[4]} onSquareClick={() => handleClick(4)} />
        <Square value={board[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={board[6]} onSquareClick={() => handleClick(6)} />
        <Square value={board[7]} onSquareClick={() => handleClick(7)} />
        <Square value={board[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoard = history[currentMove];
  const turn = currentMove % 2 === 0;

  function handlePlay(boardCopy) {
    const nextHistory = [...history.slice(0, currentMove + 1), boardCopy];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((board, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board turn={turn} board={currentBoard} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}


export function calculateWinner(board) {
  const linesToBeChecked = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < linesToBeChecked.length; i++) {
    const [a, b, c] = linesToBeChecked[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}