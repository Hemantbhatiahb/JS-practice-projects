let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const WINNING_COMBINATIONS = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

let cells, resetBtn, gameBoard, playerSymbol, clicks, winner, gameOver;

document.addEventListener("DOMContentLoaded", function () {
  resetBtn = document.querySelector(".restart-btn");
  resetBtn.addEventListener("click", () => resetGame());
  cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  init();
});

function init() {
  playerSymbol = "X";
  clicks = 0;
  winner = null;
  gameOver = false;
  gameBoard = [...initialGameBoard.map((innerArr) => [...innerArr])];
}

function handleCellClick(e) {
  if (e.target.hasAttribute("value") || gameOver) {
    return;
  }
  const cell = e.target;
  cell.innerText = playerSymbol;
  cell.setAttribute("value", playerSymbol);
  let [row, col] = cell.getAttribute("data-index").split("-");
  row = parseInt(row);
  col = parseInt(col);

  gameBoard[row][col] = playerSymbol;

  validateWon(++clicks);
  updatePlayerSymbol();
}

function validateWon(clicks) {
  for (let comb of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[comb[0].row][comb[0].col];
    let secondSymbol = gameBoard[comb[1].row][comb[1].col];
    let thirdSymbol = gameBoard[comb[2].row][comb[2].col];

    if (
      firstSymbol &&
      firstSymbol == secondSymbol &&
      firstSymbol == thirdSymbol
    ) {
      winner = firstSymbol;
      gameOver = true;
      comb.forEach(({ row, col }) => {
        document
          .querySelector(`[data-index="${row}-${col}"]`)
          .classList.add("winner");
      });
      setTimeout(() => {
        alert(`${firstSymbol} WON!`);
      }, 100);
      return;
    }
  }
  if (clicks === 9 && !winner) {
    gameOver = true;
    setTimeout(() => {
      alert("It's a draw!");
    }, 100);
    return;
  }
}

function updatePlayerSymbol() {
  playerSymbol = playerSymbol == "X" ? "O" : "X";
}

function resetGame() {
  init();
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.removeAttribute("value");
    cell.classList.remove("winner");
  });
}
