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

let categories = ["To-Do", "In Progress", "Done"]; // Default categories

function openTaskInput() {
  populateCategoryDropdown(); // Populate the dropdown with available categories
  document.getElementById("task-modal").style.display = "block";
}

function closeTaskInput() {
  document.getElementById("task-modal").style.display = "none";
}

function openCategoryInput() {
  document.getElementById("category-modal").style.display = "block";
}

function closeCategoryInput() {
  document.getElementById("category-modal").style.display = "none";
}

function addTask() {
  const taskDescription = document.getElementById("new-task-input").value;
  const selectedCategory = document.getElementById("task-category").value;

  if (taskDescription) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.textContent = taskDescription;

    // Add task to the selected category
    document.getElementById(`${selectedCategory.toLowerCase()}-tasks`).appendChild(taskElement);
    closeTaskInput();
  } else {
    alert("Please enter a task description.");
  }
}

function addCategory() {
  const newCategoryName = document.getElementById("new-category-input").value;

  if (newCategoryName && !categories.includes(newCategoryName)) {
    categories.push(newCategoryName);
    
    // Dynamically create new category section on the board
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    categoryDiv.id = newCategoryName.toLowerCase().replace(/\s+/g, '-');
    categoryDiv.ondrop = drop;
    categoryDiv.ondragover = allowDrop;
    
    const categoryHeader = document.createElement("h2");
    categoryHeader.textContent = newCategoryName;
    categoryDiv.appendChild(categoryHeader);
    
    const taskListDiv = document.createElement("div");
    taskListDiv.className = "task-list";
    taskListDiv.id = `${newCategoryName.toLowerCase().replace(/\s+/g, '-')}-tasks`;
    categoryDiv.appendChild(taskListDiv);
    
    document.querySelector(".board").appendChild(categoryDiv);
    
    // Refresh dropdown with the new category
    populateCategoryDropdown();
    closeCategoryInput();
  } else {
    alert("Please enter a unique category name.");
  }
}

function populateCategoryDropdown() {
  const categoryDropdown = document.getElementById("task-category");
  categoryDropdown.innerHTML = ""; // Clear existing options

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.toLowerCase().replace(/\s+/g, '-');
    option.textContent = category;
    categoryDropdown.appendChild(option);
  });
}

// Drag and Drop functions
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

