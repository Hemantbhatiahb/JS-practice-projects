const blocksLength = 3;
let score = 0;
let bestScore = 0;
let chances = 2;
let actualColor = "";
const mainSection = document.querySelector("main");
const randomColorEl = document.getElementById("random-color");
const colorBlocks = document.querySelectorAll(".color-block");
const resetButton = document.getElementById("reset-btn");
const scoreDiv = document.getElementById("score");
const bestScoreDiv = document.getElementById("best-score");
const gameEndWrapper = document.querySelector(".game-end-wrapper");
const gameEndScoreDiv = document.getElementById("score-end");
const gameEndBestScoreDiv = document.getElementById("best-score-end");

function newGame() {
  chances = 2;
  generateNewColor();
  setScores();
  mainSection.style.opacity = 1;
  gameEndWrapper.style.display = "none";
}

newGame();

colorBlocks.forEach((colorBlock) => {
  colorBlock.addEventListener("click", function (e) {
    chances--;
    let clickedColor = e.target.getAttribute("data-color");
    validateColor(clickedColor);
  });
});

function generateRandomColor() {
  let color = "#";
  const arr = "0123456789ABCDEF";
  for (let i = 1; i <= 6; i++) {
    let randomNum = Math.floor(Math.random() * arr.length);
    color += arr[randomNum];
  }
  return color;
}

function generateNewColor() {
  actualColor = generateRandomColor();
  randomColorEl.innerText = actualColor;
  setBlocksBackground(actualColor);
}

function setScores() {
  score = 0;
  scoreDiv.innerText = score;
  const curBestScore = localStorage.getItem("bestScore");
  if (curBestScore) {
    bestScoreDiv.innerText = curBestScore;
    bestScore = curBestScore;
  } else {
    bestScoreDiv.innerText = 0;
    localStorage.setItem("bestScore", 0);
  }
}

function updateScores() {
  scoreDiv.innerText = score;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    bestScoreDiv.innerText = bestScore;
  }
}

function validateColor(clickedColor) {
  if (clickedColor == actualColor) {
    chances = 2;
    score++;
    updateScores();
    generateNewColor();
    alert(`😎 CORRECT!! Score: ${score}`);
  } else if (chances == 0) {
    endGame();
  } else {
    alert(`🤨 Try Again: only ${chances} left`);
  }
}

function setBlocksBackground(color) {
  const randomBlock = Math.floor(Math.random() * 3);

  console.log(randomBlock, color);
  for (let i = 0; i < colorBlocks.length; i++) {
    if (i == randomBlock) {
      colorBlocks[i].style.background = color;
      colorBlocks[i].setAttribute("data-color", color);
    } else {
      const randColor = generateRandomColor();
      colorBlocks[i].setAttribute("data-color", randColor);
      colorBlocks[i].style.background = randColor;
    }
  }
}

resetButton.addEventListener("click", function () {
  newGame();
});

function endGame() {
  gameEndScoreDiv.innerText = score;
  gameEndBestScoreDiv.innerText = bestScore;

  mainSection.style.opacity = 0.3;
  gameEndWrapper.style.display = "flex";

  const newGameBtn = document.getElementById("new-game-btn");
  newGameBtn.addEventListener("click", function (e) {
    newGame();
  });
}
