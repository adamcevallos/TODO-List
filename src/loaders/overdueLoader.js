import { buildTodoElement } from "./contentBuilder";
import { todoStorage } from "../todo";

function loadOverdue() {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Overdue';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // display today's todos
    let todos = todoStorage.getOverdueTodos();
    for (let i = 0; i < todos.length; i++) {
        todoList.appendChild(buildTodoElement(todos[i]), true);
    }

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}

export { loadOverdue };