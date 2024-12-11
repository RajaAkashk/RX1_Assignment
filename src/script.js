import { createStore } from "redux";
import taskReducer from "./taskReducer ";

const store = createStore(taskReducer);
store.subscribe(() => {
  console.log("subscrive");
  console.log(store.getState());
  showTask();
});

const addTaskForm = document.querySelector("#addTaskForm");

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = document.querySelector("#task").value;
  const taskName = document.querySelector("#taskName").value;
  const taskToAdd = taskName + " - " + task;
  store.dispatch({
    type: "ADD_TASK",
    payload: { id: Date.now(), title: taskToAdd, completed: false },
  });
  store.dispatch({ type: "CALCULATE_TOTAL_TASKS" });
});

const removeTaskForm = document.querySelector("#removeTaskForm");
removeTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskId = document.querySelector("#taskId").value;
  store.dispatch({ type: "REMOVE_TASK", payload: taskId });
  store.dispatch({ type: "CALCULATE_TOTAL_TASKS" });
});

window.toggleHandler = (id) => {
  store.dispatch({ type: "TOGGLE_TASK", payload: id });
};

const showTask = () => {
  const taskList = document.querySelector("#taskList");
  const state = store.getState();
  const taskLists = state.tasks
    .map(
      (task) =>
        `<li>
        <input 
          type="checkbox" 
          ${task.completed ? "checked" : ""} 
          onChange="toggleHandler(${task.id})" 
        />
       <strong>ID: </strong>${task.id} : <strong>Task: </strong>${task.title} ${
          task.completed ? "(Completed)" : ""
        }
      </li>`
    )
    .join("");
  const totalTasks = `<p><strong>Total Task: </strong>${state.total}</p>`;
  taskList.innerHTML = taskLists + totalTasks;
};
