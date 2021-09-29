// import { buildTodoAddButton, buildTodoElement, buildTodoAddForm} from "./contentBuilder";
// import { todoStorage } from "../todo";

// function loadInbox(formActive=false) {
    
//     let todos = todoStorage.getTodosOfProject('inbox');

//     let todoEditor = document.getElementById('todo-editor');
//     todoEditor.innerHTML = '';

//     let header = document.createElement('h1');
//     header.textContent = 'Inbox';
    
//     let todoList = document.createElement('div');
//     todoList.id = 'todo-list';

//     for (let i = 0; i < todos.length; i++) {
//         let todoElement = buildTodoElement(todos[i]);
//         todoList.appendChild(todoElement);
//     }
    
//     // build add button / form
//     let add = (formActive) ? buildTodoAddForm() : buildTodoAddButton();
//     todoList.appendChild(add);

//     todoEditor.appendChild(header);
//     todoEditor.appendChild(todoList);
// }

// export {loadInbox}
