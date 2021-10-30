/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/loaders/contentBuilder.js":
/*!***************************************!*\
  !*** ./src/loaders/contentBuilder.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    let parts = dateString.split('-');
    let date = new Date(parts[0], parts[1]-1, parts[2]);
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
            circle.style.backgroundColor = 'blue';
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
        _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.deleteTodoFromProject(todo.getID(), todo.getProject());
        (0,_nav__WEBPACK_IMPORTED_MODULE_2__.refresh)(false);
    });
    circle.classList.add('todo-circle');
    let title = document.createElement('span');
    title.classList.add('todo-title');
    let projectName = _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.getProject(todo.getProject()).getTitle();
    title.textContent = todo.getTitle() + ' (' + projectName + ')';
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

        const projectID = (project.startsWith('project')) ? (project.split('-')[1]) : project;
        const todo = (0,_todo__WEBPACK_IMPORTED_MODULE_1__.todoFactory)(title,desc,date,projectID,priority);

        // form validation
        let form = document.getElementById('todo-form');
        if (form.checkValidity()) {
            _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.addTodoToProject(todo, projectID);
            (0,_nav__WEBPACK_IMPORTED_MODULE_2__.refresh)(false);
        } else {
            let sub = document.createElement('input');
            sub.type = 'submit';
            sub.style.display = 'none';
            // sub.name = 'valButton';
            form.appendChild(sub);
            sub.click();
        }
    }
    
    const buildTitle = () => {
        let titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title';

        let title = document.createElement('input');
        title.type = 'text';
        title.id = 'todo-form-title';
        title.required = true;
        titleLabel.appendChild(title);
        title.placeholder = "e.g., Economics Exam";
        title.required = true;

        return titleLabel;
    }

    const buildDescription = () => {
        let descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description';

        let description = document.createElement('input');
        description.id = 'todo-form-description';
        description.placeholder = "e.g., Economics Exam over chapters 1-5"
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
        
        // set today as default
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        date.value = today;

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
        submit.addEventListener('click', e =>{
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

/***/ "./src/loaders/overdueLoader.js":
/*!**************************************!*\
  !*** ./src/loaders/overdueLoader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadOverdue": () => (/* binding */ loadOverdue)
/* harmony export */ });
/* harmony import */ var _contentBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentBuilder */ "./src/loaders/contentBuilder.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../todo */ "./src/todo.js");



function loadOverdue() {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Overdue';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // display today's todos
    let todos = _todo__WEBPACK_IMPORTED_MODULE_1__.todoStorage.getOverdueTodos();
    for (let i = 0; i < todos.length; i++) {
        todoList.appendChild((0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoElement)(todos[i]), true);
    }

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}



/***/ }),

/***/ "./src/loaders/projectLoader.js":
/*!**************************************!*\
  !*** ./src/loaders/projectLoader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    // header.textContent = header.textContent.at(0).toUpperCase() + header.textContent.substr(1).toLowerCase();

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

function loadToday() {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Today';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // display today's todos
    let todos = _todo__WEBPACK_IMPORTED_MODULE_1__.todoStorage.getTodayTodos();
    for (let i = 0; i < todos.length; i++) {
        todoList.appendChild((0,_contentBuilder__WEBPACK_IMPORTED_MODULE_0__.buildTodoElement)(todos[i]), true);
    }

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}



/***/ }),

/***/ "./src/loaders/weekLoader.js":
/*!***********************************!*\
  !*** ./src/loaders/weekLoader.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadWeek": () => (/* binding */ loadWeek)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../todo */ "./src/todo.js");
/* harmony import */ var _contentBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contentBuilder */ "./src/loaders/contentBuilder.js");



function loadWeek() {
    let todoEditor = document.getElementById('todo-editor');
    todoEditor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = 'Weekly';

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    let weekTodos = _todo__WEBPACK_IMPORTED_MODULE_0__.todoStorage.getWeekTodos();

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
                todoList.appendChild((0,_contentBuilder__WEBPACK_IMPORTED_MODULE_1__.buildTodoElement)(dayTodos[j]));
            }
        }

        date.setDate(date.getDate() + 1);
    }

    todoEditor.appendChild(header);
    todoEditor.appendChild(todoList);
}



/***/ }),

/***/ "./src/nav.js":
/*!********************!*\
  !*** ./src/nav.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "refresh": () => (/* binding */ refresh)
/* harmony export */ });
/* harmony import */ var _loaders_todayLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loaders/todayLoader */ "./src/loaders/todayLoader.js");
/* harmony import */ var _loaders_weekLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loaders/weekLoader */ "./src/loaders/weekLoader.js");
/* harmony import */ var _loaders_overdueLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders/overdueLoader */ "./src/loaders/overdueLoader.js");
/* harmony import */ var _loaders_projectLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loaders/projectLoader */ "./src/loaders/projectLoader.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./todo */ "./src/todo.js");







let storage = window.localStorage;
// window.localStorage.clear();

// todoStorage.copyTodosFromStorage();
let storageTab = storage.getItem('selected');
let currentTab = (storageTab) ? storageTab : 'inbox';

const refresh = (formActive=false) => {
    updateCounts();
    switch (currentTab) {
        case 'inbox':
            (0,_loaders_projectLoader__WEBPACK_IMPORTED_MODULE_3__.loadProject)("inbox", formActive);
            // loadInbox(formActive);
            break;
        case 'overdue':
            (0,_loaders_overdueLoader__WEBPACK_IMPORTED_MODULE_2__.loadOverdue)();
            break;
        case 'today':
            (0,_loaders_todayLoader__WEBPACK_IMPORTED_MODULE_0__.loadToday)();
            break;
        case 'week':
            (0,_loaders_weekLoader__WEBPACK_IMPORTED_MODULE_1__.loadWeek)();
            break;
        default:
            let projectID = currentTab.slice(currentTab.indexOf('-')+1);
            (0,_loaders_projectLoader__WEBPACK_IMPORTED_MODULE_3__.loadProject)(projectID, formActive);
    }

}

const updateCounts = () => {
    let inboxCount = document.getElementById('inbox-total');
    let todayCount = document.getElementById('today-total');
    let overdueCount = document.getElementById('overdue-total');
    let weekCount = document.getElementById('week-total');

    inboxCount.textContent = _todo__WEBPACK_IMPORTED_MODULE_5__.todoStorage.getTodosOfProject('inbox').length;
    todayCount.textContent = _todo__WEBPACK_IMPORTED_MODULE_5__.todoStorage.getTodayTodos().length;
    overdueCount.textContent = _todo__WEBPACK_IMPORTED_MODULE_5__.todoStorage.getOverdueTodos().length;

    let weekTodos = _todo__WEBPACK_IMPORTED_MODULE_5__.todoStorage.getWeekTodos();
    weekCount.textContent = weekTodos.reduce((total, day) => total + day.length, 0);
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
        _project__WEBPACK_IMPORTED_MODULE_4__.projectStorage.deleteProject(project.getID());
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
        textbox.required = true;

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
        let form = document.getElementById('project-add-form');
        if (form.checkValidity()) {
            let newProject = (0,_project__WEBPACK_IMPORTED_MODULE_4__.projectFactory)(title);
            _project__WEBPACK_IMPORTED_MODULE_4__.projectStorage.addProject(newProject);
            renderProjectTabs();

            // switch to new tab
            setTab(`project-${newProject.getID()}`);
            location.reload();
        } else {
            let sub = document.createElement('input');
            sub.type = 'submit';
            sub.style.display = 'none';
            form.appendChild(sub);
            sub.click();
        }

    }

    return { buildProjectForm };

})();

