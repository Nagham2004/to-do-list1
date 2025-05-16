let form = document.querySelector("form");
let input = document.querySelector("input");
let clearBtn = document.getElementById("clear-btn");
let tasksEmptyDiv = document.querySelector(".tasks-empty");
let list = document.querySelector(".list");
let alertArea = document.getElementById("alert-area");
let tasksCountSpan = document.querySelector(".c-tasks-count");
let tasksDoneSpan = document.querySelector(".c-tasks-done");

window.onload = () => {
  input.focus();
  loadTasks();
};

form.onsubmit = function (e) {
  e.preventDefault();
  let value = input.value.trim();
  if (value) {
    let text = value[0].toUpperCase() + value.slice(1);
    addTask(text);
    input.value = "";
    input.focus();
    updateUI();
    saveTasks();
  } else {
    showAlert("Please Insert Value!");
  }
};

clearBtn.onclick = function () {
  list.innerHTML = "";
  updateUI();
  saveTasks();
};

function addTask(text) {
  let li = document.createElement("li");
  li.classList.add("list-item");
  li.innerHTML = `
    <span class="task">${text}</span>
    <span class="del">X</span>
  `;
  list.appendChild(li);

  li.querySelector(".del").onclick = deleteTask;
  li.querySelector(".task").onclick = toggleDone;
}

function deleteTask(e) {
  e.target.parentNode.remove();
  updateUI();
  saveTasks();
}

function toggleDone(e) {
  e.target.classList.toggle("done");
  updateUI();
  saveTasks();
}

function updateUI() {
  tasksCountSpan.textContent = list.children.length;
  tasksDoneSpan.textContent = document.querySelectorAll(".done").length;
  tasksEmptyDiv.textContent = list.children.length === 0 ? "Tasks Empty" : "";
}

function showAlert(msg) {
  alertArea.innerHTML = `<div class="n-val">${msg}</div>`;
  setTimeout(() => {
    alertArea.innerHTML = "";
  }, 2000);
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".list-item").forEach(item => {
    let text = item.querySelector(".task").textContent;
    let done = item.querySelector(".task").classList.contains("done");
    tasks.push({ text, done });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => {
    let li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = `
      <span class="task ${task.done ? "done" : ""}">${task.text}</span>
      <span class="del">X</span>
    `;
    list.appendChild(li);
    li.querySelector(".del").onclick = deleteTask;
    li.querySelector(".task").onclick = toggleDone;
  });
  updateUI();
}

