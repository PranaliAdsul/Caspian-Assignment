// Variable Declarations
const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-button");
const incompleteTasksHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

// Add a new task
const addTask = () => {
  const taskString = taskInput.value.trim();
  if (taskString === "") return;
  
  const listItem = createNewTaskElement(taskString);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
  taskInput.value = "";
};

// Create New Task Element
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <input type="checkbox">
    <label>${taskString}</label>
    <input type="text">
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;
  return listItem;
};

// Edit or Delete an existing task
const editOrDeleteTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const containsClass = listItem.classList.contains("editMode");

  if (this.classList.contains("edit")) {
    if (containsClass) {
      label.innerText = editInput.value;
    } else {
      editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
  } else if (this.classList.contains("delete")) {
    listItem.parentNode.removeChild(listItem);
  }
};

// Mark a task as complete or incomplete
const toggleTaskCompletion = function () {
  const listItem = this.parentNode;
  const targetList = listItem.parentNode.id === "incomplete-tasks" ? completedTasksHolder : incompleteTasksHolder;
  
  targetList.appendChild(listItem);
  bindTaskEvents(listItem);
};

// Bind task events to list item's children
const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  checkBox.addEventListener("change", toggleTaskCompletion);
  editButton.addEventListener("click", editOrDeleteTask);
  deleteButton.addEventListener("click", editOrDeleteTask);
};

// Event Listeners
addButton.addEventListener("click", addTask);

// Cycle over incomplete tasks
Array.from(incompleteTasksHolder.children).forEach((taskListItem) => {
  bindTaskEvents(taskListItem);
});

// Cycle over completed tasks
Array.from(completedTasksHolder.children).forEach((taskListItem) => {
  bindTaskEvents(taskListItem);
});
