import { buildTodoAddButton, buildTodoElement, buildTodoAddForm } from "./contentBuilder";
import { todoStorage } from "../todo";
import { projectStorage } from "../project";

function loadProject(projectID, formActive = false) {

    let project = projectStorage.getProject(projectID);

    let todos = todoStorage.getTodosOfProject(project.getID());
    console.log(todos);

    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = project.getTitle();

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    for (let i = 0; i < todos.length; i++) {
        let todoElement = buildTodoElement(todos[i]);
        todoList.appendChild(todoElement);
    }

    // build add button / form
    let add = (formActive) ? buildTodoAddForm() : buildTodoAddButton();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}

export { loadProject }
