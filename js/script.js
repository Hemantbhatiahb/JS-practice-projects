const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellItems = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement  = document.getElementById('winning_message_div')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton') ;

let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  cellItems.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click',handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show')
}

restartButton.addEventListener('click', startGame) ;

function handleClick(e) {
  const cell = e.target;

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // register the click
  placeMark(cell, currentClass);

  if(checkWin(currentClass)) {
    endGame(false)
  } else if( isDraw()) {
    endGame(true)
  } else {
    swapTurn();
    setBoardHoverClass();
  }

}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}


function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination  => {
        return combination.every(index => {
            return cellItems[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellItems].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw) {
    console.log(draw)
    if(draw) {
        winningMessageTextElement.innerText ="Draw"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins`
    }
    winningMessageElement.classList.add('show')
}