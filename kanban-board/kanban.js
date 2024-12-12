class KanbanBoard {
  constructor(selector) {
    this.parentContainer = document.querySelector(selector);
    this.db = {
      boards: JSON.parse(localStorage.getItem("boards")) || [],
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    };
  }

  addBoard() {
    const title = prompt("Board Name");
    if (!title || title.trim() == "") return;
    const newBoard = {
      id: this._generateUniqueId(),
      title: title.toUpperCase(),
      createdAt: Date.now(),
    };
    this.db.boards.push(newBoard);
    console.log(this.db.boards);

    localStorage.setItem("boards", JSON.stringify(this.db.boards));
    this.renderUI();
  }

  addTask(boardId) {
    const title = prompt("Task Name");
    if (!title || title.trim() == "") return;
    const newTask = {
      id: this._generateUniqueId(),
      title: title,
      createdAt: Date.now(),
      boardId: boardId,
    };
    this.db.tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(this.db.tasks));
    this.renderUI();
  }

  renderUI() {
    const fragment = this.renderBoards();
    this.parentContainer.innerHTML = "";
    this.parentContainer.appendChild(fragment);
  }

  renderBoards() {
    const fragment = document.createDocumentFragment();
    const section = document.createElement("section");
    section.className = "lanes";

    for (let board of this.db.boards) {
      const boardDiv = document.createElement("div");
      boardDiv.className = "lane";
      boardDiv.id = board.id;

      const headingDiv = document.createElement("div");
      headingDiv.className = "heading";

      const heading = document.createElement("h1");
      heading.className = "title";
      heading.innerText = board.title;
      const removeBoardBtn = document.createElement("button");
      removeBoardBtn.className = "remove-btn";
      removeBoardBtn.innerText = "❌";

      headingDiv.appendChild(heading);
      headingDiv.appendChild(removeBoardBtn);

      removeBoardBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const board = removeBoardBtn.closest('.lane');
        const boardId = board.id;

        this.db.boards = this.db.boards.filter((board) => board.id != boardId);
        this.db.tasks = this.db.tasks.filter(task => task.boardId != boardId)
        
        board.remove();
        localStorage.setItem("boards", JSON.stringify(this.db.boards));
        localStorage.setItem('tasks', JSON.stringify(this.db.tasks))
      });

      const taskBtn = document.createElement("button");
      taskBtn.className = "task-btn";
      taskBtn.innerText = "+ Add";

      boardDiv.appendChild(headingDiv);
      boardDiv.appendChild(taskBtn);

      this.attachDropEvents.call(this, boardDiv);

      taskBtn.addEventListener("click", (e) => {
        this.addTask(board.id);
      });

      this.renderTasks(board.id, boardDiv);
      section.appendChild(boardDiv);
    }

    const addBoardBtn = document.createElement("button");
    addBoardBtn.className = "add-board";
    addBoardBtn.innerText = "+ Board";

    addBoardBtn.addEventListener("click", this.addBoard.bind(this));

    section.appendChild(addBoardBtn);
    fragment.appendChild(section);
    return fragment;
  }

  renderTasks(boardId, boardDiv) {
    const tasks = this._getTaskByBoardId(boardId);

    for (let task of tasks) {
      const p = document.createElement("p");
      p.innerText = task.title;
      p.id = task.id;
      p.classList.add("task");
      p.setAttribute("draggable", "true");

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.innerText = "❌";
      p.appendChild(removeBtn);

      this.attachDragEvents.call(this, p);

      // TODO: remove task from board and localstorage
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const task = removeBtn.parentElement;
        const taskId = task.id;

        this.db.tasks = this.db.tasks.filter((task) => task.id != taskId);
        task.remove();
        localStorage.setItem("tasks", JSON.stringify(this.db.tasks));
      });

      boardDiv.appendChild(p);
    }
  }

  attachDragEvents(task) {
    task.addEventListener("dragstart", function (e) {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", (e) => {
      task.classList.remove("is-dragging");

      const baordId = task.parentElement.id;
      const taskId = task.id;

      const index = this.db.tasks.findIndex((task) => task.id == taskId);
      this.db.tasks[index].boardId = baordId;
      localStorage.setItem("tasks", JSON.stringify(this.db.tasks));
    });
  }

  attachDropEvents(board) {
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

    board.addEventListener("dragover", function (e) {
      e.preventDefault();
      board.classList.add("drag-over");

      const curTask = document.querySelector(".is-dragging");
      let bottomTask = insertAboveTask(board, e.clientY);
      if (bottomTask == null) {
        board.appendChild(curTask);
      } else {
        board.insertBefore(curTask, bottomTask);
      }
    });

    board.addEventListener("dragleave", function (e) {
      board.classList.remove("drag-over");
    });

    board.addEventListener("drop", function (e) {
      e.preventDefault();
      board.classList.remove("drag-over");
    });
  }

  _getTaskByBoardId(boardId) {
    return this.db.tasks.filter((task) => task.boardId === boardId);
  }

  _generateUniqueId() {
    return Math.random().toString(16).substring(2);
  }
}

const kanban = new KanbanBoard(".container");
kanban.renderUI();
