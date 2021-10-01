/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/loaders/contentBuilder.js":
/*!***************************************!*\
  !*** ./src/loaders/contentBuilder.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildTodoAddButton": () => (/* binding */ buildTodoAddButton),
/* harmony export */   "buildTodoElement": () => (/* binding */ buildTodoElement),
/* harmony export */   "buildTodoAddForm": () => (/* binding */ buildTodoAddForm)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../todo */ "./src/todo.js");
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nav */ "./src/nav.js");




const convertDateToWords = (dateString) => {
    console.log(dateString);2
    let x = new Date(dateString);
    let date = new Date(dateString);
    let dateArr = date.toDateString().split(' ');
    let month = dateArr[1];
    let day = parseInt(dateArr[2]);
    let year = ( dateArr[3] == new Date().getFullYear() ) ? '' : ` ${dateArr[3]}`;

    return month + ' ' + day + ' ' + year;
}

const buildTodoCircle = (todo) => {

    let priority = parseInt(todo.getPriority());
    let circle = document.createElement('div');

    switch (priority) {
        case 1:
            circle.style.backgroundColor = 'gray';
            circle.style.border = '1px solid black';
            break;
        case 2:
            circle.style.border = '1px solid blue';
            circle.style.backgroundColor = 'light blue';
            break;
        case 3:
            circle.style.backgroundColor = 'orange';
            break;
        case 4:
            circle.style.border = '1px solid red';
            circle.style.backgroundColor = 'red';
            break;
        default:
            console.log("invalid priority given for todo circle color");
    } 

    return circle;
}

const buildTodoElement = (todo) => {
    let todoElement = document.createElement('div');
    todoElement.id = `todo-${todo.getID()}`;
    todoElement.classList.add('todo');

    // build circle and title row
    let topRow = document.createElement('div');
    topRow.classList.add('top-row');

    let circle = buildTodoCircle(todo);
    circle.addEventListener('click', () => {
        console.log(`todo id: ${todo.getID()}, project-id: ${todo.getProject()}`);
        _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.deleteTodoFromProject(todo.getID(), todo.getProject());
        (0,_nav__WEBPACK_IMPORTED_MODULE_2__.refresh)(false);
    });
    circle.classList.add('todo-circle');

    let title = document.createElement('span');
    title.classList.add('todo-title');
    title.textContent = todo.getTitle();

    topRow.appendChild(circle);
    topRow.appendChild(title);

    let description = document.createElement('p');
    description.classList.add('todo-description');
    description.textContent = todo.getDescription();

    let dueDate = document.createElement('p');
    dueDate.classList.add('todo-due-date');
    dueDate.textContent = convertDateToWords(todo.getDueDate());
    // dueDate.textContent = todo.getDueDate();

    todoElement.appendChild(topRow);
    todoElement.appendChild(description);
    todoElement.appendChild(dueDate);

    return todoElement;
}

const buildTodoAddButton = () => {

    let addButton = document.createElement('div');
    addButton.id = 'todo-add-button';

    let plus = document.createElement('span');
    plus.textContent = '+';
    plus.id = 'todo-add-plus';

    let addText = document.createElement('span');
    addText.textContent = 'Add task';
    addText.id = 'todo-add-text';

    addButton.appendChild(plus);
    addButton.appendChild(addText);

    addButton.onclick = () => (0,_nav__WEBPACK_IMPORTED_MODULE_2__.refresh)(true);

    return addButton;

}

const formBuilder = (function() {

    const submitAddForm = () => {

        let title = document.getElementById('todo-form-title').value;
        let desc = document.getElementById('todo-form-description').value;
        let date = document.getElementById('todo-form-date').value;
        let project = String(document.getElementById('todo-form-project').value);
        let priority = document.getElementById('todo-form-priority').value;

        const projectID = (project.startsWith('project')) ? (project.at(-1)) : project;
        console.log(projectID);
        const todo = (0,_todo__WEBPACK_IMPORTED_MODULE_1__.todoFactory)(title,desc,date,projectID,priority);
        
        _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.addTodoToProject(todo, projectID);
        (0,_nav__WEBPACK_IMPORTED_MODULE_2__.refresh)(false);
    }
    
    const buildTitle = () => {
        let titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title';

        let title = document.createElement('input');
        title.type = 'text';
        title.id = 'todo-form-title';
        title.required = true;
        titleLabel.appendChild(title);
        title.placeholder = "Exam";

        return titleLabel;
    }

    const buildDescription = () => {
        let descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'description';

        let description = document.createElement('input');
        description.id = 'todo-form-description';
        description.placeholder = "Economics Exam over chapters 1-5"
        descriptionLabel.appendChild(description);

        return descriptionLabel
    }

    const buildDate = () => {
        let dateLabel = document.createElement('label');
        dateLabel.textContent = 'Due Date';

        let date = document.createElement('input');
        date.required = true;
        date.type = 'date';
        date.id = 'todo-form-date'
        dateLabel.appendChild(date);

        return dateLabel;
    }

    const buildProjectDropdown = () => {
        
        let projectLabel = document.createElement('label');
        let projectDropdown = document.createElement('select');
        projectDropdown.id = 'todo-form-project';
        projectLabel.textContent = 'Project';        

        // default inbox option
        let inboxOption = document.createElement('option');
        inboxOption.value = 'inbox';
        inboxOption.innerHTML = 'Inbox';
        projectDropdown.appendChild(inboxOption);

        // display project options
        const projects = _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.getAllProjects();
        for (let i = 0; i < projects.length; i++) {
            let option = document.createElement('option');
            option.value = `project-${projects[i].getID()}`;
            option.innerHTML = projects[i].getTitle();
            projectDropdown.appendChild(option);
        }

        // select current tab by default
        let options = projectDropdown.options;
        for (let i = 0 ; i < options.length; i++) {
            if (options[i].value === window.localStorage.getItem('selected')) {
                projectDropdown.selectedIndex = i;
                break;
            }
        }

        projectLabel.appendChild(projectDropdown);

        return projectLabel
    }

    const buildPriorityDropdown = () => {
        let priorityLabel = document.createElement('label');
        priorityLabel.textContent = 'Priority';
        let priority = document.createElement('select');
        priority.id = 'todo-form-priority';

        for (let i = 1; i <= 4; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            priority.appendChild(option);
        }
        priorityLabel.appendChild(priority);

        return priorityLabel
    }

    const buildButtons = () => {
        
        let buttons = document.createElement('div');
        buttons.id = 'todo-form-btns';

        let submit = document.createElement('input');
        submit.type = 'submit'
        submit.id = 'todo-form-submit';
        submit.value = 'Add todo';
        submit.addEventListener('click', e => {
            e.preventDefault();
            submitAddForm();
        }); 

        let close = document.createElement('input');
        close.id = 'todo-form-close';
        close.value = 'Close';
        close.type = 'button';
        close.addEventListener('click', e => {
            (0,_nav__WEBPACK_IMPORTED_MODULE_2__.refresh)(false);
        });

        buttons.appendChild(submit);
        buttons.appendChild(close);

        return buttons;
    }

    return {
        buildTitle,
        buildDescription,
        buildDate,
        buildProjectDropdown,
        buildPriorityDropdown,
        buildButtons,
    }

})();

const buildTodoAddForm = () => {
    let form = document.createElement('form');
    form.id = 'todo-form';

    form.appendChild(formBuilder.buildTitle());
    form.appendChild(formBuilder.buildDescription());
    form.appendChild(formBuilder.buildDate());
    form.appendChild(formBuilder.buildProjectDropdown());
    form.appendChild(formBuilder.buildPriorityDropdown());
    form.appendChild(formBuilder.buildButtons());
    return form;
}



/***/ }),

/***/ "./src/loaders/inboxLoader.js":
/*!************************************!*\
  !*** ./src/loaders/inboxLoader.js ***!
  \************************************/
/***/ (() => {

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


/***/ }),

/***/ "./src/loaders/overdueLoader.js":
/*!**************************************!*\
  !*** ./src/loaders/overdueLoader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadOverdue": () => (/* binding */ loadOverdue)
/* harmony export */ });
/* harmony import */ var _contentBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentBuilder */ "./src/loaders/contentBuilder.js");


function loadOverdue(formActive=false) {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Overdue';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // build add button / form
    let add = (formActive) ? buildTodoAddForm() : (0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoAddButton)();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}



/***/ }),

/***/ "./src/loaders/projectLoader.js":
/*!**************************************!*\
  !*** ./src/loaders/projectLoader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadProject": () => (/* binding */ loadProject)
/* harmony export */ });
/* harmony import */ var _contentBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentBuilder */ "./src/loaders/contentBuilder.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../todo */ "./src/todo.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../project */ "./src/project.js");




