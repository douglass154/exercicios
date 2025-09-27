const iconTheme = document.querySelector(".theme");

const body = document.querySelector("body");
const backgroundImage = document.querySelector(".background-image img");
const createTaskContainer = document.querySelector(".create-task");
const todoListContainer = document.querySelector(".todo-list-container");
const todoList = document.querySelector(".todo-list");
const inputButtonCheck = document.querySelector(".create-task .btn-check");
const infosContainer = document.querySelector(".infos");
const textItemsLeft = document.querySelector(".items-left");
const notice = document.querySelector(".notice");

const getAllTasks = document.querySelector(".get-all-tasks");
const getActiveTasks = document.querySelector(".get-active-tasks");
const getCompletedTasks = document.querySelector(".get-completed-tasks");

const clearCompleted = document.querySelector(".clear-completed");

const taskInput = document.querySelector("#task-input");
let task = "";

let completed = false;
let itemsLeft = 0;

// ===================== DRAG AND DROP =====================

let sortableInstance = null;

const initSortable = () => {
   /* Initialize SortableJS on the todo list (mobile + desktop friendly).
   Destroys any previous instance to avoid duplicates. */

   if (typeof Sortable === undefined) return;
   if(sortableInstance) sortableInstance.destroy();

   sortableInstance = new Sortable(todoListContainer, {
      animation: 150,
      ghostClass: "dragging",
      draggable: ".todo", // only .todo elements are draggable (prevents .infos being dragged)
      onEnd: () => saveNewOrder()
   })
}

const saveNewOrder = () => {
   /* Save the current DOM order of .todo elements into localStorage.
   Reorders the stored tasks array to match what is rendered on the page. */

   const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
   const reorderedTasks = [];

   const todos = document.querySelectorAll(".todo");

   todos.forEach(todo => {
      const foundTask = localTasks.find(t => t.id === todo.id);
      if(foundTask) reorderedTasks.push(foundTask);
   })

   localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
}

// ===================== FUNCTIONS =====================

const changeIconTheme = theme => {
   /* Change the theme icon (sun/moon) based on the provided theme string. */

   if (theme == "dark") {
      iconTheme.src = "images/icon-sun.svg";
      iconTheme.classList.add("dark");
      return;
   }

   iconTheme.src = "images/icon-moon.svg";
   iconTheme.classList.remove("dark");
};

const changeBackgroundTheme = theme => { 
   /* Update the page background and UI classes to match the selected theme. */

   const buttonCheck = document.querySelectorAll(".btn-check");

   if (theme == "dark") {
      backgroundImage.src = "images/bg-desktop-dark.jpg";
      body.classList.remove("light");
      createTaskContainer.classList.remove("light");
      todoListContainer.classList.remove("light");
      infosContainer.classList.remove("light");
      notice.classList.remove("light");

      buttonCheck.forEach(button => {
         button.classList.remove("light");
      });

      return;
   }

   backgroundImage.src = "images/bg-desktop-light.jpg";
   body.classList.add("light");
   createTaskContainer.classList.add("light");
   todoListContainer.classList.add("light");
   infosContainer.classList.add("light");
   notice.classList.add("light");

   buttonCheck.forEach(button => {
      button.classList.add("light");
   });
};

const completeTask = (button, p = null) => {
   /* Toggle completion state for a task, update DOM visuals and persist changes. */

   const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
   const todo = button.closest(".todo");

   localTasks.forEach(localTask => {
      if (localTask.id === todo?.id) {
         localTask.isCompleted = !localTask.isCompleted;
      }
   });

   button.classList.toggle("checked");
   if (p !== null) p.classList.toggle("completed");

   if (button.classList.contains("checked")) {
      const img = document.createElement("img");
      img.src = "./images/icon-check.svg";
      button.appendChild(img);
   } else {
      button.innerHTML = "";
   }

   localStorage.setItem("tasks", JSON.stringify(localTasks));
   countItemsLeft();
};

const countItemsLeft = () => {
   /* Count how many tasks are not completed and update the UI counter. */

   const buttonCheck = todoListContainer.querySelectorAll(".btn-check");
   let itemsLeft = 0;

   buttonCheck.forEach(button => {
      if (!button.classList.contains("checked")) itemsLeft++;
   });

   textItemsLeft.textContent = itemsLeft;
};

const clearTasksCompleted = () => {
   /* Remove all completed tasks from localStorage and re-render the list. */
   
   let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

   localTasks = localTasks.filter(task => !task.isCompleted);
   localStorage.setItem("tasks", JSON.stringify(localTasks));

   const prevTodos = todoListContainer.querySelectorAll(".todo");
   prevTodos.forEach(todo => todo.remove());

   addActiveClass("all")
   loadTasks();
};

