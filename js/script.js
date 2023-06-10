{
    const tasks = [
        {
            content: "zakodować formularz",
            done: false,
        },
        {
            content: "ostylować formularz",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (indexTask) => {
        tasks.splice(indexTask, 1);
        render();
    };

    const toggleTaskDone = (indexTask) => {
        tasks[indexTask].done = !tasks[indexTask].done;
        render();
    };

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
                toggleDoneButton.innerText = task.done ? "✓" : "";
            });
        });
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
    <li class="form__listItem 
    ${task.done ? "form__listItem--done" : ""}"
    >
    <button class="js-done form__button form__button--done">
    ${task.done ? "✔" : ""}</button>
    ${task.content}
    <button class="js-removeButton form__button form__button--remove"></button>
    </li>
    `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document
            .querySelector(".js-newTask")
            .value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}
