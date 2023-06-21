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

    const bindEvents = () => {
        const hideDoneTaskButton = document.querySelector(".js-hide");

        hideDoneTaskButton.addEventListener("click", () => {
            hideDoneTask();
        });

        const markAllAsDoneButton = document.querySelector(".js-markAllAsDone");

        markAllAsDoneButton.addEventListener("click", () => {
            markAllAsDone();
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
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
    <li class="taskList__listItem">
    <button class="js-done taskList__button taskList__button--done">
    ${task.done ? "✔" : ""}</button>
    <span class="${task.done ? "taskList__listItem--done" : ""}"> 
    ${task.content}</span>
    <button class="js-removeButton taskList__button taskList__button--remove"></button>
    </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {};

    const render = () => {
        renderTasks();

        bindEvents();
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