function loadProject(projectID, formActive = false) {

    let project = _project__WEBPACK_IMPORTED_MODULE_2__.projectStorage.getProject(projectID);

    let todos = _todo__WEBPACK_IMPORTED_MODULE_1__.todoStorage.getTodosOfProject(project.getID());

    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = project.getTitle();

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    for (let i = 0; i < todos.length; i++) {
        let todoElement = (0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoElement)(todos[i]);
        todoList.appendChild(todoElement);
    }

    // build add button / form
    let add = (formActive) ? (0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoAddForm)() : (0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoAddButton)();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}




/***/ }),

/***/ "./src/loaders/todayLoader.js":
/*!************************************!*\
  !*** ./src/loaders/todayLoader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadToday": () => (/* binding */ loadToday)
/* harmony export */ });
/* harmony import */ var _contentBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentBuilder */ "./src/loaders/contentBuilder.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../todo */ "./src/todo.js");



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

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);

    // display today's todos
    let todos = _todo__WEBPACK_IMPORTED_MODULE_1__.todoStorage.getTodayTodos();
    console.log(todos);
}



/***/ }),

/***/ "./src/loaders/weekLoader.js":
/*!***********************************!*\
  !*** ./src/loaders/weekLoader.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadWeek": () => (/* binding */ loadWeek)
/* harmony export */ });
/* harmony import */ var _contentBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentBuilder */ "./src/loaders/contentBuilder.js");


function loadWeek(formActive=false) {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Weekly';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // build add button / form
    let add = (formActive) ? buildTodoAddForm() : (0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoAddButton)();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}



/***/ }),

/***/ "./src/nav.js":
/*!********************!*\
  !*** ./src/nav.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "refresh": () => (/* binding */ refresh)
/* harmony export */ });
/* harmony import */ var _loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loaders/inboxLoader */ "./src/loaders/inboxLoader.js");
/* harmony import */ var _loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loaders_todayLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loaders/todayLoader */ "./src/loaders/todayLoader.js");
/* harmony import */ var _loaders_weekLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders/weekLoader */ "./src/loaders/weekLoader.js");
/* harmony import */ var _loaders_overdueLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loaders/overdueLoader */ "./src/loaders/overdueLoader.js");
/* harmony import */ var _loaders_projectLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loaders/projectLoader */ "./src/loaders/projectLoader.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./todo */ "./src/todo.js");








let storage = window.localStorage;
// window.localStorage.clear();

// todoStorage.copyTodosFromStorage();
let storageTab = storage.getItem('selected');
let currentTab = (storageTab) ? storageTab : 'inbox';

const refresh = (formActive=false) => {
    switch (currentTab) {
        case 'inbox':
            (0,_loaders_projectLoader__WEBPACK_IMPORTED_MODULE_4__.loadProject)("inbox", formActive);
            // loadInbox(formActive);
            break;
        case 'overdue':
            (0,_loaders_overdueLoader__WEBPACK_IMPORTED_MODULE_3__.loadOverdue)(formActive);
            break;
        case 'today':
            (0,_loaders_todayLoader__WEBPACK_IMPORTED_MODULE_1__.loadToday)(formActive);
            break;
        case 'week':
            (0,_loaders_weekLoader__WEBPACK_IMPORTED_MODULE_2__.loadWeek)(formActive);
            break;
        default:
            let projectID = currentTab.slice(currentTab.indexOf('-')+1);
            (0,_loaders_projectLoader__WEBPACK_IMPORTED_MODULE_4__.loadProject)(projectID, formActive);
    }

}

const setTab = tab => {
    currentTab = tab;
    storage.setItem('selected', tab);
    refresh();
}

const projectTabBuilder = (function() {

    const buildProjectTab = (project) => {
        let projectTab = document.createElement('div');
        let title = document.createElement('span');
        title.textContent = project.getTitle();
        let deleteBtn = document.createElement('span');

        // delete button
        deleteBtn.innerHTML = '&#10005';
        deleteBtn.classList.add('right-tab');
        deleteBtn.classList.add('project-delete-button');
        deleteBtn.onclick = (e) => {
            deleteProjectTab(project);
            e.stopPropagation();
        };

        // append items to tab
        projectTab.appendChild(title);
        projectTab.appendChild(deleteBtn);
        projectTab.classList.add('tab');
        projectTab.id = 'project-' + project.getID();

        // allow tab switching for project tabs
        projectTab.addEventListener('click', () => {
            let projectID = project.getID();
            setTab('project-' + projectID);
            TabHighlighter.updateHighlight();
        });

        return projectTab;
    }

    const deleteProjectTab = (project) => {
        const projectTab = document.getElementById('project-' + project.getID());
        if (projectTab.classList.contains('selected')) {
            document.getElementById('inbox-tab').classList.add('selected');
            setTab('inbox');
        };
        _project__WEBPACK_IMPORTED_MODULE_5__.projectStorage.deleteProject(project.getID());
        renderProjectTabs();
    }

    return { buildProjectTab };

})();

const projectFormBuilder = (function() {

    const buildProjectForm = () => {

        let form = document.createElement('form');
        form.id = 'project-add-form';

        let textbox = document.createElement('input');
        textbox.type = 'input';
        textbox.id = 'project-add-textbox';

        let submitButton = document.createElement('input');
        submitButton.id = 'project-add-submit';
        submitButton.type = 'submit';
        submitButton.value = String.fromCharCode('10003');

        submitButton.addEventListener('click', e => {
            e.preventDefault();
            submitForm(textbox.value);
        });

        let closeButton = document.createElement('input');
        closeButton.id = 'project-add-close';
        closeButton.type = 'button';
        closeButton.value = String.fromCharCode('10006');
        closeButton.onclick = closeForm;

        form.appendChild(textbox);
        form.appendChild(submitButton);
        form.appendChild(closeButton);

        return form;
    }

    const closeForm = () => {
        let projectList = document.getElementById('project-list');
        let form = document.getElementById('project-add-form');
        projectList.removeChild(form);
    }

    const submitForm = (title) => {
        let newProject = (0,_project__WEBPACK_IMPORTED_MODULE_5__.projectFactory)(title);
        _project__WEBPACK_IMPORTED_MODULE_5__.projectStorage.addProject(newProject);
        renderProjectTabs();

        // switch to new tab
        setTab(`project-${newProject.getID()}`);
        location.reload();
    }

    return { buildProjectForm };

})();

const renderProjectTabs = () => {

    // reset project list
    document.getElementById('project-list').innerHTML = '';
    
    // add each project from storage
    let projects = _project__WEBPACK_IMPORTED_MODULE_5__.projectStorage.getAllProjects();
    let projectList = document.getElementById('project-list');

    for (let i = 0; i < projects.length; i++) {
        let tab = projectTabBuilder.buildProjectTab(projects[i]);
        TabHighlighter.updateHighlight();
        projectList.appendChild(tab);
    }
}

const TabHighlighter = (function () {

    const updateHighlight = () => {
        // remove selected tab if any

        let selectedTab = document.querySelector('.selected');
        if (selectedTab) selectedTab.classList.remove('selected');

        if (currentTab.startsWith('project')) {
            let project = document.getElementById(currentTab);
            if (project) project.classList.add('selected');
        } else {
            document.getElementById(currentTab + '-tab').classList.add('selected');
        }
    }

    return { updateHighlight };
})();

const projectAddButton = document.getElementById('project-add-button');
projectAddButton.addEventListener('click', () => {
    let form = projectFormBuilder.buildProjectForm();
    document.getElementById('project-list').appendChild(form);
});

// allow tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        let id = tab.id.slice(0, tab.id.indexOf('-'));
        setTab(id);
        TabHighlighter.updateHighlight();
    });
});

renderProjectTabs();
refresh();
TabHighlighter.updateHighlight();



/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "projectStorage": () => (/* binding */ projectStorage)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");


const projectIDGenerator = (function() {

    const storedID = window.localStorage.getItem('nextProjectID');
    let _nextAvailableId = (storedID) ? storedID : 0;

    const generateProjectID = () => {
        let returnID = _nextAvailableId++;
        window.localStorage.setItem('nextProjectID', _nextAvailableId);
        return returnID;
    }

    return { generateProjectID }
})();

const projectFactory = (title, id = null) => {
    let _id = (id === null) ? projectIDGenerator.generateProjectID() : id;
    let _title = title;
    let _todos = [];    // holds project ids

    const getTitle = () => _title;
    const getID = () => _id;
    const getTodos = _todo__WEBPACK_IMPORTED_MODULE_0__.todoStorage.getTodosOfProject(_id);

    const stringify = () => { //e.g., 14|||myproject|||1-2-6-11-20
        let pString = `${getID()}|||${getTitle()}|||`;

        if (_todos.length > 0) {
            for(let i = 0; i < _todos.length - 1; i++) {
                pString += String(_todos[i]) + '-';
            }
            pString += _todos.at(-1);
        }
        
        return pString;
    }

    const addTodo = (todoID) => {
        _todos.push(todoID);
        window.localStorage.setItem(`project-${_id}`,stringify());
    };
    const deleteTodo = (todoID) => _todos.splice(_todos.indexOf(todoID,1));

    return { 
            getTitle, 
            addTodo, 
            deleteTodo, 
            getID,
            getTodos,
            stringify,
    };
}

