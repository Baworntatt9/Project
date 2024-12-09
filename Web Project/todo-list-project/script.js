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
  if (taskInput.value.trim() === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
        <span onclick="toggleDone(event)">${taskInput.value}</span>
        <button class="delete-btn" onclick="deleteTask(event)">Delete</button>
    `;
  document.getElementById("todo-list").appendChild(li);
  taskInput.value = "";
}

function toggleDone(event) {
  event.target.parentElement.classList.toggle("done");
}

function deleteTask(event) {
  event.target.parentElement.remove();
}
