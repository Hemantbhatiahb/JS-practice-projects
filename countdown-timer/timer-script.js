let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");
let hourDiv = document.getElementById("hour-div");
let minDiv = document.getElementById("min-div");
let secDiv = document.getElementById("sec-div");

let seconds = 120;
let timer = null;
startBtn.addEventListener("click", function (e) {
  if (!timer) {
    startBtn.innerText = "PAUSE";
    startCountDown();
  } else {
    startBtn.innerText = "START";
    clearInterval(timer);
    timer = null;
  }
});

function startCountDown() {
  updateTimer();

  timer = setInterval(() => {
    updateTimer();
  }, 100);
}

function updateTimer() {
  let hours = Math.floor(seconds / 3600);
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  console.log("Hours: " + hours + " mins:" + mins + " secs " + secs);
  hourDiv.innerText = hours.toString().padStart(2, "0");
  minDiv.innerText = mins.toString().padStart(2, "0");
  secDiv.innerText = secs.toString().padStart(2, "0");
  seconds--;

  if (seconds < 0) {
    handleReset();
  }
}

resetBtn.addEventListener("click", function (e) {
  handleReset();
});

function handleReset() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  seconds = 300;
  startBtn.innerText = "START";
  hourDiv.innerText = "00";
  minDiv.innerText = "00";
  secDiv.innerText = "00";
}
