import { buildTodoAddButton, buildTodoElement } from "./contentBuilder";

const getFormattedDate = () => {
    let date = new Date().toLocaleDateString();
    console.log(date);
    return date;
    // return format(today, 'MM/dd/yyyy');
}

function loadToday(formActive=false) {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Today';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // build add button / form
    let add = (formActive) ? buildTodoAddForm() : buildTodoAddButton();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}

export { loadToday };