const _buildProject = (projectString) => {
    const delimeter = "|||";
    let vals = projectString.split(delimeter);
    let project = projectFactory(vals[1], vals[0]);
    let todoIDs = String(vals[2]).split('-');
    for (let i = 0; i < todoIDs.length; i++) {
        project.addTodo(todoIDs[i]);
    }
    return project;
}

const projectStorage = (function () {

    let storage = window.localStorage;
    let inbox = projectFactory('inbox','inbox');
    let _projects = { 'inbox' : inbox };

    const addProject = (project) => {
        _projects[project.getID()] = project;
        storage.setItem(`project-${project.getID()}`, project.stringify());
    }
    const deleteProject = (projectID) => {
        if (projectID === 'inbox') {
            console.log('cannot delete inbox');
        } else {
            delete _projects[projectID];
            _todo__WEBPACK_IMPORTED_MODULE_0__.todoStorage.removeTodosOfProject(projectID);
            storage.removeItem(`project-${projectID}`);
        }
    };

    const addTodoToProject = (todo, projectID) => {
        _projects[projectID].addTodo(todo.getID());
        storage.setItem(`project-${projectID}`, _projects[projectID].stringify());
        _todo__WEBPACK_IMPORTED_MODULE_0__.todoStorage.addTodo(todo);
    };

    const deleteTodoFromProject = (todoID, projectID) => {
        _projects[projectID].deleteTodo(todoID);
        _todo__WEBPACK_IMPORTED_MODULE_0__.todoStorage.removeTodo(todoID);
        storage.removeItem(`todo-${todoID}`);
        storage.setItem(`project-${projectID}`,_projects[projectID].stringify());
    }
    
    const getAllProjects = () => Object.values(_projects).filter(
        (project) => project.getID() !== 'inbox'
    );

    const getProject = (id) => _projects[id];

    // copy projects from storage
    for (let i = 0; i < storage.length; i++) {
        if (storage.key(i).startsWith('project')) {
            let projectString = storage.getItem(storage.key(i));
            let project = _buildProject(projectString);
            _projects[project.getID()] = project;
        }
    }


    return {    
        addProject,
        deleteProject,
        getAllProjects,
        getProject,
        addTodoToProject,
        deleteTodoFromProject,
    };
})();




/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todoFactory": () => (/* binding */ todoFactory),
/* harmony export */   "todoStorage": () => (/* binding */ todoStorage)
/* harmony export */ });
const todoIDGenerator = (function () {
    const storedID = window.localStorage.getItem('nextTodoID');
    let _nextAvailableId = (storedID) ? storedID : 0;

    const generateTodoID = () => {
        let returnID = _nextAvailableId++;
        window.localStorage.setItem('nextTodoID', _nextAvailableId);
        return returnID;
    };

    return { generateTodoID }
})();

const todoFactory = (title, description, dueDate, project, priority, id = null) => {
    let _id = (id === null) ? todoIDGenerator.generateTodoID() : id;
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _project = project;
    let _priority = priority;

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;
    const getID = () => _id;
    const getProject = () => _project;

    //  id ||| title ||| description ||| date ||| priority ||| projectID
    //  5|||CS411 HW|||Complete the hw|||10/11/2021|||3|||2
    const stringify = () =>   getID() + '|||' 
                            + getTitle() + '|||'
                            + getDescription() + '|||'
                            + getDueDate() + '|||'
                            + getProject() + '|||' 
                            + getPriority();

    const setTitle = (newTitle) => _title = newTitle;
    const setDescription = (newDescription) => _description = newDescription;
    const setDueDate = (newDueDate) => _dueDate = newDueDate;
    const setPriority = (newPriority) => _priority = newPriority;
    const setProject = (newProject) => _project = newProject;
    return {
        getTitle, 
        getDescription, 
        getDueDate, 
        getPriority,
        getID,
        getProject,
        setTitle, 
        setDescription, 
        setDueDate, 
        setPriority,
        setProject,
        stringify
    };
}

