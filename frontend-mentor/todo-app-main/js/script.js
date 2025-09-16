const iconTheme = document.querySelector(".theme");

const body = document.querySelector("body");
const backgroundImage = document.querySelector(".background-image img");
const createTaskContainer = document.querySelector(".create-task");
const todoList = document.querySelector(".todo-list");
const inputButtonCheck = document.querySelector(".create-task .btn-check");
const infosContainer = document.querySelector(".infos");
const textItemsLeft = document.querySelector(".items-left");
const notice = document.querySelector(".notice");

const getAllTasks = document.querySelector(".get-all-tasks");
const getActiveTasks = document.querySelector(".get-active-tasks");
const getCompletedTasks = document.querySelector(".get-completed-tasks");

const taskInput = document.querySelector("#task-input");
let task = "";

let completed = false;
let itemsLeft = 0;

// Functions
const changeIconTheme = (theme) => {
   if (theme == "dark") {
      iconTheme.src = "images/icon-sun.svg";
      iconTheme.classList.add("dark");
      return;
   }

   iconTheme.src = "images/icon-moon.svg";
   iconTheme.classList.remove("dark");
};

const changeBackgroundTheme = (theme) => {
   if (theme == "dark") {
      backgroundImage.src = "images/bg-desktop-dark.jpg";
      body.classList.remove("light");
      createTaskContainer.classList.remove("light");
      todoList.classList.remove("light");
      infosContainer.classList.remove("light");
      notice.classList.remove("light");

      buttonCheck.forEach((button) => {
         button.classList.remove("light");
      });

      return;
   }

   backgroundImage.src = "images/bg-desktop-light.jpg";
   body.classList.add("light");
   createTaskContainer.classList.add("light");
   todoList.classList.add("light");
   infosContainer.classList.add("light");
   notice.classList.add("light");

   buttonCheck.forEach((button) => {
      button.classList.add("light");
   });
};

const completeTask = (button, p = null) => {
   button.classList.toggle("checked");
   if (p !== null) p.classList.toggle("completed");

   if (button.classList.contains("checked")) {
      const img = document.createElement("img");
      img.src = "./images/icon-check.svg";
      button.appendChild(img);
      return;
   }

   button.innerHTML = "";
};

const countItemsLeft = () => {
   const buttonCheck = todoList.querySelectorAll(".btn-check");
   let itemsLeft = 0;
   
   buttonCheck.forEach(button => {
      if(!button.classList.contains("checked")) itemsLeft++;
   });
   
   textItemsLeft.textContent = itemsLeft;
}

const addActiveClass = (mode) => {
   if(mode === "all") {
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
}

const modifyTodoList = (mode) => {
   const prevTodos = todoList.querySelectorAll(".todo");
   let currentTodos = [];
   addActiveClass(mode)
   
   prevTodos.forEach(todo => {
      if(mode === "all") {
         
         
      } else if(mode === "active") {
         currentTodos.push
        
      } else {

      }
      
   })
}

// Events
iconTheme.addEventListener("click", () => {
   if (iconTheme.classList.contains("dark")) {
      changeIconTheme("light");
      changeBackgroundTheme("light");
   } else {
      changeIconTheme("dark");
      changeBackgroundTheme("dark");
   }
});

inputButtonCheck.addEventListener("click", () =>
   completeTask(inputButtonCheck)
);

taskInput.addEventListener("keypress", (event) => {
    const key = event.key;
    if (key !== "Enter") return;

    const newTask = document.createElement("div");
    newTask.classList.add("todo");

    newTask.innerHTML = `
        <div>
            <button class="btn-check ${
                inputButtonCheck.classList.contains("checked") ? "checked" : ""
            }">
                ${
                    inputButtonCheck.classList.contains("checked")
                        ? '<img src="./images/icon-check.svg">'
                        : ""
                }
            </button>
            <p class="${
                inputButtonCheck.classList.contains("checked")
                    ? "completed"
                    : ""
            }">
                ${taskInput.value}
            </p>
        </div>
        <img class="delete-task" src="./images/icon-cross.svg" alt="remove">
    `;

    infosContainer.insertAdjacentElement("beforebegin", newTask);
    taskInput.value = "";
    countItemsLeft()
});

todoList.addEventListener("click", (event) => {
   if((event.target && event.target.matches(".btn-check")) || (event.target && event.target.matches("p"))) {
      const buttonCheck = event.target.matches(".btn-check")
         ? event.target
         : event.target.closest("div").querySelector(".btn-check");
      
      const p = buttonCheck.closest("div").querySelector("p");
      completeTask(buttonCheck, p);
      countItemsLeft();
      
      return;
   }

   if(event.target && event.target.matches(".delete-task")) {
      event.target.closest(".todo").remove()
      countItemsLeft()
   }
})

getAllTasks.addEventListener("click", () => modifyTodoList("all"));
getActiveTasks.addEventListener("click", () => modifyTodoList("active"));
getCompletedTasks.addEventListener("click", () => modifyTodoList("completed"));

countItemsLeft()