document.getElementById("add-btn").addEventListener("click", addTask);
document
  .getElementById("todo-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function addTask() {
  const taskInput = document.getElementById("todo-input");
  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
        <span onclick="toggleDone(event)">${taskInput.value}</span>
        <button class="delete-btn" onclick="deleteTask(event)">Delete</button>
    `;
  document.getElementById("todo-list").appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function toggleDone(event) {
  event.target.parentElement.classList.toggle("done");
  saveTasks();
}

function deleteTask(event) {
  event.target.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#todo-list li")).map(
    (li) => ({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done"),
    })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const todoList = document.getElementById("todo-list");
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleDone(event)">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(event)">Delete</button>
    `;
    if (task.done) li.classList.add("done");
    todoList.appendChild(li);
  });
}

loadTasks();
