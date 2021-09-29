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
    let x = new Date(dateString);
    let date = new Date(dateString);
    let dateArr = date.toDateString().split(' ');
    let month = dateArr[1];
    let day = parseInt(dateArr[2]);
    let year = ( dateArr[3] == new Date().getFullYear() ) ? '' : ` ${dateArr[3]}`;

    return month + ' ' + day + ' ' + year;
}

const buildTodoCircle = (todoPriority) => {

    let priority = parseInt(todoPriority);
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

    circle.addEventListener('click', () => {

    });

    return circle;
}

const buildTodoElement = (todo) => {
    let todoElement = document.createElement('div');
    todoElement.id = `todo-${todo.getID()}`;
    todoElement.classList.add('todo');

    // build circle and title row
    let topRow = document.createElement('div');
    topRow.classList.add('top-row');
    let circle = buildTodoCircle(todo.getPriority());
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

        return titleLabel
    }

    const buildDescription = () => {
        let descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'description';

        let description = document.createElement('input');
        description.id = 'todo-form-description';
        description.required = true;
        descriptionLabel.appendChild(description);

        return descriptionLabel
    }

    const buildDate = () => {
        let dateLabel = document.createElement('label');
        dateLabel.textContent = 'Due Date';

        let date = document.createElement('input');
        date.type = 'date';
        date.required = true;
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
    console.log(todos);

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
    let add = (formActive) ? buildTodoAddForm() : (0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoAddButton)();
    todoList.appendChild(add);

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7OztVQzlIRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2FkZXJzL2NvbnRlbnRCdWlsZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2FkZXJzL2luYm94TG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2FkZXJzL292ZXJkdWVMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvcHJvamVjdExvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy90b2RheUxvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy93ZWVrTG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9uYXYuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RTdG9yYWdlIH0gZnJvbSAnLi4vcHJvamVjdCc7XG5pbXBvcnQgeyB0b2RvRmFjdG9yeSB9IGZyb20gJy4uL3RvZG8nO1xuaW1wb3J0IHsgcmVmcmVzaCB9IGZyb20gJy4uL25hdic7XG5cbmNvbnN0IGNvbnZlcnREYXRlVG9Xb3JkcyA9IChkYXRlU3RyaW5nKSA9PiB7XG4gICAgbGV0IHggPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICAgIGxldCBkYXRlQXJyID0gZGF0ZS50b0RhdGVTdHJpbmcoKS5zcGxpdCgnICcpO1xuICAgIGxldCBtb250aCA9IGRhdGVBcnJbMV07XG4gICAgbGV0IGRheSA9IHBhcnNlSW50KGRhdGVBcnJbMl0pO1xuICAgIGxldCB5ZWFyID0gKCBkYXRlQXJyWzNdID09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSApID8gJycgOiBgICR7ZGF0ZUFyclszXX1gO1xuXG4gICAgcmV0dXJuIG1vbnRoICsgJyAnICsgZGF5ICsgJyAnICsgeWVhcjtcbn1cblxuY29uc3QgYnVpbGRUb2RvQ2lyY2xlID0gKHRvZG9Qcmlvcml0eSkgPT4ge1xuXG4gICAgbGV0IHByaW9yaXR5ID0gcGFyc2VJbnQodG9kb1ByaW9yaXR5KTtcbiAgICBsZXQgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBzd2l0Y2ggKHByaW9yaXR5KSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCBibGFjayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmx1ZSc7XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2xpZ2h0IGJsdWUnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZWQnO1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgcHJpb3JpdHkgZ2l2ZW4gZm9yIHRvZG8gY2lyY2xlIGNvbG9yXCIpO1xuICAgIH0gXG5cbiAgICBjaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBjaXJjbGU7XG59XG5cbmNvbnN0IGJ1aWxkVG9kb0VsZW1lbnQgPSAodG9kbykgPT4ge1xuICAgIGxldCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9FbGVtZW50LmlkID0gYHRvZG8tJHt0b2RvLmdldElEKCl9YDtcbiAgICB0b2RvRWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG5cbiAgICAvLyBidWlsZCBjaXJjbGUgYW5kIHRpdGxlIHJvd1xuICAgIGxldCB0b3BSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b3BSb3cuY2xhc3NMaXN0LmFkZCgndG9wLXJvdycpO1xuICAgIGxldCBjaXJjbGUgPSBidWlsZFRvZG9DaXJjbGUodG9kby5nZXRQcmlvcml0eSgpKTtcbiAgICBjaXJjbGUuY2xhc3NMaXN0LmFkZCgndG9kby1jaXJjbGUnKTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby10aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRUaXRsZSgpO1xuXG4gICAgdG9wUm93LmFwcGVuZENoaWxkKGNpcmNsZSk7XG4gICAgdG9wUm93LmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0b2RvLWRlc2NyaXB0aW9uJyk7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tZHVlLWRhdGUnKTtcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gY29udmVydERhdGVUb1dvcmRzKHRvZG8uZ2V0RHVlRGF0ZSgpKTtcbiAgICAvLyBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5nZXREdWVEYXRlKCk7XG5cbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZCh0b3BSb3cpO1xuICAgIHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChkdWVEYXRlKTtcblxuICAgIHJldHVybiB0b2RvRWxlbWVudDtcbn1cblxuY29uc3QgYnVpbGRUb2RvQWRkQnV0dG9uID0gKCkgPT4ge1xuXG4gICAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFkZEJ1dHRvbi5pZCA9ICd0b2RvLWFkZC1idXR0b24nO1xuXG4gICAgbGV0IHBsdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcGx1cy50ZXh0Q29udGVudCA9ICcrJztcbiAgICBwbHVzLmlkID0gJ3RvZG8tYWRkLXBsdXMnO1xuXG4gICAgbGV0IGFkZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYWRkVGV4dC50ZXh0Q29udGVudCA9ICdBZGQgdGFzayc7XG4gICAgYWRkVGV4dC5pZCA9ICd0b2RvLWFkZC10ZXh0JztcblxuICAgIGFkZEJ1dHRvbi5hcHBlbmRDaGlsZChwbHVzKTtcbiAgICBhZGRCdXR0b24uYXBwZW5kQ2hpbGQoYWRkVGV4dCk7XG5cbiAgICBhZGRCdXR0b24ub25jbGljayA9ICgpID0+IHJlZnJlc2godHJ1ZSk7XG5cbiAgICByZXR1cm4gYWRkQnV0dG9uO1xuXG59XG5cbmNvbnN0IGZvcm1CdWlsZGVyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3Qgc3VibWl0QWRkRm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLXRpdGxlJykudmFsdWU7XG4gICAgICAgIGxldCBkZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0tZGF0ZScpLnZhbHVlO1xuICAgICAgICBsZXQgcHJvamVjdCA9IFN0cmluZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLXByb2plY3QnKS52YWx1ZSk7XG4gICAgICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0tcHJpb3JpdHknKS52YWx1ZTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0SUQgPSAocHJvamVjdC5zdGFydHNXaXRoKCdwcm9qZWN0JykpID8gKHByb2plY3QuYXQoLTEpKSA6IHByb2plY3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RJRCk7XG4gICAgICAgIGNvbnN0IHRvZG8gPSB0b2RvRmFjdG9yeSh0aXRsZSxkZXNjLGRhdGUscHJvamVjdElELHByaW9yaXR5KTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RTdG9yYWdlLmFkZFRvZG9Ub1Byb2plY3QodG9kbywgcHJvamVjdElEKTtcbiAgICAgICAgcmVmcmVzaChmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGJ1aWxkVGl0bGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGl0bGVMYWJlbC50ZXh0Q29udGVudCA9ICdUaXRsZSc7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGl0bGUuaWQgPSAndG9kby1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGUucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0aXRsZUxhYmVsLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICByZXR1cm4gdGl0bGVMYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkRGVzY3JpcHRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9ICdkZXNjcmlwdGlvbic7XG5cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uaWQgPSAndG9kby1mb3JtLWRlc2NyaXB0aW9uJztcbiAgICAgICAgZGVzY3JpcHRpb24ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25MYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkRGF0ZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9ICdEdWUgRGF0ZSc7XG5cbiAgICAgICAgbGV0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICBkYXRlLmlkID0gJ3RvZG8tZm9ybS1kYXRlJ1xuICAgICAgICBkYXRlTGFiZWwuYXBwZW5kQ2hpbGQoZGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGVMYWJlbDtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZFByb2plY3REcm9wZG93biA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsZXQgcHJvamVjdERyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIHByb2plY3REcm9wZG93bi5pZCA9ICd0b2RvLWZvcm0tcHJvamVjdCc7XG4gICAgICAgIHByb2plY3RMYWJlbC50ZXh0Q29udGVudCA9ICdQcm9qZWN0JzsgICAgICAgIFxuXG4gICAgICAgIC8vIGRlZmF1bHQgaW5ib3ggb3B0aW9uXG4gICAgICAgIGxldCBpbmJveE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBpbmJveE9wdGlvbi52YWx1ZSA9ICdpbmJveCc7XG4gICAgICAgIGluYm94T3B0aW9uLmlubmVySFRNTCA9ICdJbmJveCc7XG4gICAgICAgIHByb2plY3REcm9wZG93bi5hcHBlbmRDaGlsZChpbmJveE9wdGlvbik7XG5cbiAgICAgICAgLy8gZGlzcGxheSBwcm9qZWN0IG9wdGlvbnNcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBwcm9qZWN0U3RvcmFnZS5nZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBgcHJvamVjdC0ke3Byb2plY3RzW2ldLmdldElEKCl9YDtcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBwcm9qZWN0c1tpXS5nZXRUaXRsZSgpO1xuICAgICAgICAgICAgcHJvamVjdERyb3Bkb3duLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWxlY3QgY3VycmVudCB0YWIgYnkgZGVmYXVsdFxuICAgICAgICBsZXQgb3B0aW9ucyA9IHByb2plY3REcm9wZG93bi5vcHRpb25zO1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpXS52YWx1ZSA9PT0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdERyb3Bkb3duLnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvamVjdExhYmVsLmFwcGVuZENoaWxkKHByb2plY3REcm9wZG93bik7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RMYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkUHJpb3JpdHlEcm9wZG93biA9ICgpID0+IHtcbiAgICAgICAgbGV0IHByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBwcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5JztcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIHByaW9yaXR5LmlkID0gJ3RvZG8tZm9ybS1wcmlvcml0eSc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBpO1xuICAgICAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBwcmlvcml0eS5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHByaW9yaXR5TGFiZWwuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuXG4gICAgICAgIHJldHVybiBwcmlvcml0eUxhYmVsXG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGRCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9ucy5pZCA9ICd0b2RvLWZvcm0tYnRucyc7XG5cbiAgICAgICAgbGV0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHN1Ym1pdC50eXBlID0gJ3N1Ym1pdCdcbiAgICAgICAgc3VibWl0LmlkID0gJ3RvZG8tZm9ybS1zdWJtaXQnO1xuICAgICAgICBzdWJtaXQudmFsdWUgPSAnQWRkIHRvZG8nO1xuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHN1Ym1pdEFkZEZvcm0oKTtcbiAgICAgICAgfSk7IFxuXG4gICAgICAgIGxldCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNsb3NlLmlkID0gJ3RvZG8tZm9ybS1jbG9zZSc7XG4gICAgICAgIGNsb3NlLnZhbHVlID0gJ0Nsb3NlJztcbiAgICAgICAgY2xvc2UudHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgcmVmcmVzaChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQoc3VibWl0KTtcbiAgICAgICAgYnV0dG9ucy5hcHBlbmRDaGlsZChjbG9zZSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnVpbGRUaXRsZSxcbiAgICAgICAgYnVpbGREZXNjcmlwdGlvbixcbiAgICAgICAgYnVpbGREYXRlLFxuICAgICAgICBidWlsZFByb2plY3REcm9wZG93bixcbiAgICAgICAgYnVpbGRQcmlvcml0eURyb3Bkb3duLFxuICAgICAgICBidWlsZEJ1dHRvbnMsXG4gICAgfVxuXG59KSgpO1xuXG5jb25zdCBidWlsZFRvZG9BZGRGb3JtID0gKCkgPT4ge1xuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uaWQgPSAndG9kby1mb3JtJztcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybUJ1aWxkZXIuYnVpbGRUaXRsZSgpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkRGVzY3JpcHRpb24oKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtQnVpbGRlci5idWlsZERhdGUoKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtQnVpbGRlci5idWlsZFByb2plY3REcm9wZG93bigpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkUHJpb3JpdHlEcm9wZG93bigpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkQnV0dG9ucygpKTtcbiAgICByZXR1cm4gZm9ybTtcbn1cblxuZXhwb3J0IHsgXG4gICAgYnVpbGRUb2RvQWRkQnV0dG9uLFxuICAgIGJ1aWxkVG9kb0VsZW1lbnQsXG4gICAgYnVpbGRUb2RvQWRkRm9ybSxcbn07IiwiLy8gaW1wb3J0IHsgYnVpbGRUb2RvQWRkQnV0dG9uLCBidWlsZFRvZG9FbGVtZW50LCBidWlsZFRvZG9BZGRGb3JtfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuLy8gaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi4vdG9kb1wiO1xuXG4vLyBmdW5jdGlvbiBsb2FkSW5ib3goZm9ybUFjdGl2ZT1mYWxzZSkge1xuICAgIFxuLy8gICAgIGxldCB0b2RvcyA9IHRvZG9TdG9yYWdlLmdldFRvZG9zT2ZQcm9qZWN0KCdpbmJveCcpO1xuXG4vLyAgICAgbGV0IHRvZG9FZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1lZGl0b3InKTtcbi8vICAgICB0b2RvRWRpdG9yLmlubmVySFRNTCA9ICcnO1xuXG4vLyAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4vLyAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICBcbi8vICAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICB0b2RvTGlzdC5pZCA9ICd0b2RvLWxpc3QnO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICBsZXQgdG9kb0VsZW1lbnQgPSBidWlsZFRvZG9FbGVtZW50KHRvZG9zW2ldKTtcbi8vICAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0VsZW1lbnQpO1xuLy8gICAgIH1cbiAgICBcbi8vICAgICAvLyBidWlsZCBhZGQgYnV0dG9uIC8gZm9ybVxuLy8gICAgIGxldCBhZGQgPSAoZm9ybUFjdGl2ZSkgPyBidWlsZFRvZG9BZGRGb3JtKCkgOiBidWlsZFRvZG9BZGRCdXR0b24oKTtcbi8vICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChhZGQpO1xuXG4vLyAgICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuLy8gICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xuLy8gfVxuXG4vLyBleHBvcnQge2xvYWRJbmJveH1cbiIsImltcG9ydCB7IGJ1aWxkVG9kb0FkZEJ1dHRvbiwgYnVpbGRUb2RvRWxlbWVudCB9IGZyb20gXCIuL2NvbnRlbnRCdWlsZGVyXCI7XG5cbmZ1bmN0aW9uIGxvYWRPdmVyZHVlKGZvcm1BY3RpdmU9ZmFsc2UpIHtcbiAgICBsZXQgdG9kb0VkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWVkaXRvcicpO1xuICAgIHRvZG9FZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnT3ZlcmR1ZSc7XG5cbiAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvTGlzdC5pZCA9ICd0b2RvLWxpc3QnO1xuXG4gICAgLy8gYnVpbGQgYWRkIGJ1dHRvbiAvIGZvcm1cbiAgICBsZXQgYWRkID0gKGZvcm1BY3RpdmUpID8gYnVpbGRUb2RvQWRkRm9ybSgpIDogYnVpbGRUb2RvQWRkQnV0dG9uKCk7XG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoYWRkKTtcblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuZXhwb3J0IHsgbG9hZE92ZXJkdWUgfTsiLCJpbXBvcnQgeyBidWlsZFRvZG9BZGRCdXR0b24sIGJ1aWxkVG9kb0VsZW1lbnQsIGJ1aWxkVG9kb0FkZEZvcm0gfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi4vdG9kb1wiO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UgfSBmcm9tIFwiLi4vcHJvamVjdFwiO1xuXG5mdW5jdGlvbiBsb2FkUHJvamVjdChwcm9qZWN0SUQsIGZvcm1BY3RpdmUgPSBmYWxzZSkge1xuXG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0U3RvcmFnZS5nZXRQcm9qZWN0KHByb2plY3RJRCk7XG5cbiAgICBsZXQgdG9kb3MgPSB0b2RvU3RvcmFnZS5nZXRUb2Rvc09mUHJvamVjdChwcm9qZWN0LmdldElEKCkpO1xuICAgIGNvbnNvbGUubG9nKHRvZG9zKTtcblxuICAgIGxldCB0b2RvRWRpdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZWRpdG9yJyk7XG4gICAgdG9kb0VkaXRvci5pbm5lckhUTUwgPSAnJztcblxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0VGl0bGUoKTtcblxuICAgIGxldCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9MaXN0LmlkID0gJ3RvZG8tbGlzdCc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0b2RvRWxlbWVudCA9IGJ1aWxkVG9kb0VsZW1lbnQodG9kb3NbaV0pO1xuICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gYnVpbGQgYWRkIGJ1dHRvbiAvIGZvcm1cbiAgICBsZXQgYWRkID0gKGZvcm1BY3RpdmUpID8gYnVpbGRUb2RvQWRkRm9ybSgpIDogYnVpbGRUb2RvQWRkQnV0dG9uKCk7XG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoYWRkKTtcblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuZXhwb3J0IHsgbG9hZFByb2plY3QgfVxuIiwiaW1wb3J0IHsgYnVpbGRUb2RvQWRkQnV0dG9uLCBidWlsZFRvZG9FbGVtZW50IH0gZnJvbSBcIi4vY29udGVudEJ1aWxkZXJcIjtcblxuY29uc3QgZ2V0Rm9ybWF0dGVkRGF0ZSA9ICgpID0+IHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgY29uc29sZS5sb2coZGF0ZSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gICAgLy8gcmV0dXJuIGZvcm1hdCh0b2RheSwgJ01NL2RkL3l5eXknKTtcbn1cblxuZnVuY3Rpb24gbG9hZFRvZGF5KGZvcm1BY3RpdmU9ZmFsc2UpIHtcbiAgICBsZXQgdG9kb0VkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWVkaXRvcicpO1xuICAgIHRvZG9FZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuXG4gICAgbGV0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0xpc3QuaWQgPSAndG9kby1saXN0JztcblxuICAgIC8vIGJ1aWxkIGFkZCBidXR0b24gLyBmb3JtXG4gICAgbGV0IGFkZCA9IChmb3JtQWN0aXZlKSA/IGJ1aWxkVG9kb0FkZEZvcm0oKSA6IGJ1aWxkVG9kb0FkZEJ1dHRvbigpO1xuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGFkZCk7XG5cbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZCh0b2RvTGlzdCk7XG59XG5cbmV4cG9ydCB7IGxvYWRUb2RheSB9OyIsImltcG9ydCB7IGJ1aWxkVG9kb0FkZEJ1dHRvbiwgYnVpbGRUb2RvRWxlbWVudCB9IGZyb20gXCIuL2NvbnRlbnRCdWlsZGVyXCI7XG5cbmZ1bmN0aW9uIGxvYWRXZWVrKGZvcm1BY3RpdmU9ZmFsc2UpIHtcbiAgICBsZXQgdG9kb0VkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWVkaXRvcicpO1xuICAgIHRvZG9FZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnV2Vla2x5JztcblxuICAgIGxldCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9MaXN0LmlkID0gJ3RvZG8tbGlzdCc7XG5cbiAgICAvLyBidWlsZCBhZGQgYnV0dG9uIC8gZm9ybVxuICAgIGxldCBhZGQgPSAoZm9ybUFjdGl2ZSkgPyBidWlsZFRvZG9BZGRGb3JtKCkgOiBidWlsZFRvZG9BZGRCdXR0b24oKTtcbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChhZGQpO1xuXG4gICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xufVxuXG5leHBvcnQgeyBsb2FkV2VlayB9OyIsImltcG9ydCB7IGxvYWRJbmJveCB9IGZyb20gJy4vbG9hZGVycy9pbmJveExvYWRlcic7XG5pbXBvcnQgeyBsb2FkVG9kYXkgfSBmcm9tICcuL2xvYWRlcnMvdG9kYXlMb2FkZXInO1xuaW1wb3J0IHsgbG9hZFdlZWsgfSBmcm9tICcuL2xvYWRlcnMvd2Vla0xvYWRlcic7XG5pbXBvcnQgeyBsb2FkT3ZlcmR1ZSB9IGZyb20gJy4vbG9hZGVycy9vdmVyZHVlTG9hZGVyJztcbmltcG9ydCB7IGxvYWRQcm9qZWN0IH0gZnJvbSAnLi9sb2FkZXJzL3Byb2plY3RMb2FkZXInO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UsIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCB7IHRvZG9GYWN0b3J5LCB0b2RvU3RvcmFnZSB9IGZyb20gJy4vdG9kbyc7XG5cbmxldCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbi8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuLy8gdG9kb1N0b3JhZ2UuY29weVRvZG9zRnJvbVN0b3JhZ2UoKTtcbmxldCBzdG9yYWdlVGFiID0gc3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZCcpO1xubGV0IGN1cnJlbnRUYWIgPSAoc3RvcmFnZVRhYikgPyBzdG9yYWdlVGFiIDogJ2luYm94JztcblxuY29uc3QgcmVmcmVzaCA9IChmb3JtQWN0aXZlPWZhbHNlKSA9PiB7XG4gICAgc3dpdGNoIChjdXJyZW50VGFiKSB7XG4gICAgICAgIGNhc2UgJ2luYm94JzpcbiAgICAgICAgICAgIGxvYWRQcm9qZWN0KFwiaW5ib3hcIiwgZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICAvLyBsb2FkSW5ib3goZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3ZlcmR1ZSc6XG4gICAgICAgICAgICBsb2FkT3ZlcmR1ZShmb3JtQWN0aXZlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgICAgICBsb2FkVG9kYXkoZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICBsb2FkV2Vlayhmb3JtQWN0aXZlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbGV0IHByb2plY3RJRCA9IGN1cnJlbnRUYWIuc2xpY2UoY3VycmVudFRhYi5pbmRleE9mKCctJykrMSk7XG4gICAgICAgICAgICBsb2FkUHJvamVjdChwcm9qZWN0SUQsIGZvcm1BY3RpdmUpO1xuICAgIH1cblxufVxuXG5jb25zdCBzZXRUYWIgPSB0YWIgPT4ge1xuICAgIGN1cnJlbnRUYWIgPSB0YWI7XG4gICAgc3RvcmFnZS5zZXRJdGVtKCdzZWxlY3RlZCcsIHRhYik7XG4gICAgcmVmcmVzaCgpO1xufVxuXG5jb25zdCBwcm9qZWN0VGFiQnVpbGRlciA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGJ1aWxkUHJvamVjdFRhYiA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGxldCBwcm9qZWN0VGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFRpdGxlKCk7XG4gICAgICAgIGxldCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgLy8gZGVsZXRlIGJ1dHRvblxuICAgICAgICBkZWxldGVCdG4uaW5uZXJIVE1MID0gJyYjMTAwMDUnO1xuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgncmlnaHQtdGFiJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWRlbGV0ZS1idXR0b24nKTtcbiAgICAgICAgZGVsZXRlQnRuLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdFRhYihwcm9qZWN0KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYXBwZW5kIGl0ZW1zIHRvIHRhYlxuICAgICAgICBwcm9qZWN0VGFiLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgcHJvamVjdFRhYi5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICAgICAgICBwcm9qZWN0VGFiLmNsYXNzTGlzdC5hZGQoJ3RhYicpO1xuICAgICAgICBwcm9qZWN0VGFiLmlkID0gJ3Byb2plY3QtJyArIHByb2plY3QuZ2V0SUQoKTtcblxuICAgICAgICAvLyBhbGxvdyB0YWIgc3dpdGNoaW5nIGZvciBwcm9qZWN0IHRhYnNcbiAgICAgICAgcHJvamVjdFRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SUQgPSBwcm9qZWN0LmdldElEKCk7XG4gICAgICAgICAgICBzZXRUYWIoJ3Byb2plY3QtJyArIHByb2plY3RJRCk7XG4gICAgICAgICAgICBUYWJIaWdobGlnaHRlci51cGRhdGVIaWdobGlnaHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RUYWI7XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdFRhYiA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC0nICsgcHJvamVjdC5nZXRJRCgpKTtcbiAgICAgICAgaWYgKHByb2plY3RUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtdGFiJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHNldFRhYignaW5ib3gnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcHJvamVjdFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0LmdldElEKCkpO1xuICAgICAgICByZW5kZXJQcm9qZWN0VGFicygpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJ1aWxkUHJvamVjdFRhYiB9O1xuXG59KSgpO1xuXG5jb25zdCBwcm9qZWN0Rm9ybUJ1aWxkZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBidWlsZFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBmb3JtLmlkID0gJ3Byb2plY3QtYWRkLWZvcm0nO1xuXG4gICAgICAgIGxldCB0ZXh0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGV4dGJveC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgdGV4dGJveC5pZCA9ICdwcm9qZWN0LWFkZC10ZXh0Ym94JztcblxuICAgICAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmlkID0gJ3Byb2plY3QtYWRkLXN1Ym1pdCc7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi52YWx1ZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJzEwMDAzJyk7XG5cbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzdWJtaXRGb3JtKHRleHRib3gudmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5pZCA9ICdwcm9qZWN0LWFkZC1jbG9zZSc7XG4gICAgICAgIGNsb3NlQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY2xvc2VCdXR0b24udmFsdWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCcxMDAwNicpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5vbmNsaWNrID0gY2xvc2VGb3JtO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQodGV4dGJveCk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG5cbiAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VGb3JtID0gKCkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtYWRkLWZvcm0nKTtcbiAgICAgICAgcHJvamVjdExpc3QucmVtb3ZlQ2hpbGQoZm9ybSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3VibWl0Rm9ybSA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHRpdGxlKTtcbiAgICAgICAgcHJvamVjdFN0b3JhZ2UuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyUHJvamVjdFRhYnMoKTtcblxuICAgICAgICAvLyBzd2l0Y2ggdG8gbmV3IHRhYlxuICAgICAgICBzZXRUYWIoYHByb2plY3QtJHtuZXdQcm9qZWN0LmdldElEKCl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYnVpbGRQcm9qZWN0Rm9ybSB9O1xuXG59KSgpO1xuXG5jb25zdCByZW5kZXJQcm9qZWN0VGFicyA9ICgpID0+IHtcblxuICAgIC8vIHJlc2V0IHByb2plY3QgbGlzdFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKS5pbm5lckhUTUwgPSAnJztcbiAgICBcbiAgICAvLyBhZGQgZWFjaCBwcm9qZWN0IGZyb20gc3RvcmFnZVxuICAgIGxldCBwcm9qZWN0cyA9IHByb2plY3RTdG9yYWdlLmdldEFsbFByb2plY3RzKCk7XG4gICAgbGV0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFiID0gcHJvamVjdFRhYkJ1aWxkZXIuYnVpbGRQcm9qZWN0VGFiKHByb2plY3RzW2ldKTtcbiAgICAgICAgVGFiSGlnaGxpZ2h0ZXIudXBkYXRlSGlnaGxpZ2h0KCk7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgfVxufVxuXG5jb25zdCBUYWJIaWdobGlnaHRlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCB1cGRhdGVIaWdobGlnaHQgPSAoKSA9PiB7XG4gICAgICAgIC8vIHJlbW92ZSBzZWxlY3RlZCB0YWIgaWYgYW55XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJyk7XG4gICAgICAgIGlmIChzZWxlY3RlZFRhYikgc2VsZWN0ZWRUYWIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcblxuICAgICAgICBpZiAoY3VycmVudFRhYi5zdGFydHNXaXRoKCdwcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudFRhYik7XG4gICAgICAgICAgICBpZiAocHJvamVjdCkgcHJvamVjdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudFRhYiArICctdGFiJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHVwZGF0ZUhpZ2hsaWdodCB9O1xufSkoKTtcblxuY29uc3QgcHJvamVjdEFkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWFkZC1idXR0b24nKTtcbnByb2plY3RBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IGZvcm0gPSBwcm9qZWN0Rm9ybUJ1aWxkZXIuYnVpbGRQcm9qZWN0Rm9ybSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKS5hcHBlbmRDaGlsZChmb3JtKTtcbn0pO1xuXG4vLyBhbGxvdyB0YWIgc3dpdGNoaW5nXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IGlkID0gdGFiLmlkLnNsaWNlKDAsIHRhYi5pZC5pbmRleE9mKCctJykpO1xuICAgICAgICBzZXRUYWIoaWQpO1xuICAgICAgICBUYWJIaWdobGlnaHRlci51cGRhdGVIaWdobGlnaHQoKTtcbiAgICB9KTtcbn0pO1xuXG5yZW5kZXJQcm9qZWN0VGFicygpO1xucmVmcmVzaCgpO1xuVGFiSGlnaGxpZ2h0ZXIudXBkYXRlSGlnaGxpZ2h0KCk7XG5cbmV4cG9ydCB7IHJlZnJlc2ggfTsiLCJpbXBvcnQgeyB0b2RvU3RvcmFnZSB9IGZyb20gXCIuL3RvZG9cIjtcblxuY29uc3QgcHJvamVjdElER2VuZXJhdG9yID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3Qgc3RvcmVkSUQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25leHRQcm9qZWN0SUQnKTtcbiAgICBsZXQgX25leHRBdmFpbGFibGVJZCA9IChzdG9yZWRJRCkgPyBzdG9yZWRJRCA6IDA7XG5cbiAgICBjb25zdCBnZW5lcmF0ZVByb2plY3RJRCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHJldHVybklEID0gX25leHRBdmFpbGFibGVJZCsrO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRQcm9qZWN0SUQnLCBfbmV4dEF2YWlsYWJsZUlkKTtcbiAgICAgICAgcmV0dXJuIHJldHVybklEO1xuICAgIH1cblxuICAgIHJldHVybiB7IGdlbmVyYXRlUHJvamVjdElEIH1cbn0pKCk7XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHRpdGxlLCBpZCA9IG51bGwpID0+IHtcbiAgICBsZXQgX2lkID0gKGlkID09PSBudWxsKSA/IHByb2plY3RJREdlbmVyYXRvci5nZW5lcmF0ZVByb2plY3RJRCgpIDogaWQ7XG4gICAgbGV0IF90aXRsZSA9IHRpdGxlO1xuICAgIGxldCBfdG9kb3MgPSBbXTsgICAgLy8gaG9sZHMgcHJvamVjdCBpZHNcblxuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gX3RpdGxlO1xuICAgIGNvbnN0IGdldElEID0gKCkgPT4gX2lkO1xuICAgIGNvbnN0IGdldFRvZG9zID0gdG9kb1N0b3JhZ2UuZ2V0VG9kb3NPZlByb2plY3QoX2lkKTtcblxuICAgIGNvbnN0IHN0cmluZ2lmeSA9ICgpID0+IHsgLy9lLmcuLCAxNHx8fG15cHJvamVjdHx8fDEtMi02LTExLTIwXG4gICAgICAgIGxldCBwU3RyaW5nID0gYCR7Z2V0SUQoKX18fHwke2dldFRpdGxlKCl9fHx8YDtcblxuICAgICAgICBpZiAoX3RvZG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBfdG9kb3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcFN0cmluZyArPSBTdHJpbmcoX3RvZG9zW2ldKSArICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBTdHJpbmcgKz0gX3RvZG9zLmF0KC0xKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHBTdHJpbmc7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkVG9kbyA9ICh0b2RvSUQpID0+IHtcbiAgICAgICAgX3RvZG9zLnB1c2godG9kb0lEKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0LSR7X2lkfWAsc3RyaW5naWZ5KCkpO1xuICAgIH07XG4gICAgY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSUQpID0+IF90b2Rvcy5zcGxpY2UoX3RvZG9zLmluZGV4T2YodG9kb0lELDEpKTtcblxuICAgIHJldHVybiB7IFxuICAgICAgICAgICAgZ2V0VGl0bGUsIFxuICAgICAgICAgICAgYWRkVG9kbywgXG4gICAgICAgICAgICBkZWxldGVUb2RvLCBcbiAgICAgICAgICAgIGdldElELFxuICAgICAgICAgICAgZ2V0VG9kb3MsXG4gICAgICAgICAgICBzdHJpbmdpZnksXG4gICAgfTtcbn1cblxuY29uc3QgX2J1aWxkUHJvamVjdCA9IChwcm9qZWN0U3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZGVsaW1ldGVyID0gXCJ8fHxcIjtcbiAgICBsZXQgdmFscyA9IHByb2plY3RTdHJpbmcuc3BsaXQoZGVsaW1ldGVyKTtcbiAgICBsZXQgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHZhbHNbMV0sIHZhbHNbMF0pO1xuICAgIGxldCB0b2RvSURzID0gU3RyaW5nKHZhbHNbMl0pLnNwbGl0KCctJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2plY3QuYWRkVG9kbyh0b2RvSURzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmNvbnN0IHByb2plY3RTdG9yYWdlID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICBsZXQgaW5ib3ggPSBwcm9qZWN0RmFjdG9yeSgnaW5ib3gnLCdpbmJveCcpO1xuICAgIGxldCBfcHJvamVjdHMgPSB7ICdpbmJveCcgOiBpbmJveCB9O1xuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIF9wcm9qZWN0c1twcm9qZWN0LmdldElEKCldID0gcHJvamVjdDtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0LSR7cHJvamVjdC5nZXRJRCgpfWAsIHByb2plY3Quc3RyaW5naWZ5KCkpO1xuICAgIH1cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgICAgICBpZiAocHJvamVjdElEID09PSAnaW5ib3gnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2Fubm90IGRlbGV0ZSBpbmJveCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIF9wcm9qZWN0c1twcm9qZWN0SURdO1xuICAgICAgICAgICAgdG9kb1N0b3JhZ2UucmVtb3ZlVG9kb3NPZlByb2plY3QocHJvamVjdElEKTtcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdC0ke3Byb2plY3RJRH1gKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBhZGRUb2RvVG9Qcm9qZWN0ID0gKHRvZG8sIHByb2plY3RJRCkgPT4ge1xuICAgICAgICBfcHJvamVjdHNbcHJvamVjdElEXS5hZGRUb2RvKHRvZG8uZ2V0SUQoKSk7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShgcHJvamVjdC0ke3Byb2plY3RJRH1gLCBfcHJvamVjdHNbcHJvamVjdElEXS5zdHJpbmdpZnkoKSk7XG4gICAgICAgIHRvZG9TdG9yYWdlLmFkZFRvZG8odG9kbyk7XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBnZXRBbGxQcm9qZWN0cyA9ICgpID0+IE9iamVjdC52YWx1ZXMoX3Byb2plY3RzKS5maWx0ZXIoXG4gICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldElEKCkgIT09ICdpbmJveCdcbiAgICApO1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdCA9IChpZCkgPT4gX3Byb2plY3RzW2lkXTtcblxuICAgIC8vIGNvcHkgcHJvamVjdHMgZnJvbSBzdG9yYWdlXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzdG9yYWdlLmtleShpKS5zdGFydHNXaXRoKCdwcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0U3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gX2J1aWxkUHJvamVjdChwcm9qZWN0U3RyaW5nKTtcbiAgICAgICAgICAgIF9wcm9qZWN0c1twcm9qZWN0LmdldElEKCldID0gcHJvamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgICAgXG4gICAgICAgIGFkZFByb2plY3QsXG4gICAgICAgIGRlbGV0ZVByb2plY3QsXG4gICAgICAgIGdldEFsbFByb2plY3RzLFxuICAgICAgICBnZXRQcm9qZWN0LFxuICAgICAgICBhZGRUb2RvVG9Qcm9qZWN0LFxuICAgIH07XG59KSgpO1xuXG5cbmV4cG9ydCB7IHByb2plY3RGYWN0b3J5LCBwcm9qZWN0U3RvcmFnZSB9OyIsImNvbnN0IHRvZG9JREdlbmVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc3RvcmVkSUQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25leHRUb2RvSUQnKTtcbiAgICBsZXQgX25leHRBdmFpbGFibGVJZCA9IChzdG9yZWRJRCkgPyBzdG9yZWRJRCA6IDA7XG5cbiAgICBjb25zdCBnZW5lcmF0ZVRvZG9JRCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHJldHVybklEID0gX25leHRBdmFpbGFibGVJZCsrO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRUb2RvSUQnLCBfbmV4dEF2YWlsYWJsZUlkKTtcbiAgICAgICAgcmV0dXJuIHJldHVybklEO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBnZW5lcmF0ZVRvZG9JRCB9XG59KSgpO1xuXG5jb25zdCB0b2RvRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByb2plY3QsIHByaW9yaXR5LCBpZCA9IG51bGwpID0+IHtcbiAgICBsZXQgX2lkID0gKGlkID09PSBudWxsKSA/IHRvZG9JREdlbmVyYXRvci5nZW5lcmF0ZVRvZG9JRCgpIDogaWQ7XG4gICAgbGV0IF90aXRsZSA9IHRpdGxlO1xuICAgIGxldCBfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICBsZXQgX2R1ZURhdGUgPSBkdWVEYXRlO1xuICAgIGxldCBfcHJvamVjdCA9IHByb2plY3Q7XG4gICAgbGV0IF9wcmlvcml0eSA9IHByaW9yaXR5O1xuXG4gICAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiBfdGl0bGU7XG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBfZGVzY3JpcHRpb247XG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IF9kdWVEYXRlO1xuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gX3ByaW9yaXR5O1xuICAgIGNvbnN0IGdldElEID0gKCkgPT4gX2lkO1xuICAgIGNvbnN0IGdldFByb2plY3QgPSAoKSA9PiBfcHJvamVjdDtcblxuICAgIC8vICBpZCB8fHwgdGl0bGUgfHx8IGRlc2NyaXB0aW9uIHx8fCBkYXRlIHx8fCBwcmlvcml0eSB8fHwgcHJvamVjdElEXG4gICAgLy8gIDV8fHxDUzQxMSBIV3x8fENvbXBsZXRlIHRoZSBod3x8fDEwLzExLzIwMjF8fHwzfHx8MlxuICAgIGNvbnN0IHN0cmluZ2lmeSA9ICgpID0+ICAgZ2V0SUQoKSArICd8fHwnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZ2V0VGl0bGUoKSArICd8fHwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBnZXREZXNjcmlwdGlvbigpICsgJ3x8fCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGdldER1ZURhdGUoKSArICd8fHwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBnZXRQcm9qZWN0KCkgKyAnfHx8JyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGdldFByaW9yaXR5KCk7XG5cbiAgICBjb25zdCBzZXRUaXRsZSA9IChuZXdUaXRsZSkgPT4gX3RpdGxlID0gbmV3VGl0bGU7XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IF9kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldER1ZURhdGUgPSAobmV3RHVlRGF0ZSkgPT4gX2R1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgIGNvbnN0IHNldFByaW9yaXR5ID0gKG5ld1ByaW9yaXR5KSA9PiBfcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgICBjb25zdCBzZXRQcm9qZWN0ID0gKG5ld1Byb2plY3QpID0+IF9wcm9qZWN0ID0gbmV3UHJvamVjdDtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRUaXRsZSwgXG4gICAgICAgIGdldERlc2NyaXB0aW9uLCBcbiAgICAgICAgZ2V0RHVlRGF0ZSwgXG4gICAgICAgIGdldFByaW9yaXR5LFxuICAgICAgICBnZXRJRCxcbiAgICAgICAgZ2V0UHJvamVjdCxcbiAgICAgICAgc2V0VGl0bGUsIFxuICAgICAgICBzZXREZXNjcmlwdGlvbiwgXG4gICAgICAgIHNldER1ZURhdGUsIFxuICAgICAgICBzZXRQcmlvcml0eSxcbiAgICAgICAgc2V0UHJvamVjdCxcbiAgICAgICAgc3RyaW5naWZ5XG4gICAgfTtcbn1cblxuY29uc3QgdG9kb1N0b3JhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgX3RvZG9zID0ge307XG4gICAgbGV0IHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gICAgY29uc3QgY29weVRvZG9zRnJvbVN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlbGltZXRlciA9IFwifHx8XCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHN0b3JhZ2Uua2V5KGkpLnN0YXJ0c1dpdGgoJ3RvZG8nKSkge1xuICAgICAgICAgICAgICAgIGxldCB0b2RvU3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFscyA9IHRvZG9TdHJpbmcuc3BsaXQoZGVsaW1ldGVyKTtcbiAgICAgICAgICAgICAgICBsZXQgdG9kbyA9IHRvZG9GYWN0b3J5KHZhbHNbMV0sIHZhbHNbMl0sIHZhbHNbM10sIHZhbHNbNF0sIHZhbHNbNV0sIHZhbHNbMF0pO1xuICAgICAgICAgICAgICAgIF90b2Rvc1t0b2RvLmdldElEKCldID0gdG9kbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFkZFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICBfdG9kb3NbdG9kby5nZXRJRCgpXSA9IHRvZG87XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShgdG9kby0ke3RvZG8uZ2V0SUQoKX1gLCB0b2RvLnN0cmluZ2lmeSgpKTtcbiAgICAgICAgY29weVRvZG9zRnJvbVN0b3JhZ2UoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlVG9kbyA9ICh0b2RvSUQpID0+IHtcbiAgICAgICAgZGVsZXRlIF90b2Rvc1t0b2RvSURdO1xuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oYHRvZG8tJHt0b2RvSUR9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlVG9kb3NPZlByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoX3RvZG9zKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdG9kbyA9IF90b2Rvc1trZXlzW2ldXTtcbiAgICAgICAgICAgIGlmICh0b2RvLmdldFByb2plY3QoKSA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVG9kbyhrZXlzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdldFRvZG8gPSAodG9kb0lEKSA9PiBfdG9kb3NbdG9kb0lEXTtcblxuICAgIGNvbnN0IGdldFRvZG9zT2ZQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuXG4gICAgICAgIGxldCB0b2RvcyA9IE9iamVjdC52YWx1ZXMoX3RvZG9zKTtcbiAgICAgICAgbGV0IHJldHVybnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGNvbXBhcmluZyAke3RvZG9zW2ldLmdldFByb2plY3QoKX0gdG8gJHtwcm9qZWN0SUR9YCk7XG4gICAgICAgICAgICBpZiAodG9kb3NbaV0uZ2V0UHJvamVjdCgpID09PSBwcm9qZWN0SUQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5zLnB1c2godG9kb3NbaV0pO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwdXNoaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfVxuICAgIC8vIGNvbnN0IGdldFRvZG9zT2ZQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge09iamVjdC52YWx1ZXMoX3RvZG9zKS5maWx0ZXIodG9kbyA9PiB7XG4gICAgLy8gICAgIHRvZG8uZ2V0UHJvamVjdCgpID09PSBwcm9qZWN0SUQ7XG4gICAgLy8gfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWxvYWQnLCBjb3B5VG9kb3NGcm9tU3RvcmFnZSgpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFRvZG8sXG4gICAgICAgIHJlbW92ZVRvZG8sXG4gICAgICAgIHJlbW92ZVRvZG9zT2ZQcm9qZWN0LFxuICAgICAgICBnZXRUb2RvLFxuICAgICAgICBnZXRUb2Rvc09mUHJvamVjdCxcbiAgICAgICAgY29weVRvZG9zRnJvbVN0b3JhZ2UsXG4gICAgfVxuXG59KSgpO1xuXG5leHBvcnQgeyB0b2RvRmFjdG9yeSwgdG9kb1N0b3JhZ2UgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9