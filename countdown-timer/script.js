console.log("HELLO FROM HEMANT");

const inputDate = document.querySelector("#date-input");
const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minEL = document.getElementById("mins");
const secEl = document.getElementById("secs");

let timer = null;
inputDate.addEventListener("change", function (e) {
  if (!inputDate.value) {
    return;
  }

  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  setTimer(inputDate.value);
});

function setTimer(selectedDate) {
  timer = setInterval(function () {
    updateTimer(selectedDate);
  }, 1000);
}

function updateTimer(selectedDate) {
  let now = new Date().getTime();
  let date = new Date(selectedDate).getTime();
  let distance = date - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  console.log(days, hours, minutes, seconds);

  if (now >= date) {
    clearInterval(timer);
    dayEl.innerText = "D";
    hourEl.innerText = "O";
    minEL.innerText = "N";
    secEl.innerText = "E";
  } else {
    dayEl.innerText = days;
    hourEl.innerText = hours;
    minEL.innerText = minutes;
    secEl.innerText = seconds;
  }
}
