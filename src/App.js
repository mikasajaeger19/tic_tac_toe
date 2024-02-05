import React, { useEffect, useState } from 'react';
import Square from './components/Square';
import { Patterns } from './Patterns';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: firstPlayer, state: "won" });
      }
    });
  };

  const checkFull = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") return false;
    }
    if (result.state === "none") setResult({ winner: "No one", state: "draw" });
    return true;
  };

  useEffect(() => {
    checkWin();
    if (!checkFull()) {
      setPlayer(player === "X" ? "O" : "X");
    }
  }, [board, checkFull, checkWin, player]);

  useEffect(() => {
    if (result.state === "draw") {
      alert("Draw!");
      restartGame();
    } else if (result.state === "won") {
      alert(`Game finished! Winning player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setResult({ winner: "none", state: "none" });
  };

  const chooseSquare = (square) => {
    if (board[square] === "" && result.state === "none") {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[square] = player;
        return newBoard;
      });
    }
  };

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          {[0, 1, 2].map((idx) => (
            <Square key={idx} value={board[idx]} chooseSquare={() => chooseSquare(idx)} />
          ))}
        </div>
        <div className="row">
          {[3, 4, 5].map((idx) => (
            <Square key={idx} value={board[idx]} chooseSquare={() => chooseSquare(idx)} />
          ))}
        </div>
        <div className="row">
          {[6, 7, 8].map((idx) => (
            <Square key={idx} value={board[idx]} chooseSquare={() => chooseSquare(idx)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
