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
// PROJECT MANAGEMENT
// ================================

const projectName = document.getElementById("projectName");
const projectDesc = document.getElementById("projectDesc");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectList = document.getElementById("projectList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

if (projectName && projectDesc && addProjectBtn && projectList) {

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    function saveProjects() {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function displayProjects(filter = "all") {

        projectList.innerHTML = "";

        projects.forEach((project, index) => {

            if (filter === "active" && project.completed) return;
            if (filter === "completed" && !project.completed) return;

            const item = document.createElement("li");

            if (project.completed) {
                item.classList.add("completed");
            }

            item.innerHTML = `
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.desc}</p>
                </div>

                <div class="project-buttons">
                    <button class="complete" data-index="${index}">
                        ${project.completed ? "Undo" : "Complete"}
                    </button>

                    <button class="edit" data-index="${index}">
                        Edit
                    </button>

                    <button class="delete" data-index="${index}">
                        Delete
                    </button>
                </div>
            `;

            projectList.appendChild(item);

        });

    }

    // Add Project
    addProjectBtn.addEventListener("click", () => {

        const name = projectName.value.trim();
        const desc = projectDesc.value.trim();

        if (name === "" || desc === "") {
            alert("Please enter both project name and description.");
            return;
        }

        projects.push({
            name,
            desc,
            completed: false
        });

        saveProjects();
        displayProjects();

        projectName.value = "";
        projectDesc.value = "";

    });

    // Edit / Delete / Complete
    projectList.addEventListener("click", (e) => {

        const index = e.target.dataset.index;

        if (index === undefined) return;

        if (e.target.classList.contains("delete")) {

            projects.splice(index, 1);

        }

        else if (e.target.classList.contains("complete")) {

            projects[index].completed = !projects[index].completed;

        }

        else if (e.target.classList.contains("edit")) {

            const newName = prompt("Edit Project Name", projects[index].name);

            if (newName === null) return;

            const newDesc = prompt("Edit Project Description", projects[index].desc);

            if (newDesc === null) return;

            projects[index].name = newName.trim();
            projects[index].desc = newDesc.trim();

        }

        saveProjects();
        displayProjects();

    });

    // Filter Buttons
    if (allBtn) {
        allBtn.addEventListener("click", () => displayProjects("all"));
    }

    if (activeBtn) {
        activeBtn.addEventListener("click", () => displayProjects("active"));
    }

    if (completedBtn) {
        completedBtn.addEventListener("click", () => displayProjects("completed"));
    }

    displayProjects();
}