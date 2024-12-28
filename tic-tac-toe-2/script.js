const CIRCLE_CLASS = "circle";
const X_CLASS = "x";
const WINNING_COMBS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let cellDiv = document.querySelectorAll(".cell");
let board = document.getElementById("board");
let restartBtn = document.getElementById("restartButton");
let winningMessageDiv = document.getElementById("winningMessage");
let winningMessgeTextDiv = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

restartBtn.addEventListener("click", startGame);

startGame();
function startGame() {
  circleTurn = false;
  setBoardHoverClass();
  cellDiv.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  winningMessageDiv.classList.remove("show");
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  markCell(cell, currentClass);
  if (checkWin(currentClass)) {
    gameOver(false);
  } else if (isDraw()) {
    gameOver(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function markCell(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove("circle");
  board.classList.remove("x");
  if (circleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
}

function checkWin(currentClass) {
  return WINNING_COMBS.some((comb) =>
    comb.every((index) => {
      return cellDiv[index].classList.contains(currentClass);
    })
  );
}

function isDraw() {
  return [...cellDiv].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  );
}

function gameOver(draw) {
  if (draw) {
    winningMessgeTextDiv.innerText = "Draw";
  } else {
    winningMessgeTextDiv.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageDiv.classList.add("show");
}
