import { buildTodoAddButton, buildTodoElement } from "./contentBuilder";
import { todoStorage } from '../todo';

const getFormattedDate = () => {
    let date = new Date().toLocaleDateString();
    console.log(date);
    return date;
    // return format(today, 'MM/dd/yyyy');
}

function loadToday() {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Today';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // display today's todos
    let todos = todoStorage.getTodayTodos();
    for (let i = 0; i < todos.length; i++) {
        todoList.appendChild(buildTodoElement(todos[i]), true);
    }

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}

export { loadToday };