const todoStorage = (function() {

    let _todos = {};
    let storage = window.localStorage;

    const copyTodosFromStorage = () => {
        const delimeter = "|||";
        for (let i = 0; i < storage.length; i++) {
            if (storage.key(i).startsWith('todo')) {
                let todoString = storage.getItem(storage.key(i));
                let vals = todoString.split(delimeter);
                let todo = todoFactory(vals[1], vals[2], vals[3], vals[4], vals[5], vals[0]);
                _todos[todo.getID()] = todo;
            }
        }
    }

    const addTodo = (todo) => {
        _todos[todo.getID()] = todo;
        storage.setItem(`todo-${todo.getID()}`, todo.stringify());
        copyTodosFromStorage();
    };

    const removeTodo = (todoID) => {
        delete _todos[todoID];
        storage.removeItem(`todo-${todoID}`);
    }

    const removeTodosOfProject = (projectID) => {
        let keys = Object.keys(_todos);
        for (let i = 0; i < keys.length; i++) {
            let todo = _todos[keys[i]];
            if (todo.getProject() === projectID) {
                removeTodo(keys[i]);
            }
        }
    }

    const getTodo = (todoID) => _todos[todoID];

    const getTodosOfProject = (projectID) => {

        let todos = Object.values(_todos);
        let returns = [];
        for (let i = 0; i < todos.length; i++) {
            // console.log(`comparing ${todos[i].getProject()} to ${projectID}`);
            if (todos[i].getProject() === projectID) {
                returns.push(todos[i]);
                // console.log('pushing');
            }
        }
        return returns;
    }

    const getTodayTodos = () => {
        const today = new Date().toDateString();

        const todos = Object.values(_todos);
        let todayTodos = [];

        for (let i = 0; i < todos.length; i++) {
            let dueDate = new Date(todos[i].getDueDate()).toDateString();
            console.log(`today:${today}, dueDate: ${dueDate}`);
            if (today === dueDate) {
                todayTodos.push(todos[i]);
            }
        }

        return todayTodos;
    }

    const getWeekTodos = () => {

    }

    const getOverdueTodos = () => {

    }


    // const getTodosOfProject = (projectID) => {Object.values(_todos).filter(todo => {
    //     todo.getProject() === projectID;
    // });

    document.addEventListener('reload', copyTodosFromStorage());

    return {
        addTodo,
        removeTodo,
        removeTodosOfProject,
        getTodo,
        getTodosOfProject,
        copyTodosFromStorage,
        getTodayTodos,
    }

})();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav */ "./src/nav.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQzs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUMsd0NBQXdDLHVCQUF1QixLQUFLLFVBQVU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQSxpQ0FBaUMsTUFBTSxhQUFhLFFBQVE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0EsaURBQWlEO0FBQ2pEO0FBQ0EsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7VUMxSkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9jb250ZW50QnVpbGRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9pbmJveExvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9vdmVyZHVlTG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2FkZXJzL3Byb2plY3RMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvdG9kYXlMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvd2Vla0xvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbmF2LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0U3RvcmFnZSB9IGZyb20gJy4uL3Byb2plY3QnO1xuaW1wb3J0IHsgdG9kb0ZhY3RvcnkgfSBmcm9tICcuLi90b2RvJztcbmltcG9ydCB7IHJlZnJlc2ggfSBmcm9tICcuLi9uYXYnO1xuXG5jb25zdCBjb252ZXJ0RGF0ZVRvV29yZHMgPSAoZGF0ZVN0cmluZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGVTdHJpbmcpOzJcbiAgICBsZXQgeCA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG4gICAgbGV0IGRhdGVBcnIgPSBkYXRlLnRvRGF0ZVN0cmluZygpLnNwbGl0KCcgJyk7XG4gICAgbGV0IG1vbnRoID0gZGF0ZUFyclsxXTtcbiAgICBsZXQgZGF5ID0gcGFyc2VJbnQoZGF0ZUFyclsyXSk7XG4gICAgbGV0IHllYXIgPSAoIGRhdGVBcnJbM10gPT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICkgPyAnJyA6IGAgJHtkYXRlQXJyWzNdfWA7XG5cbiAgICByZXR1cm4gbW9udGggKyAnICcgKyBkYXkgKyAnICcgKyB5ZWFyO1xufVxuXG5jb25zdCBidWlsZFRvZG9DaXJjbGUgPSAodG9kbykgPT4ge1xuXG4gICAgbGV0IHByaW9yaXR5ID0gcGFyc2VJbnQodG9kby5nZXRQcmlvcml0eSgpKTtcbiAgICBsZXQgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBzd2l0Y2ggKHByaW9yaXR5KSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCBibGFjayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmx1ZSc7XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2xpZ2h0IGJsdWUnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZWQnO1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgcHJpb3JpdHkgZ2l2ZW4gZm9yIHRvZG8gY2lyY2xlIGNvbG9yXCIpO1xuICAgIH0gXG5cbiAgICByZXR1cm4gY2lyY2xlO1xufVxuXG5jb25zdCBidWlsZFRvZG9FbGVtZW50ID0gKHRvZG8pID0+IHtcbiAgICBsZXQgdG9kb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvRWxlbWVudC5pZCA9IGB0b2RvLSR7dG9kby5nZXRJRCgpfWA7XG4gICAgdG9kb0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xuXG4gICAgLy8gYnVpbGQgY2lyY2xlIGFuZCB0aXRsZSByb3dcbiAgICBsZXQgdG9wUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9wUm93LmNsYXNzTGlzdC5hZGQoJ3RvcC1yb3cnKTtcblxuICAgIGxldCBjaXJjbGUgPSBidWlsZFRvZG9DaXJjbGUodG9kbyk7XG4gICAgY2lyY2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgdG9kbyBpZDogJHt0b2RvLmdldElEKCl9LCBwcm9qZWN0LWlkOiAke3RvZG8uZ2V0UHJvamVjdCgpfWApO1xuICAgICAgICBwcm9qZWN0U3RvcmFnZS5kZWxldGVUb2RvRnJvbVByb2plY3QodG9kby5nZXRJRCgpLCB0b2RvLmdldFByb2plY3QoKSk7XG4gICAgICAgIHJlZnJlc2goZmFsc2UpO1xuICAgIH0pO1xuICAgIGNpcmNsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWNpcmNsZScpO1xuXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VGl0bGUoKTtcblxuICAgIHRvcFJvdy5hcHBlbmRDaGlsZChjaXJjbGUpO1xuICAgIHRvcFJvdy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndG9kby1kZXNjcmlwdGlvbicpO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5nZXREZXNjcmlwdGlvbigpO1xuXG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWR1ZS1kYXRlJyk7XG4gICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGNvbnZlcnREYXRlVG9Xb3Jkcyh0b2RvLmdldER1ZURhdGUoKSk7XG4gICAgLy8gZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RHVlRGF0ZSgpO1xuXG4gICAgdG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQodG9wUm93KTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgdG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG5cbiAgICByZXR1cm4gdG9kb0VsZW1lbnQ7XG59XG5cbmNvbnN0IGJ1aWxkVG9kb0FkZEJ1dHRvbiA9ICgpID0+IHtcblxuICAgIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhZGRCdXR0b24uaWQgPSAndG9kby1hZGQtYnV0dG9uJztcblxuICAgIGxldCBwbHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHBsdXMudGV4dENvbnRlbnQgPSAnKyc7XG4gICAgcGx1cy5pZCA9ICd0b2RvLWFkZC1wbHVzJztcblxuICAgIGxldCBhZGRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGFkZFRleHQudGV4dENvbnRlbnQgPSAnQWRkIHRhc2snO1xuICAgIGFkZFRleHQuaWQgPSAndG9kby1hZGQtdGV4dCc7XG5cbiAgICBhZGRCdXR0b24uYXBwZW5kQ2hpbGQocGx1cyk7XG4gICAgYWRkQnV0dG9uLmFwcGVuZENoaWxkKGFkZFRleHQpO1xuXG4gICAgYWRkQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiByZWZyZXNoKHRydWUpO1xuXG4gICAgcmV0dXJuIGFkZEJ1dHRvbjtcblxufVxuXG5jb25zdCBmb3JtQnVpbGRlciA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHN1Ym1pdEFkZEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS10aXRsZScpLnZhbHVlO1xuICAgICAgICBsZXQgZGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0tZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgbGV0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLWRhdGUnKS52YWx1ZTtcbiAgICAgICAgbGV0IHByb2plY3QgPSBTdHJpbmcoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS1wcm9qZWN0JykudmFsdWUpO1xuICAgICAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLXByaW9yaXR5JykudmFsdWU7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdElEID0gKHByb2plY3Quc3RhcnRzV2l0aCgncHJvamVjdCcpKSA/IChwcm9qZWN0LmF0KC0xKSkgOiBwcm9qZWN0O1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0SUQpO1xuICAgICAgICBjb25zdCB0b2RvID0gdG9kb0ZhY3RvcnkodGl0bGUsZGVzYyxkYXRlLHByb2plY3RJRCxwcmlvcml0eSk7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0U3RvcmFnZS5hZGRUb2RvVG9Qcm9qZWN0KHRvZG8sIHByb2plY3RJRCk7XG4gICAgICAgIHJlZnJlc2goZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBidWlsZFRpdGxlID0gKCkgPT4ge1xuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSAnVGl0bGUnO1xuXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRpdGxlLmlkID0gJ3RvZG8tZm9ybS10aXRsZSc7XG4gICAgICAgIHRpdGxlLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgdGl0bGVMYWJlbC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRpdGxlLnBsYWNlaG9sZGVyID0gXCJFeGFtXCI7XG5cbiAgICAgICAgcmV0dXJuIHRpdGxlTGFiZWw7XG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGREZXNjcmlwdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gJ2Rlc2NyaXB0aW9uJztcblxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkZXNjcmlwdGlvbi5pZCA9ICd0b2RvLWZvcm0tZGVzY3JpcHRpb24nO1xuICAgICAgICBkZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9IFwiRWNvbm9taWNzIEV4YW0gb3ZlciBjaGFwdGVycyAxLTVcIlxuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25MYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkRGF0ZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9ICdEdWUgRGF0ZSc7XG5cbiAgICAgICAgbGV0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkYXRlLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkYXRlLmlkID0gJ3RvZG8tZm9ybS1kYXRlJ1xuICAgICAgICBkYXRlTGFiZWwuYXBwZW5kQ2hpbGQoZGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGVMYWJlbDtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZFByb2plY3REcm9wZG93biA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsZXQgcHJvamVjdERyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIHByb2plY3REcm9wZG93bi5pZCA9ICd0b2RvLWZvcm0tcHJvamVjdCc7XG4gICAgICAgIHByb2plY3RMYWJlbC50ZXh0Q29udGVudCA9ICdQcm9qZWN0JzsgICAgICAgIFxuXG4gICAgICAgIC8vIGRlZmF1bHQgaW5ib3ggb3B0aW9uXG4gICAgICAgIGxldCBpbmJveE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBpbmJveE9wdGlvbi52YWx1ZSA9ICdpbmJveCc7XG4gICAgICAgIGluYm94T3B0aW9uLmlubmVySFRNTCA9ICdJbmJveCc7XG4gICAgICAgIHByb2plY3REcm9wZG93bi5hcHBlbmRDaGlsZChpbmJveE9wdGlvbik7XG5cbiAgICAgICAgLy8gZGlzcGxheSBwcm9qZWN0IG9wdGlvbnNcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBwcm9qZWN0U3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBgcHJvamVjdC0ke3Byb2plY3RzW2ldLmdldElEKCl9YDtcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBwcm9qZWN0c1tpXS5nZXRUaXRsZSgpO1xuICAgICAgICAgICAgcHJvamVjdERyb3Bkb3duLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWxlY3QgY3VycmVudCB0YWIgYnkgZGVmYXVsdFxuICAgICAgICBsZXQgb3B0aW9ucyA9IHByb2plY3REcm9wZG93bi5vcHRpb25zO1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpXS52YWx1ZSA9PT0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdERyb3Bkb3duLnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvamVjdExhYmVsLmFwcGVuZENoaWxkKHByb2plY3REcm9wZG93bik7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RMYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkUHJpb3JpdHlEcm9wZG93biA9ICgpID0+IHtcbiAgICAgICAgbGV0IHByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBwcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5JztcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIHByaW9yaXR5LmlkID0gJ3RvZG8tZm9ybS1wcmlvcml0eSc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBpO1xuICAgICAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBwcmlvcml0eS5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHByaW9yaXR5TGFiZWwuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuXG4gICAgICAgIHJldHVybiBwcmlvcml0eUxhYmVsXG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGRCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9ucy5pZCA9ICd0b2RvLWZvcm0tYnRucyc7XG5cbiAgICAgICAgbGV0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHN1Ym1pdC50eXBlID0gJ3N1Ym1pdCdcbiAgICAgICAgc3VibWl0LmlkID0gJ3RvZG8tZm9ybS1zdWJtaXQnO1xuICAgICAgICBzdWJtaXQudmFsdWUgPSAnQWRkIHRvZG8nO1xuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHN1Ym1pdEFkZEZvcm0oKTtcbiAgICAgICAgfSk7IFxuXG4gICAgICAgIGxldCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNsb3NlLmlkID0gJ3RvZG8tZm9ybS1jbG9zZSc7XG4gICAgICAgIGNsb3NlLnZhbHVlID0gJ0Nsb3NlJztcbiAgICAgICAgY2xvc2UudHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgcmVmcmVzaChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQoc3VibWl0KTtcbiAgICAgICAgYnV0dG9ucy5hcHBlbmRDaGlsZChjbG9zZSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnVpbGRUaXRsZSxcbiAgICAgICAgYnVpbGREZXNjcmlwdGlvbixcbiAgICAgICAgYnVpbGREYXRlLFxuICAgICAgICBidWlsZFByb2plY3REcm9wZG93bixcbiAgICAgICAgYnVpbGRQcmlvcml0eURyb3Bkb3duLFxuICAgICAgICBidWlsZEJ1dHRvbnMsXG4gICAgfVxuXG59KSgpO1xuXG5jb25zdCBidWlsZFRvZG9BZGRGb3JtID0gKCkgPT4ge1xuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uaWQgPSAndG9kby1mb3JtJztcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybUJ1aWxkZXIuYnVpbGRUaXRsZSgpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkRGVzY3JpcHRpb24oKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtQnVpbGRlci5idWlsZERhdGUoKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtQnVpbGRlci5idWlsZFByb2plY3REcm9wZG93bigpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkUHJpb3JpdHlEcm9wZG93bigpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkQnV0dG9ucygpKTtcbiAgICByZXR1cm4gZm9ybTtcbn1cblxuZXhwb3J0IHsgXG4gICAgYnVpbGRUb2RvQWRkQnV0dG9uLFxuICAgIGJ1aWxkVG9kb0VsZW1lbnQsXG4gICAgYnVpbGRUb2RvQWRkRm9ybSxcbn07IiwiLy8gaW1wb3J0IHsgYnVpbGRUb2RvQWRkQnV0dG9uLCBidWlsZFRvZG9FbGVtZW50LCBidWlsZFRvZG9BZGRGb3JtfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuLy8gaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi4vdG9kb1wiO1xuXG4vLyBmdW5jdGlvbiBsb2FkSW5ib3goZm9ybUFjdGl2ZT1mYWxzZSkge1xuICAgIFxuLy8gICAgIGxldCB0b2RvcyA9IHRvZG9TdG9yYWdlLmdldFRvZG9zT2ZQcm9qZWN0KCdpbmJveCcpO1xuXG4vLyAgICAgbGV0IHRvZG9FZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1lZGl0b3InKTtcbi8vICAgICB0b2RvRWRpdG9yLmlubmVySFRNTCA9ICcnO1xuXG4vLyAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4vLyAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICBcbi8vICAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICB0b2RvTGlzdC5pZCA9ICd0b2RvLWxpc3QnO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICBsZXQgdG9kb0VsZW1lbnQgPSBidWlsZFRvZG9FbGVtZW50KHRvZG9zW2ldKTtcbi8vICAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0VsZW1lbnQpO1xuLy8gICAgIH1cbiAgICBcbi8vICAgICAvLyBidWlsZCBhZGQgYnV0dG9uIC8gZm9ybVxuLy8gICAgIGxldCBhZGQgPSAoZm9ybUFjdGl2ZSkgPyBidWlsZFRvZG9BZGRGb3JtKCkgOiBidWlsZFRvZG9BZGRCdXR0b24oKTtcbi8vICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChhZGQpO1xuXG4vLyAgICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuLy8gICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xuLy8gfVxuXG4vLyBleHBvcnQge2xvYWRJbmJveH1cbiIsImltcG9ydCB7IGJ1aWxkVG9kb0FkZEJ1dHRvbiwgYnVpbGRUb2RvRWxlbWVudCB9IGZyb20gXCIuL2NvbnRlbnRCdWlsZGVyXCI7XG5cbmZ1bmN0aW9uIGxvYWRPdmVyZHVlKGZvcm1BY3RpdmU9ZmFsc2UpIHtcbiAgICBsZXQgdG9kb0VkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWVkaXRvcicpO1xuICAgIHRvZG9FZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnT3ZlcmR1ZSc7XG5cbiAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvTGlzdC5pZCA9ICd0b2RvLWxpc3QnO1xuXG4gICAgLy8gYnVpbGQgYWRkIGJ1dHRvbiAvIGZvcm1cbiAgICBsZXQgYWRkID0gKGZvcm1BY3RpdmUpID8gYnVpbGRUb2RvQWRkRm9ybSgpIDogYnVpbGRUb2RvQWRkQnV0dG9uKCk7XG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoYWRkKTtcblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuZXhwb3J0IHsgbG9hZE92ZXJkdWUgfTsiLCJpbXBvcnQgeyBidWlsZFRvZG9BZGRCdXR0b24sIGJ1aWxkVG9kb0VsZW1lbnQsIGJ1aWxkVG9kb0FkZEZvcm0gfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi4vdG9kb1wiO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UgfSBmcm9tIFwiLi4vcHJvamVjdFwiO1xuXG5mdW5jdGlvbiBsb2FkUHJvamVjdChwcm9qZWN0SUQsIGZvcm1BY3RpdmUgPSBmYWxzZSkge1xuXG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0U3RvcmFnZS5nZXRQcm9qZWN0KHByb2plY3RJRCk7XG5cbiAgICBsZXQgdG9kb3MgPSB0b2RvU3RvcmFnZS5nZXRUb2Rvc09mUHJvamVjdChwcm9qZWN0LmdldElEKCkpO1xuXG4gICAgbGV0IHRvZG9FZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1lZGl0b3InKTtcbiAgICB0b2RvRWRpdG9yLmlubmVySFRNTCA9ICcnO1xuXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRUaXRsZSgpO1xuXG4gICAgbGV0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0xpc3QuaWQgPSAndG9kby1saXN0JztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRvZG9FbGVtZW50ID0gYnVpbGRUb2RvRWxlbWVudCh0b2Rvc1tpXSk7XG4gICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBidWlsZCBhZGQgYnV0dG9uIC8gZm9ybVxuICAgIGxldCBhZGQgPSAoZm9ybUFjdGl2ZSkgPyBidWlsZFRvZG9BZGRGb3JtKCkgOiBidWlsZFRvZG9BZGRCdXR0b24oKTtcbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChhZGQpO1xuXG4gICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xufVxuXG5leHBvcnQgeyBsb2FkUHJvamVjdCB9XG4iLCJpbXBvcnQgeyBidWlsZFRvZG9BZGRCdXR0b24sIGJ1aWxkVG9kb0VsZW1lbnQgfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tICcuLi90b2RvJztcblxuY29uc3QgZ2V0Rm9ybWF0dGVkRGF0ZSA9ICgpID0+IHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgY29uc29sZS5sb2coZGF0ZSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gICAgLy8gcmV0dXJuIGZvcm1hdCh0b2RheSwgJ01NL2RkL3l5eXknKTtcbn1cblxuZnVuY3Rpb24gbG9hZFRvZGF5KGZvcm1BY3RpdmU9ZmFsc2UpIHtcbiAgICBsZXQgdG9kb0VkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWVkaXRvcicpO1xuICAgIHRvZG9FZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuXG4gICAgbGV0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0xpc3QuaWQgPSAndG9kby1saXN0JztcblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcblxuICAgIC8vIGRpc3BsYXkgdG9kYXkncyB0b2Rvc1xuICAgIGxldCB0b2RvcyA9IHRvZG9TdG9yYWdlLmdldFRvZGF5VG9kb3MoKTtcbiAgICBjb25zb2xlLmxvZyh0b2Rvcyk7XG59XG5cbmV4cG9ydCB7IGxvYWRUb2RheSB9OyIsImltcG9ydCB7IGJ1aWxkVG9kb0FkZEJ1dHRvbiwgYnVpbGRUb2RvRWxlbWVudCB9IGZyb20gXCIuL2NvbnRlbnRCdWlsZGVyXCI7XG5cbmZ1bmN0aW9uIGxvYWRXZWVrKGZvcm1BY3RpdmU9ZmFsc2UpIHtcbiAgICBsZXQgdG9kb0VkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWVkaXRvcicpO1xuICAgIHRvZG9FZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnV2Vla2x5JztcblxuICAgIGxldCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9MaXN0LmlkID0gJ3RvZG8tbGlzdCc7XG5cbiAgICAvLyBidWlsZCBhZGQgYnV0dG9uIC8gZm9ybVxuICAgIGxldCBhZGQgPSAoZm9ybUFjdGl2ZSkgPyBidWlsZFRvZG9BZGRGb3JtKCkgOiBidWlsZFRvZG9BZGRCdXR0b24oKTtcbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChhZGQpO1xuXG4gICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xufVxuXG5leHBvcnQgeyBsb2FkV2VlayB9OyIsImltcG9ydCB7IGxvYWRJbmJveCB9IGZyb20gJy4vbG9hZGVycy9pbmJveExvYWRlcic7XG5pbXBvcnQgeyBsb2FkVG9kYXkgfSBmcm9tICcuL2xvYWRlcnMvdG9kYXlMb2FkZXInO1xuaW1wb3J0IHsgbG9hZFdlZWsgfSBmcm9tICcuL2xvYWRlcnMvd2Vla0xvYWRlcic7XG5pbXBvcnQgeyBsb2FkT3ZlcmR1ZSB9IGZyb20gJy4vbG9hZGVycy9vdmVyZHVlTG9hZGVyJztcbmltcG9ydCB7IGxvYWRQcm9qZWN0IH0gZnJvbSAnLi9sb2FkZXJzL3Byb2plY3RMb2FkZXInO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UsIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCB7IHRvZG9GYWN0b3J5LCB0b2RvU3RvcmFnZSB9IGZyb20gJy4vdG9kbyc7XG5cbmxldCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbi8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuLy8gdG9kb1N0b3JhZ2UuY29weVRvZG9zRnJvbVN0b3JhZ2UoKTtcbmxldCBzdG9yYWdlVGFiID0gc3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZCcpO1xubGV0IGN1cnJlbnRUYWIgPSAoc3RvcmFnZVRhYikgPyBzdG9yYWdlVGFiIDogJ2luYm94JztcblxuY29uc3QgcmVmcmVzaCA9IChmb3JtQWN0aXZlPWZhbHNlKSA9PiB7XG4gICAgc3dpdGNoIChjdXJyZW50VGFiKSB7XG4gICAgICAgIGNhc2UgJ2luYm94JzpcbiAgICAgICAgICAgIGxvYWRQcm9qZWN0KFwiaW5ib3hcIiwgZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICAvLyBsb2FkSW5ib3goZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3ZlcmR1ZSc6XG4gICAgICAgICAgICBsb2FkT3ZlcmR1ZShmb3JtQWN0aXZlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgICAgICBsb2FkVG9kYXkoZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICBsb2FkV2Vlayhmb3JtQWN0aXZlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbGV0IHByb2plY3RJRCA9IGN1cnJlbnRUYWIuc2xpY2UoY3VycmVudFRhYi5pbmRleE9mKCctJykrMSk7XG4gICAgICAgICAgICBsb2FkUHJvamVjdChwcm9qZWN0SUQsIGZvcm1BY3RpdmUpO1xuICAgIH1cblxufVxuXG5jb25zdCBzZXRUYWIgPSB0YWIgPT4ge1xuICAgIGN1cnJlbnRUYWIgPSB0YWI7XG4gICAgc3RvcmFnZS5zZXRJdGVtKCdzZWxlY3RlZCcsIHRhYik7XG4gICAgcmVmcmVzaCgpO1xufVxuXG5jb25zdCBwcm9qZWN0VGFiQnVpbGRlciA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGJ1aWxkUHJvamVjdFRhYiA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGxldCBwcm9qZWN0VGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFRpdGxlKCk7XG4gICAgICAgIGxldCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgLy8gZGVsZXRlIGJ1dHRvblxuICAgICAgICBkZWxldGVCdG4uaW5uZXJIVE1MID0gJyYjMTAwMDUnO1xuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgncmlnaHQtdGFiJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWRlbGV0ZS1idXR0b24nKTtcbiAgICAgICAgZGVsZXRlQnRuLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdFRhYihwcm9qZWN0KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYXBwZW5kIGl0ZW1zIHRvIHRhYlxuICAgICAgICBwcm9qZWN0VGFiLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgcHJvamVjdFRhYi5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICAgICAgICBwcm9qZWN0VGFiLmNsYXNzTGlzdC5hZGQoJ3RhYicpO1xuICAgICAgICBwcm9qZWN0VGFiLmlkID0gJ3Byb2plY3QtJyArIHByb2plY3QuZ2V0SUQoKTtcblxuICAgICAgICAvLyBhbGxvdyB0YWIgc3dpdGNoaW5nIGZvciBwcm9qZWN0IHRhYnNcbiAgICAgICAgcHJvamVjdFRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SUQgPSBwcm9qZWN0LmdldElEKCk7XG4gICAgICAgICAgICBzZXRUYWIoJ3Byb2plY3QtJyArIHByb2plY3RJRCk7XG4gICAgICAgICAgICBUYWJIaWdobGlnaHRlci51cGRhdGVIaWdobGlnaHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RUYWI7XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdFRhYiA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC0nICsgcHJvamVjdC5nZXRJRCgpKTtcbiAgICAgICAgaWYgKHByb2plY3RUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtdGFiJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHNldFRhYignaW5ib3gnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcHJvamVjdFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0LmdldElEKCkpO1xuICAgICAgICByZW5kZXJQcm9qZWN0VGFicygpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJ1aWxkUHJvamVjdFRhYiB9O1xuXG59KSgpO1xuXG5jb25zdCBwcm9qZWN0Rm9ybUJ1aWxkZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBidWlsZFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBmb3JtLmlkID0gJ3Byb2plY3QtYWRkLWZvcm0nO1xuXG4gICAgICAgIGxldCB0ZXh0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGV4dGJveC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgdGV4dGJveC5pZCA9ICdwcm9qZWN0LWFkZC10ZXh0Ym94JztcblxuICAgICAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmlkID0gJ3Byb2plY3QtYWRkLXN1Ym1pdCc7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi52YWx1ZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJzEwMDAzJyk7XG5cbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzdWJtaXRGb3JtKHRleHRib3gudmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5pZCA9ICdwcm9qZWN0LWFkZC1jbG9zZSc7XG4gICAgICAgIGNsb3NlQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY2xvc2VCdXR0b24udmFsdWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCcxMDAwNicpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5vbmNsaWNrID0gY2xvc2VGb3JtO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQodGV4dGJveCk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG5cbiAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VGb3JtID0gKCkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtYWRkLWZvcm0nKTtcbiAgICAgICAgcHJvamVjdExpc3QucmVtb3ZlQ2hpbGQoZm9ybSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3VibWl0Rm9ybSA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHRpdGxlKTtcbiAgICAgICAgcHJvamVjdFN0b3JhZ2UuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyUHJvamVjdFRhYnMoKTtcblxuICAgICAgICAvLyBzd2l0Y2ggdG8gbmV3IHRhYlxuICAgICAgICBzZXRUYWIoYHByb2plY3QtJHtuZXdQcm9qZWN0LmdldElEKCl9YCk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJ1aWxkUHJvamVjdEZvcm0gfTtcblxufSkoKTtcblxuY29uc3QgcmVuZGVyUHJvamVjdFRhYnMgPSAoKSA9PiB7XG5cbiAgICAvLyByZXNldCBwcm9qZWN0IGxpc3RcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0JykuaW5uZXJIVE1MID0gJyc7XG4gICAgXG4gICAgLy8gYWRkIGVhY2ggcHJvamVjdCBmcm9tIHN0b3JhZ2VcbiAgICBsZXQgcHJvamVjdHMgPSBwcm9qZWN0U3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xuICAgIGxldCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhYiA9IHByb2plY3RUYWJCdWlsZGVyLmJ1aWxkUHJvamVjdFRhYihwcm9qZWN0c1tpXSk7XG4gICAgICAgIFRhYkhpZ2hsaWdodGVyLnVwZGF0ZUhpZ2hsaWdodCgpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIH1cbn1cblxuY29uc3QgVGFiSGlnaGxpZ2h0ZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgdXBkYXRlSGlnaGxpZ2h0ID0gKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmUgc2VsZWN0ZWQgdGFiIGlmIGFueVxuXG4gICAgICAgIGxldCBzZWxlY3RlZFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHNlbGVjdGVkVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUYWIuc3RhcnRzV2l0aCgncHJvamVjdCcpKSB7XG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgaWYgKHByb2plY3QpIHByb2plY3QuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRUYWIgKyAnLXRhYicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyB1cGRhdGVIaWdobGlnaHQgfTtcbn0pKCk7XG5cbmNvbnN0IHByb2plY3RBZGRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1hZGQtYnV0dG9uJyk7XG5wcm9qZWN0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCBmb3JtID0gcHJvamVjdEZvcm1CdWlsZGVyLmJ1aWxkUHJvamVjdEZvcm0oKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0JykuYXBwZW5kQ2hpbGQoZm9ybSk7XG59KTtcblxuLy8gYWxsb3cgdGFiIHN3aXRjaGluZ1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBpZCA9IHRhYi5pZC5zbGljZSgwLCB0YWIuaWQuaW5kZXhPZignLScpKTtcbiAgICAgICAgc2V0VGFiKGlkKTtcbiAgICAgICAgVGFiSGlnaGxpZ2h0ZXIudXBkYXRlSGlnaGxpZ2h0KCk7XG4gICAgfSk7XG59KTtcblxucmVuZGVyUHJvamVjdFRhYnMoKTtcbnJlZnJlc2goKTtcblRhYkhpZ2hsaWdodGVyLnVwZGF0ZUhpZ2hsaWdodCgpO1xuXG5leHBvcnQgeyByZWZyZXNoIH07IiwiaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi90b2RvXCI7XG5cbmNvbnN0IHByb2plY3RJREdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHN0b3JlZElEID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCduZXh0UHJvamVjdElEJyk7XG4gICAgbGV0IF9uZXh0QXZhaWxhYmxlSWQgPSAoc3RvcmVkSUQpID8gc3RvcmVkSUQgOiAwO1xuXG4gICAgY29uc3QgZ2VuZXJhdGVQcm9qZWN0SUQgPSAoKSA9PiB7XG4gICAgICAgIGxldCByZXR1cm5JRCA9IF9uZXh0QXZhaWxhYmxlSWQrKztcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCduZXh0UHJvamVjdElEJywgX25leHRBdmFpbGFibGVJZCk7XG4gICAgICAgIHJldHVybiByZXR1cm5JRDtcbiAgICB9XG5cbiAgICByZXR1cm4geyBnZW5lcmF0ZVByb2plY3RJRCB9XG59KSgpO1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9ICh0aXRsZSwgaWQgPSBudWxsKSA9PiB7XG4gICAgbGV0IF9pZCA9IChpZCA9PT0gbnVsbCkgPyBwcm9qZWN0SURHZW5lcmF0b3IuZ2VuZXJhdGVQcm9qZWN0SUQoKSA6IGlkO1xuICAgIGxldCBfdGl0bGUgPSB0aXRsZTtcbiAgICBsZXQgX3RvZG9zID0gW107ICAgIC8vIGhvbGRzIHByb2plY3QgaWRzXG5cbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IF90aXRsZTtcbiAgICBjb25zdCBnZXRJRCA9ICgpID0+IF9pZDtcbiAgICBjb25zdCBnZXRUb2RvcyA9IHRvZG9TdG9yYWdlLmdldFRvZG9zT2ZQcm9qZWN0KF9pZCk7XG5cbiAgICBjb25zdCBzdHJpbmdpZnkgPSAoKSA9PiB7IC8vZS5nLiwgMTR8fHxteXByb2plY3R8fHwxLTItNi0xMS0yMFxuICAgICAgICBsZXQgcFN0cmluZyA9IGAke2dldElEKCl9fHx8JHtnZXRUaXRsZSgpfXx8fGA7XG5cbiAgICAgICAgaWYgKF90b2Rvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgX3RvZG9zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHBTdHJpbmcgKz0gU3RyaW5nKF90b2Rvc1tpXSkgKyAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwU3RyaW5nICs9IF90b2Rvcy5hdCgtMSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwU3RyaW5nO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZFRvZG8gPSAodG9kb0lEKSA9PiB7XG4gICAgICAgIF90b2Rvcy5wdXNoKHRvZG9JRCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShgcHJvamVjdC0ke19pZH1gLHN0cmluZ2lmeSgpKTtcbiAgICB9O1xuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0lEKSA9PiBfdG9kb3Muc3BsaWNlKF90b2Rvcy5pbmRleE9mKHRvZG9JRCwxKSk7XG5cbiAgICByZXR1cm4geyBcbiAgICAgICAgICAgIGdldFRpdGxlLCBcbiAgICAgICAgICAgIGFkZFRvZG8sIFxuICAgICAgICAgICAgZGVsZXRlVG9kbywgXG4gICAgICAgICAgICBnZXRJRCxcbiAgICAgICAgICAgIGdldFRvZG9zLFxuICAgICAgICAgICAgc3RyaW5naWZ5LFxuICAgIH07XG59XG5cbmNvbnN0IF9idWlsZFByb2plY3QgPSAocHJvamVjdFN0cmluZykgPT4ge1xuICAgIGNvbnN0IGRlbGltZXRlciA9IFwifHx8XCI7XG4gICAgbGV0IHZhbHMgPSBwcm9qZWN0U3RyaW5nLnNwbGl0KGRlbGltZXRlcik7XG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeSh2YWxzWzFdLCB2YWxzWzBdKTtcbiAgICBsZXQgdG9kb0lEcyA9IFN0cmluZyh2YWxzWzJdKS5zcGxpdCgnLScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb0lEcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9qZWN0LmFkZFRvZG8odG9kb0lEc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9qZWN0O1xufVxuXG5jb25zdCBwcm9qZWN0U3RvcmFnZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgbGV0IGluYm94ID0gcHJvamVjdEZhY3RvcnkoJ2luYm94JywnaW5ib3gnKTtcbiAgICBsZXQgX3Byb2plY3RzID0geyAnaW5ib3gnIDogaW5ib3ggfTtcblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBfcHJvamVjdHNbcHJvamVjdC5nZXRJRCgpXSA9IHByb2plY3Q7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShgcHJvamVjdC0ke3Byb2plY3QuZ2V0SUQoKX1gLCBwcm9qZWN0LnN0cmluZ2lmeSgpKTtcbiAgICB9XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICAgICAgaWYgKHByb2plY3RJRCA9PT0gJ2luYm94Jykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nhbm5vdCBkZWxldGUgaW5ib3gnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfcHJvamVjdHNbcHJvamVjdElEXTtcbiAgICAgICAgICAgIHRvZG9TdG9yYWdlLnJlbW92ZVRvZG9zT2ZQcm9qZWN0KHByb2plY3RJRCk7XG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oYHByb2plY3QtJHtwcm9qZWN0SUR9YCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYWRkVG9kb1RvUHJvamVjdCA9ICh0b2RvLCBwcm9qZWN0SUQpID0+IHtcbiAgICAgICAgX3Byb2plY3RzW3Byb2plY3RJRF0uYWRkVG9kbyh0b2RvLmdldElEKCkpO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oYHByb2plY3QtJHtwcm9qZWN0SUR9YCwgX3Byb2plY3RzW3Byb2plY3RJRF0uc3RyaW5naWZ5KCkpO1xuICAgICAgICB0b2RvU3RvcmFnZS5hZGRUb2RvKHRvZG8pO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVUb2RvRnJvbVByb2plY3QgPSAodG9kb0lELCBwcm9qZWN0SUQpID0+IHtcbiAgICAgICAgX3Byb2plY3RzW3Byb2plY3RJRF0uZGVsZXRlVG9kbyh0b2RvSUQpO1xuICAgICAgICB0b2RvU3RvcmFnZS5yZW1vdmVUb2RvKHRvZG9JRCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShgdG9kby0ke3RvZG9JRH1gKTtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0LSR7cHJvamVjdElEfWAsX3Byb2plY3RzW3Byb2plY3RJRF0uc3RyaW5naWZ5KCkpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBnZXRBbGxQcm9qZWN0cyA9ICgpID0+IE9iamVjdC52YWx1ZXMoX3Byb2plY3RzKS5maWx0ZXIoXG4gICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldElEKCkgIT09ICdpbmJveCdcbiAgICApO1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdCA9IChpZCkgPT4gX3Byb2plY3RzW2lkXTtcblxuICAgIC8vIGNvcHkgcHJvamVjdHMgZnJvbSBzdG9yYWdlXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzdG9yYWdlLmtleShpKS5zdGFydHNXaXRoKCdwcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0U3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gX2J1aWxkUHJvamVjdChwcm9qZWN0U3RyaW5nKTtcbiAgICAgICAgICAgIF9wcm9qZWN0c1twcm9qZWN0LmdldElEKCldID0gcHJvamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgICAgXG4gICAgICAgIGFkZFByb2plY3QsXG4gICAgICAgIGRlbGV0ZVByb2plY3QsXG4gICAgICAgIGdldEFsbFByb2plY3RzLFxuICAgICAgICBnZXRQcm9qZWN0LFxuICAgICAgICBhZGRUb2RvVG9Qcm9qZWN0LFxuICAgICAgICBkZWxldGVUb2RvRnJvbVByb2plY3QsXG4gICAgfTtcbn0pKCk7XG5cblxuZXhwb3J0IHsgcHJvamVjdEZhY3RvcnksIHByb2plY3RTdG9yYWdlIH07IiwiY29uc3QgdG9kb0lER2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzdG9yZWRJRCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmV4dFRvZG9JRCcpO1xuICAgIGxldCBfbmV4dEF2YWlsYWJsZUlkID0gKHN0b3JlZElEKSA/IHN0b3JlZElEIDogMDtcblxuICAgIGNvbnN0IGdlbmVyYXRlVG9kb0lEID0gKCkgPT4ge1xuICAgICAgICBsZXQgcmV0dXJuSUQgPSBfbmV4dEF2YWlsYWJsZUlkKys7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmV4dFRvZG9JRCcsIF9uZXh0QXZhaWxhYmxlSWQpO1xuICAgICAgICByZXR1cm4gcmV0dXJuSUQ7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGdlbmVyYXRlVG9kb0lEIH1cbn0pKCk7XG5cbmNvbnN0IHRvZG9GYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJvamVjdCwgcHJpb3JpdHksIGlkID0gbnVsbCkgPT4ge1xuICAgIGxldCBfaWQgPSAoaWQgPT09IG51bGwpID8gdG9kb0lER2VuZXJhdG9yLmdlbmVyYXRlVG9kb0lEKCkgOiBpZDtcbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIGxldCBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9wcm9qZWN0ID0gcHJvamVjdDtcbiAgICBsZXQgX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG5cbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IF90aXRsZTtcbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IF9kZXNjcmlwdGlvbjtcbiAgICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gX2R1ZURhdGU7XG4gICAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBfcHJpb3JpdHk7XG4gICAgY29uc3QgZ2V0SUQgPSAoKSA9PiBfaWQ7XG4gICAgY29uc3QgZ2V0UHJvamVjdCA9ICgpID0+IF9wcm9qZWN0O1xuXG4gICAgLy8gIGlkIHx8fCB0aXRsZSB8fHwgZGVzY3JpcHRpb24gfHx8IGRhdGUgfHx8IHByaW9yaXR5IHx8fCBwcm9qZWN0SURcbiAgICAvLyAgNXx8fENTNDExIEhXfHx8Q29tcGxldGUgdGhlIGh3fHx8MTAvMTEvMjAyMXx8fDN8fHwyXG4gICAgY29uc3Qgc3RyaW5naWZ5ID0gKCkgPT4gICBnZXRJRCgpICsgJ3x8fCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBnZXRUaXRsZSgpICsgJ3x8fCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGdldERlc2NyaXB0aW9uKCkgKyAnfHx8J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZ2V0RHVlRGF0ZSgpICsgJ3x8fCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGdldFByb2plY3QoKSArICd8fHwnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZ2V0UHJpb3JpdHkoKTtcblxuICAgIGNvbnN0IHNldFRpdGxlID0gKG5ld1RpdGxlKSA9PiBfdGl0bGUgPSBuZXdUaXRsZTtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gX2Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RHVlRGF0ZSA9IChuZXdEdWVEYXRlKSA9PiBfZHVlRGF0ZSA9IG5ld0R1ZURhdGU7XG4gICAgY29uc3Qgc2V0UHJpb3JpdHkgPSAobmV3UHJpb3JpdHkpID0+IF9wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIGNvbnN0IHNldFByb2plY3QgPSAobmV3UHJvamVjdCkgPT4gX3Byb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFRpdGxlLCBcbiAgICAgICAgZ2V0RGVzY3JpcHRpb24sIFxuICAgICAgICBnZXREdWVEYXRlLCBcbiAgICAgICAgZ2V0UHJpb3JpdHksXG4gICAgICAgIGdldElELFxuICAgICAgICBnZXRQcm9qZWN0LFxuICAgICAgICBzZXRUaXRsZSwgXG4gICAgICAgIHNldERlc2NyaXB0aW9uLCBcbiAgICAgICAgc2V0RHVlRGF0ZSwgXG4gICAgICAgIHNldFByaW9yaXR5LFxuICAgICAgICBzZXRQcm9qZWN0LFxuICAgICAgICBzdHJpbmdpZnlcbiAgICB9O1xufVxuXG5jb25zdCB0b2RvU3RvcmFnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIGxldCBfdG9kb3MgPSB7fTtcbiAgICBsZXQgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgICBjb25zdCBjb3B5VG9kb3NGcm9tU3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGVsaW1ldGVyID0gXCJ8fHxcIjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3RvcmFnZS5rZXkoaSkuc3RhcnRzV2l0aCgndG9kbycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvZG9TdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0oc3RvcmFnZS5rZXkoaSkpO1xuICAgICAgICAgICAgICAgIGxldCB2YWxzID0gdG9kb1N0cmluZy5zcGxpdChkZWxpbWV0ZXIpO1xuICAgICAgICAgICAgICAgIGxldCB0b2RvID0gdG9kb0ZhY3RvcnkodmFsc1sxXSwgdmFsc1syXSwgdmFsc1szXSwgdmFsc1s0XSwgdmFsc1s1XSwgdmFsc1swXSk7XG4gICAgICAgICAgICAgICAgX3RvZG9zW3RvZG8uZ2V0SUQoKV0gPSB0b2RvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkVG9kbyA9ICh0b2RvKSA9PiB7XG4gICAgICAgIF90b2Rvc1t0b2RvLmdldElEKCldID0gdG9kbztcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGB0b2RvLSR7dG9kby5nZXRJRCgpfWAsIHRvZG8uc3RyaW5naWZ5KCkpO1xuICAgICAgICBjb3B5VG9kb3NGcm9tU3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW1vdmVUb2RvID0gKHRvZG9JRCkgPT4ge1xuICAgICAgICBkZWxldGUgX3RvZG9zW3RvZG9JRF07XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShgdG9kby0ke3RvZG9JRH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVUb2Rvc09mUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhfdG9kb3MpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0b2RvID0gX3RvZG9zW2tleXNbaV1dO1xuICAgICAgICAgICAgaWYgKHRvZG8uZ2V0UHJvamVjdCgpID09PSBwcm9qZWN0SUQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVUb2RvKGtleXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0VG9kbyA9ICh0b2RvSUQpID0+IF90b2Rvc1t0b2RvSURdO1xuXG4gICAgY29uc3QgZ2V0VG9kb3NPZlByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvZG9zID0gT2JqZWN0LnZhbHVlcyhfdG9kb3MpO1xuICAgICAgICBsZXQgcmV0dXJucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgY29tcGFyaW5nICR7dG9kb3NbaV0uZ2V0UHJvamVjdCgpfSB0byAke3Byb2plY3RJRH1gKTtcbiAgICAgICAgICAgIGlmICh0b2Rvc1tpXS5nZXRQcm9qZWN0KCkgPT09IHByb2plY3RJRCkge1xuICAgICAgICAgICAgICAgIHJldHVybnMucHVzaCh0b2Rvc1tpXSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3B1c2hpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJucztcbiAgICB9XG5cbiAgICBjb25zdCBnZXRUb2RheVRvZG9zID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgY29uc3QgdG9kb3MgPSBPYmplY3QudmFsdWVzKF90b2Rvcyk7XG4gICAgICAgIGxldCB0b2RheVRvZG9zID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGR1ZURhdGUgPSBuZXcgRGF0ZSh0b2Rvc1tpXS5nZXREdWVEYXRlKCkpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHRvZGF5OiR7dG9kYXl9LCBkdWVEYXRlOiAke2R1ZURhdGV9YCk7XG4gICAgICAgICAgICBpZiAodG9kYXkgPT09IGR1ZURhdGUpIHtcbiAgICAgICAgICAgICAgICB0b2RheVRvZG9zLnB1c2godG9kb3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvZGF5VG9kb3M7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0V2Vla1RvZG9zID0gKCkgPT4ge1xuXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0T3ZlcmR1ZVRvZG9zID0gKCkgPT4ge1xuXG4gICAgfVxuXG5cbiAgICAvLyBjb25zdCBnZXRUb2Rvc09mUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtPYmplY3QudmFsdWVzKF90b2RvcykuZmlsdGVyKHRvZG8gPT4ge1xuICAgIC8vICAgICB0b2RvLmdldFByb2plY3QoKSA9PT0gcHJvamVjdElEO1xuICAgIC8vIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVsb2FkJywgY29weVRvZG9zRnJvbVN0b3JhZ2UoKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRUb2RvLFxuICAgICAgICByZW1vdmVUb2RvLFxuICAgICAgICByZW1vdmVUb2Rvc09mUHJvamVjdCxcbiAgICAgICAgZ2V0VG9kbyxcbiAgICAgICAgZ2V0VG9kb3NPZlByb2plY3QsXG4gICAgICAgIGNvcHlUb2Rvc0Zyb21TdG9yYWdlLFxuICAgICAgICBnZXRUb2RheVRvZG9zLFxuICAgIH1cblxufSkoKTtcblxuZXhwb3J0IHsgdG9kb0ZhY3RvcnksIHRvZG9TdG9yYWdlIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==