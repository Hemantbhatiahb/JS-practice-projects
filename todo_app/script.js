let draggedItem = null;

document.querySelectorAll(".section").forEach((section) => {
  const form = section.querySelector(".form");
  const todoList = section.querySelector(".todo-list");
  const input = section.querySelector(".user-input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = input.value.trim();
    if (!value) {
      alert("BRUH! Are you all right?");
      return;
    }

    addTodoItem(todoList, value);
    input.value = "";
  });
});

function addTodoItem(todoList, value) {
  const listItem = document.createElement("li");
  listItem.innerText = value;
  listItem.classList.add("todo-item");
  listItem.setAttribute("draggable", "true");

  const removeButton = document.createElement("button");
  removeButton.innerText = "❌";
  removeButton.addEventListener("click", function (e) {
    e.stopPropagation();
    listItem.remove();
  });

  listItem.appendChild(removeButton);
  todoList.appendChild(listItem);

  setupDragEvents(listItem);
}

function setupDragEvents(item) {
  item.addEventListener("dragstart", function (e) {
    draggedItem = e.target;
    dragged.classList.add("dragging");
  });

  item.addEventListener("dragend", function (e) {
    draggedItem = null;
    e.target.classList.remove("dragging");
  });
}

document.querySelectorAll(".dropzone").forEach((dropZone) => {
  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.target.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", function (e) {
    e.target.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    e.target.classList.remove("dragover");
    if (draggedItem) {
      dropZone.appendChild(draggedItem);
    }
  });
});
