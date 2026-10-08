let tasks = [];

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let emptyMessage = document.getElementById("emptyMessage");

let remaining = document.getElementById("remaining");
let totalTasks = document.getElementById("totalTasks");

let percentage = document.getElementById("percentage");
let progressBar = document.getElementById("progressBar");

let currentFilter = "all";


// DATE

let today = new Date();

document.getElementById("day").textContent =
    today.getDate();

document.getElementById("month").textContent =
    today.toLocaleString("default", { month: "short" }).toUpperCase();


// ADD TASK

function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}


// DISPLAY TASKS

function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {
            return task.completed === false;
        }

        if (currentFilter === "completed") {
            return task.completed === true;
        }

        return true;
    });


    filteredTasks.forEach(function(task) {

        let taskDiv = document.createElement("div");

        taskDiv.className = "task";

        if (task.completed) {
            taskDiv.classList.add("completed");
        }


        let check = document.createElement("div");

        check.className = "check";

        check.onclick = function() {
            toggleTask(task.id);
        };


        let text = document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        let deleteButton = document.createElement("button");

        deleteButton.className = "delete";

        deleteButton.textContent = "×";

        deleteButton.onclick = function() {
            deleteTask(task.id);
        };


        taskDiv.appendChild(check);
        taskDiv.appendChild(text);
        taskDiv.appendChild(deleteButton);

        taskList.appendChild(taskDiv);

    });


    updateProgress();
}


// COMPLETE TASK

function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

    });

    displayTasks();
}


// DELETE TASK

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}


// PROGRESS

function updateProgress() {

    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let active = total - completed;


    totalTasks.textContent =
        total + (total === 1 ? " task" : " tasks");


    remaining.textContent =
        active + (active === 1 ? " task left" : " tasks left");


    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    percentage.textContent = percent + "%";

    progressBar.style.width = percent + "%";


    if (total === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// FILTERS

let filters = document.querySelectorAll(".filter");

filters.forEach(function(button) {

    button.onclick = function() {

        filters.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter =
            button.getAttribute("data-filter");

        displayTasks();
    };

});


// CLEAR COMPLETED

document.getElementById("clearCompleted").onclick =
function() {

    tasks = tasks.filter(function(task) {
        return task.completed === false;
    });

    displayTasks();
};


// ENTER KEY

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


addBtn.onclick = addTask;


// FIRST DISPLAY

displayTasks();