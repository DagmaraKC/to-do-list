{
    let tasks = [];

    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            },
        ];

        render();
    };

    const removeTask = (indexTask) => {
        tasks = tasks.filter((task, index) => index !== indexTask);

        render();
    };

    const toggleTaskDone = (indexTask) => {
        tasks = tasks.map((task, index) =>
            index === indexTask ? { ...task, done: !task.done } : task
        );

        render();
    };

    const markAllAsDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const bindButtonsEvents = () => {
        const hideDoneTaskButton = document.querySelector(".js-hide");

        if (hideDoneTaskButton) {
            hideDoneTaskButton.addEventListener("click", toggleHideDoneTask);
        }

        let markAllAsDoneButton = document.querySelector(".js-markAllAsDone");

        if (markAllAsDoneButton) {
            markAllAsDoneButton.addEventListener("click", markAllAsDone);
        }
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
    <li 
    class="taskList__listItem${
        task.done && hideDoneTask ? "taskList__listItem--hideDone" : ""
    }">
    <button class="js-done taskList__button taskList__button--done">
    ${task.done ? "✔" : ""}</button>
    <span class="${task.done ? "taskList__listItem--done" : ""}"> 
    ${task.content}</span>
    <button class="js-removeButton taskList__button taskList__button--remove">
    </button>
    </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const headerButtons = document.querySelector(".js-headerButtons");

        if (!tasks.length) {
            headerButtons.innerHTML = "";
            return;
        }

        headerButtons.innerHTML = `
        <button 
        class = "js-hide taskList__button--header">
        ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
        </button> 
        <button 
        class = "js-markAllAsDone taskList__button--header
        ${tasks.every(({ done }) => done) ? " disabled " : ""}">
        Ukończ wszystkie
        </button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
        bindToggleDoneEvents();
        bindRemoveEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}
