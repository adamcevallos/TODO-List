import { todoStorage } from "../todo";
import { buildTodoElement } from "./contentBuilder";

function loadWeek() {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Weekly';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    let weekTodos = todoStorage.getWeekTodos();

    let date = new Date();
    for (let i = 0 ; i < 7; i++) {
        if (weekTodos[i].length != 0) {
            let dateString = date.toDateString();
            let dateHeader = document.createElement('h3');
            dateHeader.classList.add('date-header');
            dateHeader.textContent = dateString;
            todoList.appendChild(dateHeader);

            let dayTodos = weekTodos[i];
            for (let j = 0; j < dayTodos.length; j++) {
                todoList.appendChild(buildTodoElement(dayTodos[j]));
            }
        }

        date.setDate(date.getDate() + 1);
    }

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}

export { loadWeek };