const renderProjectTabs = () => {

    // reset project list
    document.getElementById('project-list').innerHTML = '';
    
    // add each project from storage
    let projects = _project__WEBPACK_IMPORTED_MODULE_4__.projectStorage.getAllProjects();
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
    if (! (document.getElementById('project-add-form'))) {
        let form = projectFormBuilder.buildProjectForm();
        document.getElementById('project-list').appendChild(form);
    }

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
    let inbox = projectFactory('Inbox','inbox');
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
            if (todos[i].getProject() === projectID) {
                returns.push(todos[i]);
            }
        }
        return returns;
    }

    const getTodayTodos = () => {

        const today = new Date().toDateString();

        const todos = Object.values(_todos);
        let todayTodos = [];

        for (let i = 0; i < todos.length; i++) {
            let dateParts = todos[i].getDueDate().split('-');
            let dueDate = new Date(dateParts[0],dateParts[1]-1,dateParts[2]).toDateString();
            if (today === dueDate) {
                todayTodos.push(todos[i]);
            }
        }
        return todayTodos;
    }

    const getWeekTodos = () => {
        let date = new Date();
        date.setHours(0,0,0,0);
        let todos = Object.values(_todos);

        let weekTodos = [];
        for (let i = 0; i < 7; i++) {
            let dayTodos = []
            for (let i = 0 ; i < todos.length; i++) {
                const dueDateParts = todos[i].getDueDate().split('-');
                const dueDate = new Date(dueDateParts[0],dueDateParts[1]-1,dueDateParts[2]);
                if (dueDate.toDateString() === date.toDateString()) {
                    dayTodos.push(todos[i]);
                } else {
                }
            }
            date.setDate(date.getDate() + 1);
            date.setHours(0,0,0,0);

            weekTodos.push(dayTodos);
        }

        return weekTodos;
    }

    const getOverdueTodos = () => {
        const today = new Date();
        today.setHours(0,0,0,0);    // only compare date

        const todos = Object.values(_todos);
        let overdueTodos = [];

        for (let i = 0; i < todos.length; i++) {
            let dateParts = todos[i].getDueDate().split('-');
            let dueDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            if (today > dueDate) {
                overdueTodos.push(todos[i]);
            }
        }
        return overdueTodos;
    }

    document.addEventListener('reload', copyTodosFromStorage());

    return {
        addTodo,
        removeTodo,
        removeTodosOfProject,
        getTodo,
        getTodosOfProject,
        copyTodosFromStorage,
        getTodayTodos,
        getOverdueTodos,
        getWeekTodos,
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav */ "./src/nav.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9jb250ZW50QnVpbGRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9vdmVyZHVlTG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2FkZXJzL3Byb2plY3RMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvdG9kYXlMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvd2Vla0xvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbmF2LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RTdG9yYWdlIH0gZnJvbSAnLi4vcHJvamVjdCc7XG5pbXBvcnQgeyB0b2RvRmFjdG9yeSwgdG9kb1N0b3JhZ2UgfSBmcm9tICcuLi90b2RvJztcbmltcG9ydCB7IHJlZnJlc2ggfSBmcm9tICcuLi9uYXYnO1xuXG5jb25zdCBjb252ZXJ0RGF0ZVRvV29yZHMgPSAoZGF0ZVN0cmluZykgPT4ge1xuICAgIGxldCBwYXJ0cyA9IGRhdGVTdHJpbmcuc3BsaXQoJy0nKTtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXS0xLCBwYXJ0c1syXSk7XG4gICAgbGV0IGRhdGVBcnIgPSBkYXRlLnRvRGF0ZVN0cmluZygpLnNwbGl0KCcgJyk7XG4gICAgbGV0IG1vbnRoID0gZGF0ZUFyclsxXTtcbiAgICBsZXQgZGF5ID0gcGFyc2VJbnQoZGF0ZUFyclsyXSk7XG4gICAgbGV0IHllYXIgPSAoIGRhdGVBcnJbM10gPT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICkgPyAnJyA6IGAgJHtkYXRlQXJyWzNdfWA7XG4gICAgcmV0dXJuIG1vbnRoICsgJyAnICsgZGF5ICsgJyAnICsgeWVhcjtcbn1cblxuY29uc3QgYnVpbGRUb2RvQ2lyY2xlID0gKHRvZG8pID0+IHtcblxuICAgIGxldCBwcmlvcml0eSA9IHBhcnNlSW50KHRvZG8uZ2V0UHJpb3JpdHkoKSk7XG4gICAgbGV0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc3dpdGNoIChwcmlvcml0eSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsdWUnO1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmVkJztcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHByaW9yaXR5IGdpdmVuIGZvciB0b2RvIGNpcmNsZSBjb2xvclwiKTtcbiAgICB9IFxuXG4gICAgcmV0dXJuIGNpcmNsZTtcbn1cblxuY29uc3QgYnVpbGRUb2RvRWxlbWVudCA9ICh0b2RvKSA9PiB7XG4gICAgbGV0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0VsZW1lbnQuaWQgPSBgdG9kby0ke3RvZG8uZ2V0SUQoKX1gO1xuICAgIHRvZG9FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcblxuICAgIC8vIGJ1aWxkIGNpcmNsZSBhbmQgdGl0bGUgcm93XG4gICAgbGV0IHRvcFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvcFJvdy5jbGFzc0xpc3QuYWRkKCd0b3Atcm93Jyk7XG4gICAgbGV0IGNpcmNsZSA9IGJ1aWxkVG9kb0NpcmNsZSh0b2RvKTtcbiAgICBjaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHByb2plY3RTdG9yYWdlLmRlbGV0ZVRvZG9Gcm9tUHJvamVjdCh0b2RvLmdldElEKCksIHRvZG8uZ2V0UHJvamVjdCgpKTtcbiAgICAgICAgcmVmcmVzaChmYWxzZSk7XG4gICAgfSk7XG4gICAgY2lyY2xlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2lyY2xlJyk7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tdGl0bGUnKTtcbiAgICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0U3RvcmFnZS5nZXRQcm9qZWN0KHRvZG8uZ2V0UHJvamVjdCgpKS5nZXRUaXRsZSgpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRUaXRsZSgpICsgJyAoJyArIHByb2plY3ROYW1lICsgJyknO1xuICAgIHRvcFJvdy5hcHBlbmRDaGlsZChjaXJjbGUpO1xuICAgIHRvcFJvdy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndG9kby1kZXNjcmlwdGlvbicpO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5nZXREZXNjcmlwdGlvbigpO1xuXG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWR1ZS1kYXRlJyk7XG4gICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGNvbnZlcnREYXRlVG9Xb3Jkcyh0b2RvLmdldER1ZURhdGUoKSk7XG4gICAgLy8gZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RHVlRGF0ZSgpO1xuXG4gICAgdG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQodG9wUm93KTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgdG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG5cbiAgICByZXR1cm4gdG9kb0VsZW1lbnQ7XG59XG5cbmNvbnN0IGJ1aWxkVG9kb0FkZEJ1dHRvbiA9ICgpID0+IHtcblxuICAgIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhZGRCdXR0b24uaWQgPSAndG9kby1hZGQtYnV0dG9uJztcblxuICAgIGxldCBwbHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHBsdXMudGV4dENvbnRlbnQgPSAnKyc7XG4gICAgcGx1cy5pZCA9ICd0b2RvLWFkZC1wbHVzJztcblxuICAgIGxldCBhZGRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGFkZFRleHQudGV4dENvbnRlbnQgPSAnQWRkIHRhc2snO1xuICAgIGFkZFRleHQuaWQgPSAndG9kby1hZGQtdGV4dCc7XG5cbiAgICBhZGRCdXR0b24uYXBwZW5kQ2hpbGQocGx1cyk7XG4gICAgYWRkQnV0dG9uLmFwcGVuZENoaWxkKGFkZFRleHQpO1xuXG4gICAgYWRkQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiByZWZyZXNoKHRydWUpO1xuXG4gICAgcmV0dXJuIGFkZEJ1dHRvbjtcblxufVxuXG5jb25zdCBmb3JtQnVpbGRlciA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHN1Ym1pdEFkZEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS10aXRsZScpLnZhbHVlO1xuICAgICAgICBsZXQgZGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0tZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgbGV0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLWRhdGUnKS52YWx1ZTtcbiAgICAgICAgbGV0IHByb2plY3QgPSBTdHJpbmcoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS1wcm9qZWN0JykudmFsdWUpO1xuICAgICAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLXByaW9yaXR5JykudmFsdWU7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdElEID0gKHByb2plY3Quc3RhcnRzV2l0aCgncHJvamVjdCcpKSA/IChwcm9qZWN0LnNwbGl0KCctJylbMV0pIDogcHJvamVjdDtcbiAgICAgICAgY29uc3QgdG9kbyA9IHRvZG9GYWN0b3J5KHRpdGxlLGRlc2MsZGF0ZSxwcm9qZWN0SUQscHJpb3JpdHkpO1xuXG4gICAgICAgIC8vIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0nKTtcbiAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICBwcm9qZWN0U3RvcmFnZS5hZGRUb2RvVG9Qcm9qZWN0KHRvZG8sIHByb2plY3RJRCk7XG4gICAgICAgICAgICByZWZyZXNoKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgc3ViLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgICAgIHN1Yi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgLy8gc3ViLm5hbWUgPSAndmFsQnV0dG9uJztcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3ViKTtcbiAgICAgICAgICAgIHN1Yi5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGJ1aWxkVGl0bGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGl0bGVMYWJlbC50ZXh0Q29udGVudCA9ICdUaXRsZSc7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGl0bGUuaWQgPSAndG9kby1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGUucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0aXRsZUxhYmVsLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGl0bGUucGxhY2Vob2xkZXIgPSBcImUuZy4sIEVjb25vbWljcyBFeGFtXCI7XG4gICAgICAgIHRpdGxlLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGl0bGVMYWJlbDtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZERlc2NyaXB0aW9uID0gKCkgPT4ge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uTGFiZWwudGV4dENvbnRlbnQgPSAnRGVzY3JpcHRpb24nO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlkID0gJ3RvZG8tZm9ybS1kZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uLnBsYWNlaG9sZGVyID0gXCJlLmcuLCBFY29ub21pY3MgRXhhbSBvdmVyIGNoYXB0ZXJzIDEtNVwiXG4gICAgICAgIGRlc2NyaXB0aW9uTGFiZWwuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbkxhYmVsXG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGREYXRlID0gKCkgPT4ge1xuICAgICAgICBsZXQgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gJ0R1ZSBEYXRlJztcblxuICAgICAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICBkYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGRhdGUuaWQgPSAndG9kby1mb3JtLWRhdGUnXG4gICAgICAgIFxuICAgICAgICAvLyBzZXQgdG9kYXkgYXMgZGVmYXVsdFxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIGRheSA9IChcIjBcIiArIG5vdy5nZXREYXRlKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgdmFyIG1vbnRoID0gKFwiMFwiICsgKG5vdy5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKTtcbiAgICAgICAgdmFyIHRvZGF5ID0gbm93LmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIChtb250aCkgKyBcIi1cIiArIChkYXkpO1xuICAgICAgICBkYXRlLnZhbHVlID0gdG9kYXk7XG5cbiAgICAgICAgZGF0ZUxhYmVsLmFwcGVuZENoaWxkKGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBkYXRlTGFiZWw7XG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGRQcm9qZWN0RHJvcGRvd24gPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvamVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGV0IHByb2plY3REcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBwcm9qZWN0RHJvcGRvd24uaWQgPSAndG9kby1mb3JtLXByb2plY3QnO1xuICAgICAgICBwcm9qZWN0TGFiZWwudGV4dENvbnRlbnQgPSAnUHJvamVjdCc7ICAgICAgICBcblxuICAgICAgICAvLyBkZWZhdWx0IGluYm94IG9wdGlvblxuICAgICAgICBsZXQgaW5ib3hPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgaW5ib3hPcHRpb24udmFsdWUgPSAnaW5ib3gnO1xuICAgICAgICBpbmJveE9wdGlvbi5pbm5lckhUTUwgPSAnSW5ib3gnO1xuICAgICAgICBwcm9qZWN0RHJvcGRvd24uYXBwZW5kQ2hpbGQoaW5ib3hPcHRpb24pO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgcHJvamVjdCBvcHRpb25zXG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gcHJvamVjdFN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYHByb2plY3QtJHtwcm9qZWN0c1tpXS5nZXRJRCgpfWA7XG4gICAgICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gcHJvamVjdHNbaV0uZ2V0VGl0bGUoKTtcbiAgICAgICAgICAgIHByb2plY3REcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VsZWN0IGN1cnJlbnQgdGFiIGJ5IGRlZmF1bHRcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBwcm9qZWN0RHJvcGRvd24ub3B0aW9ucztcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNbaV0udmFsdWUgPT09IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgIHByb2plY3REcm9wZG93bi5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb2plY3RMYWJlbC5hcHBlbmRDaGlsZChwcm9qZWN0RHJvcGRvd24pO1xuXG4gICAgICAgIHJldHVybiBwcm9qZWN0TGFiZWxcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZFByaW9yaXR5RHJvcGRvd24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBwcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgcHJpb3JpdHlMYWJlbC50ZXh0Q29udGVudCA9ICdQcmlvcml0eSc7XG4gICAgICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBwcmlvcml0eS5pZCA9ICd0b2RvLWZvcm0tcHJpb3JpdHknO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gaTtcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgcHJpb3JpdHkuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBwcmlvcml0eUxhYmVsLmFwcGVuZENoaWxkKHByaW9yaXR5KTtcblxuICAgICAgICByZXR1cm4gcHJpb3JpdHlMYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkQnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ1dHRvbnMuaWQgPSAndG9kby1mb3JtLWJ0bnMnO1xuXG4gICAgICAgIGxldCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBzdWJtaXQudHlwZSA9ICdzdWJtaXQnXG4gICAgICAgIHN1Ym1pdC5pZCA9ICd0b2RvLWZvcm0tc3VibWl0JztcbiAgICAgICAgc3VibWl0LnZhbHVlID0gJ0FkZCB0b2RvJztcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PntcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHN1Ym1pdEFkZEZvcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2xvc2UuaWQgPSAndG9kby1mb3JtLWNsb3NlJztcbiAgICAgICAgY2xvc2UudmFsdWUgPSAnQ2xvc2UnO1xuICAgICAgICBjbG9zZS50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICByZWZyZXNoKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnV0dG9ucy5hcHBlbmRDaGlsZChzdWJtaXQpO1xuICAgICAgICBidXR0b25zLmFwcGVuZENoaWxkKGNsb3NlKTtcblxuICAgICAgICByZXR1cm4gYnV0dG9ucztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidWlsZFRpdGxlLFxuICAgICAgICBidWlsZERlc2NyaXB0aW9uLFxuICAgICAgICBidWlsZERhdGUsXG4gICAgICAgIGJ1aWxkUHJvamVjdERyb3Bkb3duLFxuICAgICAgICBidWlsZFByaW9yaXR5RHJvcGRvd24sXG4gICAgICAgIGJ1aWxkQnV0dG9ucyxcbiAgICB9XG5cbn0pKCk7XG5cbmNvbnN0IGJ1aWxkVG9kb0FkZEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5pZCA9ICd0b2RvLWZvcm0nO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtQnVpbGRlci5idWlsZFRpdGxlKCkpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybUJ1aWxkZXIuYnVpbGREZXNjcmlwdGlvbigpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkRGF0ZSgpKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1CdWlsZGVyLmJ1aWxkUHJvamVjdERyb3Bkb3duKCkpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybUJ1aWxkZXIuYnVpbGRQcmlvcml0eURyb3Bkb3duKCkpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybUJ1aWxkZXIuYnVpbGRCdXR0b25zKCkpO1xuICAgIHJldHVybiBmb3JtO1xufVxuXG5leHBvcnQgeyBcbiAgICBidWlsZFRvZG9BZGRCdXR0b24sXG4gICAgYnVpbGRUb2RvRWxlbWVudCxcbiAgICBidWlsZFRvZG9BZGRGb3JtLFxufTsiLCJpbXBvcnQgeyBidWlsZFRvZG9FbGVtZW50IH0gZnJvbSBcIi4vY29udGVudEJ1aWxkZXJcIjtcbmltcG9ydCB7IHRvZG9TdG9yYWdlIH0gZnJvbSBcIi4uL3RvZG9cIjtcblxuZnVuY3Rpb24gbG9hZE92ZXJkdWUoKSB7XG4gICAgbGV0IHRvZG9FZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1lZGl0b3InKTtcbiAgICB0b2RvRWRpdG9yLmlubmVySFRNTCA9ICcnO1xuXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ092ZXJkdWUnO1xuXG4gICAgbGV0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0xpc3QuaWQgPSAndG9kby1saXN0JztcblxuICAgIC8vIGRpc3BsYXkgdG9kYXkncyB0b2Rvc1xuICAgIGxldCB0b2RvcyA9IHRvZG9TdG9yYWdlLmdldE92ZXJkdWVUb2RvcygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoYnVpbGRUb2RvRWxlbWVudCh0b2Rvc1tpXSksIHRydWUpO1xuICAgIH1cblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuZXhwb3J0IHsgbG9hZE92ZXJkdWUgfTsiLCJpbXBvcnQgeyBidWlsZFRvZG9BZGRCdXR0b24sIGJ1aWxkVG9kb0VsZW1lbnQsIGJ1aWxkVG9kb0FkZEZvcm0gfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi4vdG9kb1wiO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UgfSBmcm9tIFwiLi4vcHJvamVjdFwiO1xuXG5mdW5jdGlvbiBsb2FkUHJvamVjdChwcm9qZWN0SUQsIGZvcm1BY3RpdmUgPSBmYWxzZSkge1xuXG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0U3RvcmFnZS5nZXRQcm9qZWN0KHByb2plY3RJRCk7XG5cbiAgICBsZXQgdG9kb3MgPSB0b2RvU3RvcmFnZS5nZXRUb2Rvc09mUHJvamVjdChwcm9qZWN0LmdldElEKCkpO1xuXG4gICAgbGV0IHRvZG9FZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1lZGl0b3InKTtcbiAgICB0b2RvRWRpdG9yLmlubmVySFRNTCA9ICcnO1xuXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRUaXRsZSgpO1xuICAgIC8vIGhlYWRlci50ZXh0Q29udGVudCA9IGhlYWRlci50ZXh0Q29udGVudC5hdCgwKS50b1VwcGVyQ2FzZSgpICsgaGVhZGVyLnRleHRDb250ZW50LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0xpc3QuaWQgPSAndG9kby1saXN0JztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRvZG9FbGVtZW50ID0gYnVpbGRUb2RvRWxlbWVudCh0b2Rvc1tpXSk7XG4gICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBidWlsZCBhZGQgYnV0dG9uIC8gZm9ybVxuICAgIGxldCBhZGQgPSAoZm9ybUFjdGl2ZSkgPyBidWlsZFRvZG9BZGRGb3JtKCkgOiBidWlsZFRvZG9BZGRCdXR0b24oKTtcbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChhZGQpO1xuXG4gICAgdG9kb0VkaXRvci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xufVxuXG5leHBvcnQgeyBsb2FkUHJvamVjdCB9XG4iLCJpbXBvcnQgeyBidWlsZFRvZG9BZGRCdXR0b24sIGJ1aWxkVG9kb0VsZW1lbnQgfSBmcm9tIFwiLi9jb250ZW50QnVpbGRlclwiO1xuaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tICcuLi90b2RvJztcblxuY29uc3QgZ2V0Rm9ybWF0dGVkRGF0ZSA9ICgpID0+IHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgY29uc29sZS5sb2coZGF0ZSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gICAgLy8gcmV0dXJuIGZvcm1hdCh0b2RheSwgJ01NL2RkL3l5eXknKTtcbn1cblxuZnVuY3Rpb24gbG9hZFRvZGF5KCkge1xuICAgIGxldCB0b2RvRWRpdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZWRpdG9yJyk7XG4gICAgdG9kb0VkaXRvci5pbm5lckhUTUwgPSAnJztcblxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdUb2RheSc7XG5cbiAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvTGlzdC5pZCA9ICd0b2RvLWxpc3QnO1xuXG4gICAgLy8gZGlzcGxheSB0b2RheSdzIHRvZG9zXG4gICAgbGV0IHRvZG9zID0gdG9kb1N0b3JhZ2UuZ2V0VG9kYXlUb2RvcygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoYnVpbGRUb2RvRWxlbWVudCh0b2Rvc1tpXSksIHRydWUpO1xuICAgIH1cblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuZXhwb3J0IHsgbG9hZFRvZGF5IH07IiwiaW1wb3J0IHsgdG9kb1N0b3JhZ2UgfSBmcm9tIFwiLi4vdG9kb1wiO1xuaW1wb3J0IHsgYnVpbGRUb2RvRWxlbWVudCB9IGZyb20gXCIuL2NvbnRlbnRCdWlsZGVyXCI7XG5cbmZ1bmN0aW9uIGxvYWRXZWVrKCkge1xuICAgIGxldCB0b2RvRWRpdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZWRpdG9yJyk7XG4gICAgdG9kb0VkaXRvci5pbm5lckhUTUwgPSAnJztcblxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdXZWVrbHknO1xuXG4gICAgbGV0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0xpc3QuaWQgPSAndG9kby1saXN0JztcblxuICAgIGxldCB3ZWVrVG9kb3MgPSB0b2RvU3RvcmFnZS5nZXRXZWVrVG9kb3MoKTtcblxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBmb3IgKGxldCBpID0gMCA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgaWYgKHdlZWtUb2Rvc1tpXS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgbGV0IGRhdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci5jbGFzc0xpc3QuYWRkKCdkYXRlLWhlYWRlcicpO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci50ZXh0Q29udGVudCA9IGRhdGVTdHJpbmc7XG4gICAgICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChkYXRlSGVhZGVyKTtcblxuICAgICAgICAgICAgbGV0IGRheVRvZG9zID0gd2Vla1RvZG9zW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXlUb2Rvcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGJ1aWxkVG9kb0VsZW1lbnQoZGF5VG9kb3Nbal0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIDEpO1xuICAgIH1cblxuICAgIHRvZG9FZGl0b3IuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0b2RvRWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuZXhwb3J0IHsgbG9hZFdlZWsgfTsiLCJpbXBvcnQgeyBsb2FkVG9kYXkgfSBmcm9tICcuL2xvYWRlcnMvdG9kYXlMb2FkZXInO1xuaW1wb3J0IHsgbG9hZFdlZWsgfSBmcm9tICcuL2xvYWRlcnMvd2Vla0xvYWRlcic7XG5pbXBvcnQgeyBsb2FkT3ZlcmR1ZSB9IGZyb20gJy4vbG9hZGVycy9vdmVyZHVlTG9hZGVyJztcbmltcG9ydCB7IGxvYWRQcm9qZWN0IH0gZnJvbSAnLi9sb2FkZXJzL3Byb2plY3RMb2FkZXInO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UsIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCB7IHRvZG9GYWN0b3J5LCB0b2RvU3RvcmFnZSB9IGZyb20gJy4vdG9kbyc7XG5cbmxldCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbi8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuLy8gdG9kb1N0b3JhZ2UuY29weVRvZG9zRnJvbVN0b3JhZ2UoKTtcbmxldCBzdG9yYWdlVGFiID0gc3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZCcpO1xubGV0IGN1cnJlbnRUYWIgPSAoc3RvcmFnZVRhYikgPyBzdG9yYWdlVGFiIDogJ2luYm94JztcblxuY29uc3QgcmVmcmVzaCA9IChmb3JtQWN0aXZlPWZhbHNlKSA9PiB7XG4gICAgdXBkYXRlQ291bnRzKCk7XG4gICAgc3dpdGNoIChjdXJyZW50VGFiKSB7XG4gICAgICAgIGNhc2UgJ2luYm94JzpcbiAgICAgICAgICAgIGxvYWRQcm9qZWN0KFwiaW5ib3hcIiwgZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICAvLyBsb2FkSW5ib3goZm9ybUFjdGl2ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3ZlcmR1ZSc6XG4gICAgICAgICAgICBsb2FkT3ZlcmR1ZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIGxvYWRUb2RheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgbG9hZFdlZWsoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbGV0IHByb2plY3RJRCA9IGN1cnJlbnRUYWIuc2xpY2UoY3VycmVudFRhYi5pbmRleE9mKCctJykrMSk7XG4gICAgICAgICAgICBsb2FkUHJvamVjdChwcm9qZWN0SUQsIGZvcm1BY3RpdmUpO1xuICAgIH1cblxufVxuXG5jb25zdCB1cGRhdGVDb3VudHMgPSAoKSA9PiB7XG4gICAgbGV0IGluYm94Q291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtdG90YWwnKTtcbiAgICBsZXQgdG9kYXlDb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RheS10b3RhbCcpO1xuICAgIGxldCBvdmVyZHVlQ291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmR1ZS10b3RhbCcpO1xuICAgIGxldCB3ZWVrQ291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Vlay10b3RhbCcpO1xuXG4gICAgaW5ib3hDb3VudC50ZXh0Q29udGVudCA9IHRvZG9TdG9yYWdlLmdldFRvZG9zT2ZQcm9qZWN0KCdpbmJveCcpLmxlbmd0aDtcbiAgICB0b2RheUNvdW50LnRleHRDb250ZW50ID0gdG9kb1N0b3JhZ2UuZ2V0VG9kYXlUb2RvcygpLmxlbmd0aDtcbiAgICBvdmVyZHVlQ291bnQudGV4dENvbnRlbnQgPSB0b2RvU3RvcmFnZS5nZXRPdmVyZHVlVG9kb3MoKS5sZW5ndGg7XG5cbiAgICBsZXQgd2Vla1RvZG9zID0gdG9kb1N0b3JhZ2UuZ2V0V2Vla1RvZG9zKCk7XG4gICAgd2Vla0NvdW50LnRleHRDb250ZW50ID0gd2Vla1RvZG9zLnJlZHVjZSgodG90YWwsIGRheSkgPT4gdG90YWwgKyBkYXkubGVuZ3RoLCAwKTtcbn1cblxuY29uc3Qgc2V0VGFiID0gdGFiID0+IHtcbiAgICBjdXJyZW50VGFiID0gdGFiO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbSgnc2VsZWN0ZWQnLCB0YWIpO1xuICAgIHJlZnJlc2goKTtcbn1cblxuY29uc3QgcHJvamVjdFRhYkJ1aWxkZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBidWlsZFByb2plY3RUYWIgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdFRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRUaXRsZSgpO1xuICAgICAgICBsZXQgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBidXR0b25cbiAgICAgICAgZGVsZXRlQnRuLmlubmVySFRNTCA9ICcmIzEwMDA1JztcbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LXRhYicpO1xuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1kZWxldGUtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3RUYWIocHJvamVjdCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGFwcGVuZCBpdGVtcyB0byB0YWJcbiAgICAgICAgcHJvamVjdFRhYi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHByb2plY3RUYWIuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcbiAgICAgICAgcHJvamVjdFRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKTtcbiAgICAgICAgcHJvamVjdFRhYi5pZCA9ICdwcm9qZWN0LScgKyBwcm9qZWN0LmdldElEKCk7XG5cbiAgICAgICAgLy8gYWxsb3cgdGFiIHN3aXRjaGluZyBmb3IgcHJvamVjdCB0YWJzXG4gICAgICAgIHByb2plY3RUYWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvamVjdElEID0gcHJvamVjdC5nZXRJRCgpO1xuICAgICAgICAgICAgc2V0VGFiKCdwcm9qZWN0LScgKyBwcm9qZWN0SUQpO1xuICAgICAgICAgICAgVGFiSGlnaGxpZ2h0ZXIudXBkYXRlSGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGFiO1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RUYWIgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0VGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtJyArIHByb2plY3QuZ2V0SUQoKSk7XG4gICAgICAgIGlmIChwcm9qZWN0VGFiLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LXRhYicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBzZXRUYWIoJ2luYm94Jyk7XG4gICAgICAgIH07XG4gICAgICAgIHByb2plY3RTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdC5nZXRJRCgpKTtcbiAgICAgICAgcmVuZGVyUHJvamVjdFRhYnMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBidWlsZFByb2plY3RUYWIgfTtcblxufSkoKTtcblxuY29uc3QgcHJvamVjdEZvcm1CdWlsZGVyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgYnVpbGRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybS5pZCA9ICdwcm9qZWN0LWFkZC1mb3JtJztcblxuICAgICAgICBsZXQgdGV4dGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRleHRib3gudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgIHRleHRib3guaWQgPSAncHJvamVjdC1hZGQtdGV4dGJveCc7XG4gICAgICAgIHRleHRib3gucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBzdWJtaXRCdXR0b24uaWQgPSAncHJvamVjdC1hZGQtc3VibWl0JztcbiAgICAgICAgc3VibWl0QnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgc3VibWl0QnV0dG9uLnZhbHVlID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnMTAwMDMnKTtcblxuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHN1Ym1pdEZvcm0odGV4dGJveC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmlkID0gJ3Byb2plY3QtYWRkLWNsb3NlJztcbiAgICAgICAgY2xvc2VCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjbG9zZUJ1dHRvbi52YWx1ZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJzEwMDA2Jyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLm9uY2xpY2sgPSBjbG9zZUZvcm07XG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZCh0ZXh0Ym94KTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcblxuICAgICAgICByZXR1cm4gZm9ybTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZUZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGxldCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1hZGQtZm9ybScpO1xuICAgICAgICBwcm9qZWN0TGlzdC5yZW1vdmVDaGlsZChmb3JtKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWJtaXRGb3JtID0gKHRpdGxlKSA9PiB7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtYWRkLWZvcm0nKTtcbiAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHRpdGxlKTtcbiAgICAgICAgICAgIHByb2plY3RTdG9yYWdlLmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0VGFicygpO1xuXG4gICAgICAgICAgICAvLyBzd2l0Y2ggdG8gbmV3IHRhYlxuICAgICAgICAgICAgc2V0VGFiKGBwcm9qZWN0LSR7bmV3UHJvamVjdC5nZXRJRCgpfWApO1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3ViID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHN1Yi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgICAgICBzdWIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3ViKTtcbiAgICAgICAgICAgIHN1Yi5jbGljaygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4geyBidWlsZFByb2plY3RGb3JtIH07XG5cbn0pKCk7XG5cbmNvbnN0IHJlbmRlclByb2plY3RUYWJzID0gKCkgPT4ge1xuXG4gICAgLy8gcmVzZXQgcHJvamVjdCBsaXN0XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpLmlubmVySFRNTCA9ICcnO1xuICAgIFxuICAgIC8vIGFkZCBlYWNoIHByb2plY3QgZnJvbSBzdG9yYWdlXG4gICAgbGV0IHByb2plY3RzID0gcHJvamVjdFN0b3JhZ2UuZ2V0QWxsUHJvamVjdHMoKTtcbiAgICBsZXQgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YWIgPSBwcm9qZWN0VGFiQnVpbGRlci5idWlsZFByb2plY3RUYWIocHJvamVjdHNbaV0pO1xuICAgICAgICBUYWJIaWdobGlnaHRlci51cGRhdGVIaWdobGlnaHQoKTtcblxuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIH1cbn1cblxuY29uc3QgVGFiSGlnaGxpZ2h0ZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgdXBkYXRlSGlnaGxpZ2h0ID0gKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmUgc2VsZWN0ZWQgdGFiIGlmIGFueVxuXG4gICAgICAgIGxldCBzZWxlY3RlZFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHNlbGVjdGVkVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUYWIuc3RhcnRzV2l0aCgncHJvamVjdCcpKSB7XG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgaWYgKHByb2plY3QpIHByb2plY3QuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRUYWIgKyAnLXRhYicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyB1cGRhdGVIaWdobGlnaHQgfTtcbn0pKCk7XG5cbmNvbnN0IHByb2plY3RBZGRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1hZGQtYnV0dG9uJyk7XG5wcm9qZWN0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmICghIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1hZGQtZm9ybScpKSkge1xuICAgICAgICBsZXQgZm9ybSA9IHByb2plY3RGb3JtQnVpbGRlci5idWlsZFByb2plY3RGb3JtKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICB9XG5cbn0pO1xuXG4vLyBhbGxvdyB0YWIgc3dpdGNoaW5nXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IGlkID0gdGFiLmlkLnNsaWNlKDAsIHRhYi5pZC5pbmRleE9mKCctJykpO1xuICAgICAgICBzZXRUYWIoaWQpO1xuICAgICAgICBUYWJIaWdobGlnaHRlci51cGRhdGVIaWdobGlnaHQoKTtcbiAgICB9KTtcbn0pO1xuXG5yZW5kZXJQcm9qZWN0VGFicygpO1xucmVmcmVzaCgpO1xuVGFiSGlnaGxpZ2h0ZXIudXBkYXRlSGlnaGxpZ2h0KCk7XG5cbmV4cG9ydCB7IHJlZnJlc2ggfTsiLCJpbXBvcnQgeyB0b2RvU3RvcmFnZSB9IGZyb20gXCIuL3RvZG9cIjtcblxuY29uc3QgcHJvamVjdElER2VuZXJhdG9yID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3Qgc3RvcmVkSUQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25leHRQcm9qZWN0SUQnKTtcbiAgICBsZXQgX25leHRBdmFpbGFibGVJZCA9IChzdG9yZWRJRCkgPyBzdG9yZWRJRCA6IDA7XG5cbiAgICBjb25zdCBnZW5lcmF0ZVByb2plY3RJRCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHJldHVybklEID0gX25leHRBdmFpbGFibGVJZCsrO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRQcm9qZWN0SUQnLCBfbmV4dEF2YWlsYWJsZUlkKTtcbiAgICAgICAgcmV0dXJuIHJldHVybklEO1xuICAgIH1cblxuICAgIHJldHVybiB7IGdlbmVyYXRlUHJvamVjdElEIH1cbn0pKCk7XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHRpdGxlLCBpZCA9IG51bGwpID0+IHtcbiAgICBsZXQgX2lkID0gKGlkID09PSBudWxsKSA/IHByb2plY3RJREdlbmVyYXRvci5nZW5lcmF0ZVByb2plY3RJRCgpIDogaWQ7XG4gICAgbGV0IF90aXRsZSA9IHRpdGxlO1xuICAgIGxldCBfdG9kb3MgPSBbXTsgICAgLy8gaG9sZHMgcHJvamVjdCBpZHNcblxuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gX3RpdGxlO1xuICAgIGNvbnN0IGdldElEID0gKCkgPT4gX2lkO1xuICAgIGNvbnN0IGdldFRvZG9zID0gdG9kb1N0b3JhZ2UuZ2V0VG9kb3NPZlByb2plY3QoX2lkKTtcblxuICAgIGNvbnN0IHN0cmluZ2lmeSA9ICgpID0+IHsgLy9lLmcuLCAxNHx8fG15cHJvamVjdHx8fDEtMi02LTExLTIwXG4gICAgICAgIGxldCBwU3RyaW5nID0gYCR7Z2V0SUQoKX18fHwke2dldFRpdGxlKCl9fHx8YDtcblxuICAgICAgICBpZiAoX3RvZG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBfdG9kb3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcFN0cmluZyArPSBTdHJpbmcoX3RvZG9zW2ldKSArICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBTdHJpbmcgKz0gX3RvZG9zLmF0KC0xKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHBTdHJpbmc7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkVG9kbyA9ICh0b2RvSUQpID0+IHtcbiAgICAgICAgX3RvZG9zLnB1c2godG9kb0lEKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0LSR7X2lkfWAsc3RyaW5naWZ5KCkpO1xuICAgIH07XG4gICAgY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSUQpID0+IF90b2Rvcy5zcGxpY2UoX3RvZG9zLmluZGV4T2YodG9kb0lELDEpKTtcblxuICAgIHJldHVybiB7IFxuICAgICAgICAgICAgZ2V0VGl0bGUsIFxuICAgICAgICAgICAgYWRkVG9kbywgXG4gICAgICAgICAgICBkZWxldGVUb2RvLCBcbiAgICAgICAgICAgIGdldElELFxuICAgICAgICAgICAgZ2V0VG9kb3MsXG4gICAgICAgICAgICBzdHJpbmdpZnksXG4gICAgfTtcbn1cblxuY29uc3QgX2J1aWxkUHJvamVjdCA9IChwcm9qZWN0U3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZGVsaW1ldGVyID0gXCJ8fHxcIjtcbiAgICBsZXQgdmFscyA9IHByb2plY3RTdHJpbmcuc3BsaXQoZGVsaW1ldGVyKTtcbiAgICBsZXQgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHZhbHNbMV0sIHZhbHNbMF0pO1xuICAgIGxldCB0b2RvSURzID0gU3RyaW5nKHZhbHNbMl0pLnNwbGl0KCctJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2plY3QuYWRkVG9kbyh0b2RvSURzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmNvbnN0IHByb2plY3RTdG9yYWdlID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICBsZXQgaW5ib3ggPSBwcm9qZWN0RmFjdG9yeSgnSW5ib3gnLCdpbmJveCcpO1xuICAgIGxldCBfcHJvamVjdHMgPSB7ICdpbmJveCcgOiBpbmJveCB9O1xuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIF9wcm9qZWN0c1twcm9qZWN0LmdldElEKCldID0gcHJvamVjdDtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0LSR7cHJvamVjdC5nZXRJRCgpfWAsIHByb2plY3Quc3RyaW5naWZ5KCkpO1xuICAgIH1cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgICAgICBpZiAocHJvamVjdElEID09PSAnaW5ib3gnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2Fubm90IGRlbGV0ZSBpbmJveCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIF9wcm9qZWN0c1twcm9qZWN0SURdO1xuICAgICAgICAgICAgdG9kb1N0b3JhZ2UucmVtb3ZlVG9kb3NPZlByb2plY3QocHJvamVjdElEKTtcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdC0ke3Byb2plY3RJRH1gKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBhZGRUb2RvVG9Qcm9qZWN0ID0gKHRvZG8sIHByb2plY3RJRCkgPT4ge1xuICAgICAgICBfcHJvamVjdHNbcHJvamVjdElEXS5hZGRUb2RvKHRvZG8uZ2V0SUQoKSk7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShgcHJvamVjdC0ke3Byb2plY3RJRH1gLCBfcHJvamVjdHNbcHJvamVjdElEXS5zdHJpbmdpZnkoKSk7XG4gICAgICAgIHRvZG9TdG9yYWdlLmFkZFRvZG8odG9kbyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVRvZG9Gcm9tUHJvamVjdCA9ICh0b2RvSUQsIHByb2plY3RJRCkgPT4ge1xuICAgICAgICBfcHJvamVjdHNbcHJvamVjdElEXS5kZWxldGVUb2RvKHRvZG9JRCk7XG4gICAgICAgIHRvZG9TdG9yYWdlLnJlbW92ZVRvZG8odG9kb0lEKTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKGB0b2RvLSR7dG9kb0lEfWApO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oYHByb2plY3QtJHtwcm9qZWN0SUR9YCxfcHJvamVjdHNbcHJvamVjdElEXS5zdHJpbmdpZnkoKSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGdldEFsbFByb2plY3RzID0gKCkgPT4gT2JqZWN0LnZhbHVlcyhfcHJvamVjdHMpLmZpbHRlcihcbiAgICAgICAgKHByb2plY3QpID0+IHByb2plY3QuZ2V0SUQoKSAhPT0gJ2luYm94J1xuICAgICk7XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0ID0gKGlkKSA9PiBfcHJvamVjdHNbaWRdO1xuXG4gICAgLy8gY29weSBwcm9qZWN0cyBmcm9tIHN0b3JhZ2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHN0b3JhZ2Uua2V5KGkpLnN0YXJ0c1dpdGgoJ3Byb2plY3QnKSkge1xuICAgICAgICAgICAgbGV0IHByb2plY3RTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0oc3RvcmFnZS5rZXkoaSkpO1xuICAgICAgICAgICAgbGV0IHByb2plY3QgPSBfYnVpbGRQcm9qZWN0KHByb2plY3RTdHJpbmcpO1xuICAgICAgICAgICAgX3Byb2plY3RzW3Byb2plY3QuZ2V0SUQoKV0gPSBwcm9qZWN0O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4geyAgICBcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgZGVsZXRlUHJvamVjdCxcbiAgICAgICAgZ2V0QWxsUHJvamVjdHMsXG4gICAgICAgIGdldFByb2plY3QsXG4gICAgICAgIGFkZFRvZG9Ub1Byb2plY3QsXG4gICAgICAgIGRlbGV0ZVRvZG9Gcm9tUHJvamVjdCxcbiAgICB9O1xufSkoKTtcblxuXG5leHBvcnQgeyBwcm9qZWN0RmFjdG9yeSwgcHJvamVjdFN0b3JhZ2UgfTsiLCJjb25zdCB0b2RvSURHZW5lcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHN0b3JlZElEID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCduZXh0VG9kb0lEJyk7XG4gICAgbGV0IF9uZXh0QXZhaWxhYmxlSWQgPSAoc3RvcmVkSUQpID8gc3RvcmVkSUQgOiAwO1xuXG4gICAgY29uc3QgZ2VuZXJhdGVUb2RvSUQgPSAoKSA9PiB7XG4gICAgICAgIGxldCByZXR1cm5JRCA9IF9uZXh0QXZhaWxhYmxlSWQrKztcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCduZXh0VG9kb0lEJywgX25leHRBdmFpbGFibGVJZCk7XG4gICAgICAgIHJldHVybiByZXR1cm5JRDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgZ2VuZXJhdGVUb2RvSUQgfVxufSkoKTtcblxuY29uc3QgdG9kb0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcm9qZWN0LCBwcmlvcml0eSwgaWQgPSBudWxsKSA9PiB7XG4gICAgbGV0IF9pZCA9IChpZCA9PT0gbnVsbCkgPyB0b2RvSURHZW5lcmF0b3IuZ2VuZXJhdGVUb2RvSUQoKSA6IGlkO1xuICAgIGxldCBfdGl0bGUgPSB0aXRsZTtcbiAgICBsZXQgX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgbGV0IF9kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICBsZXQgX3Byb2plY3QgPSBwcm9qZWN0O1xuICAgIGxldCBfcHJpb3JpdHkgPSBwcmlvcml0eTtcblxuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gX3RpdGxlO1xuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gX2Rlc2NyaXB0aW9uO1xuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBfZHVlRGF0ZTtcbiAgICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IF9wcmlvcml0eTtcbiAgICBjb25zdCBnZXRJRCA9ICgpID0+IF9pZDtcbiAgICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gX3Byb2plY3Q7XG5cbiAgICAvLyAgaWQgfHx8IHRpdGxlIHx8fCBkZXNjcmlwdGlvbiB8fHwgZGF0ZSB8fHwgcHJpb3JpdHkgfHx8IHByb2plY3RJRFxuICAgIC8vICA1fHx8Q1M0MTEgSFd8fHxDb21wbGV0ZSB0aGUgaHd8fHwxMC8xMS8yMDIxfHx8M3x8fDJcbiAgICBjb25zdCBzdHJpbmdpZnkgPSAoKSA9PiAgIGdldElEKCkgKyAnfHx8JyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGdldFRpdGxlKCkgKyAnfHx8J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZ2V0RGVzY3JpcHRpb24oKSArICd8fHwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBnZXREdWVEYXRlKCkgKyAnfHx8J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZ2V0UHJvamVjdCgpICsgJ3x8fCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBnZXRQcmlvcml0eSgpO1xuXG4gICAgY29uc3Qgc2V0VGl0bGUgPSAobmV3VGl0bGUpID0+IF90aXRsZSA9IG5ld1RpdGxlO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBfZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREdWVEYXRlID0gKG5ld0R1ZURhdGUpID0+IF9kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICBjb25zdCBzZXRQcmlvcml0eSA9IChuZXdQcmlvcml0eSkgPT4gX3ByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgY29uc3Qgc2V0UHJvamVjdCA9IChuZXdQcm9qZWN0KSA9PiBfcHJvamVjdCA9IG5ld1Byb2plY3Q7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VGl0bGUsIFxuICAgICAgICBnZXREZXNjcmlwdGlvbiwgXG4gICAgICAgIGdldER1ZURhdGUsIFxuICAgICAgICBnZXRQcmlvcml0eSxcbiAgICAgICAgZ2V0SUQsXG4gICAgICAgIGdldFByb2plY3QsXG4gICAgICAgIHNldFRpdGxlLCBcbiAgICAgICAgc2V0RGVzY3JpcHRpb24sIFxuICAgICAgICBzZXREdWVEYXRlLCBcbiAgICAgICAgc2V0UHJpb3JpdHksXG4gICAgICAgIHNldFByb2plY3QsXG4gICAgICAgIHN0cmluZ2lmeVxuICAgIH07XG59XG5cbmNvbnN0IHRvZG9TdG9yYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IF90b2RvcyA9IHt9O1xuICAgIGxldCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuICAgIGNvbnN0IGNvcHlUb2Rvc0Zyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWxpbWV0ZXIgPSBcInx8fFwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdG9yYWdlLmtleShpKS5zdGFydHNXaXRoKCd0b2RvJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9kb1N0cmluZyA9IHN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlLmtleShpKSk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHMgPSB0b2RvU3RyaW5nLnNwbGl0KGRlbGltZXRlcik7XG4gICAgICAgICAgICAgICAgbGV0IHRvZG8gPSB0b2RvRmFjdG9yeSh2YWxzWzFdLCB2YWxzWzJdLCB2YWxzWzNdLCB2YWxzWzRdLCB2YWxzWzVdLCB2YWxzWzBdKTtcbiAgICAgICAgICAgICAgICBfdG9kb3NbdG9kby5nZXRJRCgpXSA9IHRvZG87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhZGRUb2RvID0gKHRvZG8pID0+IHtcbiAgICAgICAgX3RvZG9zW3RvZG8uZ2V0SUQoKV0gPSB0b2RvO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oYHRvZG8tJHt0b2RvLmdldElEKCl9YCwgdG9kby5zdHJpbmdpZnkoKSk7XG4gICAgICAgIGNvcHlUb2Rvc0Zyb21TdG9yYWdlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbW92ZVRvZG8gPSAodG9kb0lEKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBfdG9kb3NbdG9kb0lEXTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKGB0b2RvLSR7dG9kb0lEfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVRvZG9zT2ZQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKF90b2Rvcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRvZG8gPSBfdG9kb3Nba2V5c1tpXV07XG4gICAgICAgICAgICBpZiAodG9kby5nZXRQcm9qZWN0KCkgPT09IHByb2plY3RJRCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVRvZG8oa2V5c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnZXRUb2RvID0gKHRvZG9JRCkgPT4gX3RvZG9zW3RvZG9JRF07XG5cbiAgICBjb25zdCBnZXRUb2Rvc09mUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcblxuICAgICAgICBsZXQgdG9kb3MgPSBPYmplY3QudmFsdWVzKF90b2Rvcyk7XG4gICAgICAgIGxldCByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0b2Rvc1tpXS5nZXRQcm9qZWN0KCkgPT09IHByb2plY3RJRCkge1xuICAgICAgICAgICAgICAgIHJldHVybnMucHVzaCh0b2Rvc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0VG9kYXlUb2RvcyA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgY29uc3QgdG9kb3MgPSBPYmplY3QudmFsdWVzKF90b2Rvcyk7XG4gICAgICAgIGxldCB0b2RheVRvZG9zID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRhdGVQYXJ0cyA9IHRvZG9zW2ldLmdldER1ZURhdGUoKS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgbGV0IGR1ZURhdGUgPSBuZXcgRGF0ZShkYXRlUGFydHNbMF0sZGF0ZVBhcnRzWzFdLTEsZGF0ZVBhcnRzWzJdKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICh0b2RheSA9PT0gZHVlRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRvZGF5VG9kb3MucHVzaCh0b2Rvc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZGF5VG9kb3M7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0V2Vla1RvZG9zID0gKCkgPT4ge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gICAgICAgIGxldCB0b2RvcyA9IE9iamVjdC52YWx1ZXMoX3RvZG9zKTtcblxuICAgICAgICBsZXQgd2Vla1RvZG9zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGF5VG9kb3MgPSBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlUGFydHMgPSB0b2Rvc1tpXS5nZXREdWVEYXRlKCkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gbmV3IERhdGUoZHVlRGF0ZVBhcnRzWzBdLGR1ZURhdGVQYXJ0c1sxXS0xLGR1ZURhdGVQYXJ0c1syXSk7XG4gICAgICAgICAgICAgICAgaWYgKGR1ZURhdGUudG9EYXRlU3RyaW5nKCkgPT09IGRhdGUudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5VG9kb3MucHVzaCh0b2Rvc1tpXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG5cbiAgICAgICAgICAgIHdlZWtUb2Rvcy5wdXNoKGRheVRvZG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3ZWVrVG9kb3M7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0T3ZlcmR1ZVRvZG9zID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRvZGF5LnNldEhvdXJzKDAsMCwwLDApOyAgICAvLyBvbmx5IGNvbXBhcmUgZGF0ZVxuXG4gICAgICAgIGNvbnN0IHRvZG9zID0gT2JqZWN0LnZhbHVlcyhfdG9kb3MpO1xuICAgICAgICBsZXQgb3ZlcmR1ZVRvZG9zID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRhdGVQYXJ0cyA9IHRvZG9zW2ldLmdldER1ZURhdGUoKS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgbGV0IGR1ZURhdGUgPSBuZXcgRGF0ZShkYXRlUGFydHNbMF0sIGRhdGVQYXJ0c1sxXSAtIDEsIGRhdGVQYXJ0c1syXSk7XG4gICAgICAgICAgICBpZiAodG9kYXkgPiBkdWVEYXRlKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmR1ZVRvZG9zLnB1c2godG9kb3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdmVyZHVlVG9kb3M7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVsb2FkJywgY29weVRvZG9zRnJvbVN0b3JhZ2UoKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRUb2RvLFxuICAgICAgICByZW1vdmVUb2RvLFxuICAgICAgICByZW1vdmVUb2Rvc09mUHJvamVjdCxcbiAgICAgICAgZ2V0VG9kbyxcbiAgICAgICAgZ2V0VG9kb3NPZlByb2plY3QsXG4gICAgICAgIGNvcHlUb2Rvc0Zyb21TdG9yYWdlLFxuICAgICAgICBnZXRUb2RheVRvZG9zLFxuICAgICAgICBnZXRPdmVyZHVlVG9kb3MsXG4gICAgICAgIGdldFdlZWtUb2RvcyxcbiAgICB9XG5cbn0pKCk7XG5cbmV4cG9ydCB7IHRvZG9GYWN0b3J5LCB0b2RvU3RvcmFnZSB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9