const deleteTask = task => {
   /* Delete a single task both from localStorage and from the DOM. */

   let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
   const todo = task.closest(".todo");

   localTasks = localTasks.filter(localTask => localTask.id !== todo.id);

   localStorage.setItem("tasks", JSON.stringify(localTasks));
   todo.remove();

   countItemsLeft();
};

const addActiveClass = mode => {
   /* Toggle the "active" class on the filter buttons (all / active / completed). */

   if (mode === "all") {
      getAllTasks.classList.add("active");
      getActiveTasks.classList.remove("active");
      getCompletedTasks.classList.remove("active");
   } else if (mode === "active") {
      getActiveTasks.classList.add("active");
      getAllTasks.classList.remove("active");
      getCompletedTasks.classList.remove("active");
   } else {
      getCompletedTasks.classList.add("active");
      getAllTasks.classList.remove("active");
      getActiveTasks.classList.remove("active");
   }
};

const modifyTodoList = mode => {
   /* Filter tasks based on mode and render only the matching tasks. */

   const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
   let currentTasks = [];

   addActiveClass(mode);

   if (mode === "all") {
      currentTasks = localTasks;
   } else if (mode === "active") {
      currentTasks = localTasks.filter(task => !task.isCompleted);
   } else {
      currentTasks = localTasks.filter(task => task.isCompleted);
   }

   const prevTodos = todoListContainer.querySelectorAll(".todo");
   prevTodos.forEach(todo => todo.remove());

   currentTasks.forEach(task => addTaskToTodoList(task));

   countItemsLeft();
};

const addTaskToTodoList = (task) => {
   /* Create a .todo DOM element and insert it before the .infos block. */

   const newTask = document.createElement("div");
   newTask.classList.add("todo");
   newTask.id = task.id;

   const lightTheme = !iconTheme.classList.contains("dark");

   newTask.innerHTML = `
      <div>
         <button class="btn-check ${task.isCompleted ? "checked" : ""} ${lightTheme ? "light" : ""}">
            ${
               task.isCompleted
                  ? '<img src="./images/icon-check.svg">'
                  : ""
            }
         </button>
         <p class="${task.isCompleted ? "completed" : ""}">
            ${task.task}
         </p>
      </div>
      <img class="delete-task" src="./images/icon-cross.svg" alt="remove">
   `;

   todoList.insertAdjacentElement("afterbegin", newTask);
};

const loadTasks = () => {
   /* Load tasks from localStorage and render them into the DOM. */

   const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

   localTasks.forEach(localTask => addTaskToTodoList(localTask));
   countItemsLeft();
};

// ===================== EVENTS =====================

iconTheme.addEventListener("click", () => {
   /* Theme toggle button click handler. */

   if (iconTheme.classList.contains("dark")) {
      changeIconTheme("light");
      changeBackgroundTheme("light");
   } else {
      changeIconTheme("dark");
      changeBackgroundTheme("dark");
   }
});

inputButtonCheck.addEventListener("click", () =>
   /* Click handler for the small checkbox button in the create area. */
   completeTask(inputButtonCheck)
);

taskInput.addEventListener("keypress", event => {
   /* Handle Enter key on the input to create a new task and persist it. */

   const key = event.key;
   if (key !== "Enter") return;
   if (taskInput.value === "") return;

   const isCompleted = inputButtonCheck.classList.contains("checked")
      ? true
      : false;
   let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

   const newTaskObj = {
      id: Date.now().toString(),
      task: taskInput.value,
      isCompleted,
   };

   localTasks.push(newTaskObj);
   localStorage.setItem("tasks", JSON.stringify(localTasks));

   addTaskToTodoList(newTaskObj);

   taskInput.value = "";
   countItemsLeft();
});

todoListContainer.addEventListener("click", event => {
   /* Click delegation for completing a task (check / p) and deleting a task (cross). */
   if (
      (event.target && event.target.matches(".btn-check")) ||
      (event.target && event.target.matches("p"))
   ) {
      const buttonCheck = event.target.matches(".btn-check")
         ? event.target
         : event.target.closest("div").querySelector(".btn-check");

      const p = buttonCheck.closest("div").querySelector("p");
      completeTask(buttonCheck, p);
      return;
   }

   if (event.target && event.target.matches(".delete-task")) {
      deleteTask(event.target);
   }
});

/* Filter buttons click handlers. */
getAllTasks.addEventListener("click", () => modifyTodoList("all"));
getActiveTasks.addEventListener("click", () => modifyTodoList("active"));
getCompletedTasks.addEventListener("click", () => modifyTodoList("completed"));

/* Clear completed tasks button handler. */
clearCompleted.addEventListener("click", clearTasksCompleted);

/* On window load, render tasks and initialize Sortable. */
window.addEventListener("load", () => {
   loadTasks();
   initSortable();
});