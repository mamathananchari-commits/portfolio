// ================================
// DARK MODE
// ================================

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}

// ================================
// TO-DO LIST MANAGEMENT
// ================================

const taskName = document.getElementById("projectName");
const taskDesc = document.getElementById("projectDesc");
const addTaskBtn = document.getElementById("addProjectBtn");

const taskList = document.getElementById("projectList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

if (taskName && taskDesc && addTaskBtn && taskList) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function displayTasks(filter = "all") {

        taskList.innerHTML = "";

        tasks.forEach((task, index) => {

            if (filter === "active" && task.completed) return;
            if (filter === "completed" && !task.completed) return;

            const div = document.createElement("div");
            div.className = "task-item";

            if (task.completed) {
                div.classList.add("completed");
            }

            div.innerHTML = `
                <div class="project-info">
                    <h3>${task.name}</h3>
                    <p>${task.desc}</p>
                </div>

                <div class="project-buttons">
                    <button class="complete" data-index="${index}">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>

                    <button class="edit" data-index="${index}">
                        Edit
                    </button>

                    <button class="delete" data-index="${index}">
                        Delete
                    </button>
                </div>
            `;

            taskList.appendChild(div);
        });
    }

    // Add Task
    addTaskBtn.addEventListener("click", () => {

        const name = taskName.value.trim();
        const desc = taskDesc.value.trim();

        if (name === "" || desc === "") {
            alert("Please enter task name and description.");
            return;
        }

        tasks.push({
            name,
            desc,
            completed: false
        });

        saveTasks();
        displayTasks();

        taskName.value = "";
        taskDesc.value = "";
    });

    // Event Delegation
    taskList.addEventListener("click", (e) => {

        const index = e.target.dataset.index;

        if (index === undefined) return;

        if (e.target.classList.contains("delete")) {

            tasks.splice(index, 1);

        } else if (e.target.classList.contains("complete")) {

            tasks[index].completed = !tasks[index].completed;

        } else if (e.target.classList.contains("edit")) {

            const newName = prompt("Edit Task Name", tasks[index].name);

            if (newName === null) return;

            const newDesc = prompt("Edit Task Description", tasks[index].desc);

            if (newDesc === null) return;

            tasks[index].name = newName;
            tasks[index].desc = newDesc;
        }

        saveTasks();
        displayTasks();
    });

    // Filter Buttons

    if (allBtn) {
        allBtn.addEventListener("click", () => displayTasks("all"));
    }

    if (activeBtn) {
        activeBtn.addEventListener("click", () => displayTasks("active"));
    }

    if (completedBtn) {
        completedBtn.addEventListener("click", () => displayTasks("completed"));
    }

    displayTasks();
}