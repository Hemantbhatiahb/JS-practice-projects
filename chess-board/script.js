let length = 8;
let tr = [-1, -1, -1, 0, 1, 1, 1, 0];
let tc = [-1, 0, 1, 1, 1, 0, -1, -1];

const table = document.getElementById("table");
for (let i = 0; i < length; i++) {
  let white = Math.floor(i % 2 == 0) ? true : false;

  const tr = document.createElement("tr");
  for (let j = 0; j < length; j++) {
    const cell = document.createElement("td");
    cell.classList.add("cell");
    cell.classList.add(white ? "white" : "black");
    cell.setAttribute("id", `${i}-${j}`);
    cell.innerText = `${i}-${j}`;
    white = !white;
    tr.appendChild(cell);
  }
  table.appendChild(tr);
}

function resetBoard() {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      document.getElementById(`${i}-${j}`).classList.remove("red");
    }
  }
}

table.addEventListener("click", function (e) {
  resetBoard();
  const id = e.target.getAttribute("id");
  let [r, c] = id.split("-");
  r = parseInt(r);
  c = parseInt(c);

  // go in all directions and mark the queen path
  for (let i = -1; i < tr.length; i++) {
    let row = r + tr[i];
    let col = c + tc[i];
    console.log("row:", row, col);
    while (row >= 0 && row < length && col >= 0 && col < length) {
      const cell = document.getElementById(`${row}-${col}`);
      console.log("cell:", row, col);
      cell.classList.add("red");
      row = row + tr[i];
      col = col + tc[i];
    }
  }
});
