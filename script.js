document.addEventListener("DOMContentLoaded", loadTasks);

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.target.classList.add("dragging");
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const taskElement = document.getElementById(taskId);
  event.target.closest(".task-list").appendChild(taskElement);
  taskElement.classList.remove("dragging");
  saveTasks();
}

// Open and close modals
function openTaskInput() {
  document.getElementById("task-modal").style.display = "flex";
}

function closeTaskInput() {
  document.getElementById("task-modal").style.display = "none";
}

function openCategoryInput() {
  document.getElementById("category-modal").style.display = "flex";
}

function closeCategoryInput() {
  document.getElementById("category-modal").style.display = "none";
}

// Add a new task to the "To-Do" category
function addTask() {
  const taskInput = document.getElementById("new-task-input");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const taskElement = createTaskElement(taskText);
    document.getElementById("todo-tasks").appendChild(taskElement);
    saveTasks();
    taskInput.value = ""; // Clear input after adding
    closeTaskInput(); // Close the modal
  } else {
    alert("Please enter a task description.");
  }
}

// Create a task element with draggable attributes
function createTaskElement(taskText, taskId = Date.now()) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.setAttribute("id", taskId);
  taskElement.setAttribute("draggable", true);
  taskElement.ondragstart = drag;
  taskElement.ondragend = () => taskElement.classList.remove("dragging");

  // Set task text
  const textNode = document.createElement("span");
  textNode.textContent = taskText;
  taskElement.appendChild(textNode);

  // Add delete button to task
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "✕";
  deleteButton.className = "delete-btn";
  deleteButton.onclick = () => {
    taskElement.remove();
    saveTasks();
  };
  taskElement.appendChild(deleteButton);

  return taskElement;
}

// Save all tasks in each category to localStorage
function saveTasks() {
  const categories = Array.from(document.querySelectorAll('.task-list'));
  const tasks = {};

  categories.forEach(category => {
    const categoryName = category.id;
    tasks[categoryName] = Array.from(category.children).map(task => ({
      id: task.id,
      text: task.querySelector("span").textContent,
    }));
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    Object.keys(savedTasks).forEach(category => {
      savedTasks[category].forEach(taskData => {
        const taskElement = createTaskElement(taskData.text, taskData.id);
        document.getElementById(category).appendChild(taskElement);
      });
    });
  }
}

// Add a new category dynamically
function addCategory() {
  const categoryInput = document.getElementById("new-category-input");
  const categoryName = categoryInput.value.trim();

  if (categoryName && !document.getElementById(`${categoryName.toLowerCase()}-tasks`)) {
    const board = document.querySelector(".board");

    // Create new category column
    const category = document.createElement("div");
    category.classList.add("category");

    // Set up the new category ID and structure
    const taskListId = `${categoryName.toLowerCase()}-tasks`;
    category.innerHTML = `
      <h2>${categoryName}</h2>
      <div class="task-list" id="${taskListId}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    `;

    board.appendChild(category);
    categoryInput.value = ""; // Clear input after adding
    closeCategoryInput(); // Close the modal
  } else {
    alert("Please enter a valid category name or use a unique category name.");
  }
}
