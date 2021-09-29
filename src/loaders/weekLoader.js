import { buildTodoAddButton, buildTodoElement } from "./contentBuilder";

function loadWeek(formActive=false) {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Weekly';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // build add button / form
    let add = (formActive) ? buildTodoAddForm() : buildTodoAddButton();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}

export { loadWeek };