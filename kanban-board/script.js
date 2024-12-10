const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".lane");
const addTaskBtns = document.querySelectorAll(".task-btn");
const addBoardBtn = document.getElementById("boardBtn");
const lanes = document.querySelector(".lanes");
draggables.forEach((task) => {
  attachDragEvents(task);
});

droppables.forEach((lane) => {
  attachDroppableEvents(lane);
});

addTaskBtns.forEach((button) => {
  attachAddTaskEvents(button);
});

addBoardBtn.addEventListener("click", function (e) {
  const title = prompt("Add Board Title");
  if (title == null || title.trim() === "") return;

  const board = createBoard(title);
  lanes.appendChild(board);
});

function createBoard(title) {
  const board = document.createElement("div");
  board.className = "lane";

  const heading = document.createElement("h1");
  heading.classList.add("title");
  heading.innerHTML = title;

  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("task-btn");
  addTaskBtn.innerHTML = "+ Add";

  board.appendChild(heading);
  board.appendChild(addTaskBtn);
  attachDroppableEvents(board);
  attachAddTaskEvents(addTaskBtn);

  return board;
}

function attachAddTaskEvents(addBtn) {
  addBtn.addEventListener("click", function (e) {
    const taskName = prompt("Add Task");
    if (!taskName || taskName.trim() === "") return;

    const zone = addBtn.closest(".lane");
    const li = createTask(taskName);
    zone.appendChild(li);
  });
}

function createTask(name) {
  const li = document.createElement("p");
  li.innerText = name;
  li.classList.add("task");
  li.setAttribute("draggable", "true");

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "❌";
  removeBtn.classList.add("remove-task-btn");
  li.appendChild(removeBtn);

  handleRemoveTask(removeBtn);
  attachDragEvents(li);
  return li;
}

function handleRemoveTask(btn) {
  btn.addEventListener("click", (e) => {
    const task = e.target.closest(".task");
    task.remove();
  });
}

function attachDragEvents(element) {
  element.addEventListener("dragstart", function (e) {
    element.classList.add("is-dragging");
  });

  element.addEventListener("dragend", function (e) {
    element.classList.remove("is-dragging");
  });
}

function attachDroppableEvents(lane) {
  lane.addEventListener("dragover", function (e) {
    e.preventDefault();
    lane.classList.add("drag-over");

    const curTask = document.querySelector(".is-dragging");
    let bottomTask = insertAboveTask(lane, e.clientY);

    if (bottomTask == null) {
      lane.appendChild(curTask);
    } else {
      lane.insertBefore(curTask, bottomTask);
    }
  });

  lane.addEventListener("dragleave", function (e) {
    lane.classList.remove("drag-over");
  });

  lane.addEventListener("drop", function (e) {
    e.preventDefault();
    lane.classList.remove("drag-over");
  });
}

function insertAboveTask(zone, mouseY) {
  const tasks = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  tasks.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
}
