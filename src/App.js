import './App.css';
import { useEffect, useState } from 'react';
import Square from './components/Square';
import {Patterns} from './Patterns';
function App() {
  
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [player, setPlayer] = useState("0");
  const [result, setResult] = useState({winner: "none", state: "none"});

  useEffect(() => {
    checkWin();
    if(player == "X")
        setPlayer("O");
      else
        setPlayer("X");
    checkFull();
  }, [board]);

  useEffect(() => {
    if(result.state == "draw"){
      alert("Draw!");
      restartGame();
    }
    else
    if(result.state !== "none"){
      alert(`Game finished! Winning player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setResult({winner: "none", state: "none"});
  }

  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
      if(idx === square && val === ""){
        return player;
      }
      return val;
      })
    );
      
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if(firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if(board[idx] !== firstPlayer){
          foundWinningPattern = false;
        }
      });
      if(foundWinningPattern){
        //alert(firstPlayer + " has won");
        setResult({winner: player, state: "won"});
      }
    });
  }

  const checkFull = () => {
    for(let i = 0; i < board.length; i++){
      if(board[i] === "") return false;
    }
    if(result.state === "none")
    setResult({winner: "No one", state: "draw"});
  }

  return (
    <div className = "App">
      <div className="board">
        <div className="row">
          <Square value={board[0]} chooseSquare={() => {chooseSquare(0)}} />
          <Square value={board[1]} chooseSquare={() => {chooseSquare(1)}} />
          <Square value={board[2]} chooseSquare={() => {chooseSquare(2)}} />
        </div>
        <div className="row">
          <Square value={board[3]} chooseSquare={() => {chooseSquare(3)}} />
          <Square value={board[4]} chooseSquare={() => {chooseSquare(4)}} />
          <Square value={board[5]} chooseSquare={() => {chooseSquare(5)}} />
        </div>
        <div className="row">
          <Square value={board[6]} chooseSquare={() => {chooseSquare(6)}} />
          <Square value={board[7]} chooseSquare={() => {chooseSquare(7)}} />
          <Square value={board[8]} chooseSquare={() => {chooseSquare(8)}} />
        </div>
      </div>
    </div>
  );
}

export default App;
