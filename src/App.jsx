import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const players = { X: "Player 1", O: "Player 2" };

function gameTurns(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function getGameBoard(playerTurns) {
  let gameBoard = [...initialGameBoard.map((item) => [...item])];

  for (const turn of playerTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function getWinner(gameBoard, playerName) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol == secondSymbol &&
      firstSymbol == thirdSymbol
    ) {
      winner = playerName[firstSymbol];
    }
  }

  return winner;
}

function App() {
  const [playerName, setPlayerName] = useState(players);
  const [playerTurns, setPlayerTurns] = useState([]);

  const activePlayer = gameTurns(playerTurns);

  const gameBoard = getGameBoard(playerTurns);

  const winner = getWinner(gameBoard, playerName);

  const hasDraw = playerTurns.length == 9 && !winner;

  function selectBox(rowIndex, colIndex) {
    setPlayerTurns((prevTurn) => {
      const currentPlayer = gameTurns(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  function resetGame() {
    setPlayerTurns([]);
  }

  function changePlayerName(symbol, playerName) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: playerName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            defaultName={players.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={changePlayerName}
          />
          <Player
            defaultName={players.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={changePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onReset={resetGame} />
        )}
        <GameBoard clickBox={selectBox} board={gameBoard} />
      </div>
      <Log turns={playerTurns} />
    </main>
  );
}

export default App;
