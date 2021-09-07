/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/loaders/contentLoader.js":
/*!**************************************!*\
  !*** ./src/loaders/contentLoader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAddButton": () => (/* binding */ renderAddButton),
/* harmony export */   "loadSkeleton": () => (/* binding */ loadSkeleton),
/* harmony export */   "buildAddForm": () => (/* binding */ buildAddForm)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../project */ "./src/project.js");



const loadSkeleton = (pageTitle) => {
    let editor = document.getElementById('todo-editor');
    editor.innerHTML = '';

    let header = document.createElement('h1');
    header.textContent = pageTitle;
    editor.appendChild(header);

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';  
    editor.appendChild(todoList);
}

const buildTodoElement = (todo) => {
    let todoElement = document.createElement('div');
    todo.classList.add('todo');

    let titleText = document.createElement('p');
    titleText.textContent = todo.getTitle();
    
    let descriptionText = document.createElement('p');
    descriptionText.textContent = todo.getDescription();
}

const deleteTodoElement = (todo) => {

}

const buildTodoAddButton = () => {

    console.log('accessed');
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

    addButton.onclick = () => {
        let todoList = document.getElementById('todo-list');
        todoList.removeChild(addButton);
        let addForm = buildAddForm();
        console.log(addForm)
    }

    return addButton;

}

const renderAddButton = () => {
    let todoList = document.getElementById('todo-list');
    let addBtn = document.getElementById('todo-add-button');
    if (addBtn) todoList.removeChild(addBtn);
    addBtn = buildTodoAddButton();
    todoList.appendChild(addBtn);
}

const formBuilder = (function() {
    
    const buildTitle = () => {
        let titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title';

        let title = document.createElement('input');
        title.type = 'text';
        title.id = 'todo-form-title';
        titleLabel.appendChild(title);

        return titleLabel
    }

    const buildDescription = () => {
        let descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'description';

        let description = document.createElement('textarea');
        description.id = 'todo-form-description';
        descriptionLabel.appendChild(description);

        return descriptionLabel
    }

    const buildDate = () => {
        let dateLabel = document.createElement('label');
        dateLabel.textContent = 'Due Date';

        let date = document.createElement('input');
        date.type = 'date';
        date.id = 'todo-form-date'
        dateLabel.appendChild(date);

        return dateLabel;
    }

    const buildProjectDropdown = () => {
        let projectLabel = document.createElement('label');
        let projectList = document.createElement('select');

        projectLabel.textContent = 'Project';

        const projects = _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.getProjectsFromStorage();
        console.log(projects[0].getID());
        for (let i = 0; i < projects.length; i++) {
            console.log(projects);
            let option = document.createElement('option');
            option.value = projects[i].getID();
            option.innerHTML = projects[i].getTitle();
            projectList.appendChild(option);
        }
        projectLabel.appendChild(projectList);

        return projectLabel
    }

    const buildPriorityDropdown = () => {
        let priorityLabel = document.createElement('label');
        priorityLabel.textContent = 'Priority';
        let priority = document.createElement('select');
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
        
        let btns = document.createElement('div');
        btns.id = 'todo-form-btns';

        let submit = document.createElement('input');
        submit.id = 'todo-form-submit';
        submit.value = 'Add todo';
        submit.type = 'button';
        submit.onclick = submitAddForm;

        let close = document.createElement('input');
        close.id = 'todo-form-close';
        close.value = 'Close';
        close.type = 'button';
        close.onclick = closeAddForm;
        btns.appendChild(submit);
        btns.appendChild(close);

        return btns;
    }

    return {buildTitle, buildDescription, buildDate, buildProjectDropdown, 
            buildPriorityDropdown, buildButtons};

})();

const buildAddForm = () => {

    let form = document.createElement('form');
    form.id = 'todo-form';

    const title = formBuilder.buildTitle();
    const description = formBuilder.buildDescription();
    const date = formBuilder.buildDate();
    const projectDropdown = formBuilder.buildProjectDropdown();
    const priorityDropdown = formBuilder.buildPriorityDropdown();
    const buttons = formBuilder.buildButtons();

    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(date);
    form.appendChild(projectDropdown);
    form.appendChild(priorityDropdown);
    form.appendChild(buttons);

    document.getElementById('todo-list').appendChild(form);
}

const closeAddForm = () => {
    let form = document.getElementById('todo-form');
    document.getElementById('todo-list').removeChild(form);
    renderAddButton();
}

const submitAddForm = () => {
    // add the todo to the storage


    // render the new form
}



/***/ }),

/***/ "./src/loaders/inboxLoader.js":
/*!************************************!*\
  !*** ./src/loaders/inboxLoader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadInbox": () => (/* binding */ loadInbox)
/* harmony export */ });
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentLoader */ "./src/loaders/contentLoader.js");


function loadInbox() {
    (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.loadSkeleton)('Inbox');
    (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.renderAddButton)();
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
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentLoader */ "./src/loaders/contentLoader.js");


function loadOverdue() {
    (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.loadSkeleton)('Overdue');
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
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentLoader */ "./src/loaders/contentLoader.js");


function loadProject(project) {
    (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.loadSkeleton)(project.getTitle());
    (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.renderAddButton)();
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
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentLoader */ "./src/loaders/contentLoader.js");


const getFormattedDate = () => {
    let date = new Date().toLocaleDateString();
    console.log(date);
    return date;
    // return format(today, 'MM/dd/yyyy');
}

function loadToday() {
    ;(0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.loadSkeleton)('Today');
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
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentLoader */ "./src/loaders/contentLoader.js");


function loadWeek() {
    (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.loadSkeleton)('This Week');
}



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
const projectIDGenerator = (function() {
    let _nextId = 0;
    const generateProjectID = () => _nextId++;
    return { generateProjectID }
})();

const projectFactory = (title, id = projectIDGenerator.generateProjectID()) => {
    let _title = title;
    let _todos = [];
    let _id = id;

    const getTitle = () => _title;
    const setTitle = () => _title = title;
    const getID = () => _id;

    const addTodo = (todo) => _todos.push(todo);
    const deleteTodo = (todo) => {
        for (let i = 0; i < _todos.length; i++) {
            if (_todos[i] === todo) {
                _todos.splice(i, 1);
            }
        }
    }

    return { 
            getTitle, 
            setTitle, 
            addTodo, 
            deleteTodo, 
             getID,
        };
}

const projectStorage = (function () {
    let inbox = projectFactory('inbox','inbox');
    let defaultProject = projectFactory('default');
    let _projects = { 'inbox' : inbox, 0 : defaultProject };

    const addProjectToStorage = (project) => _projects[project.getID()] = project;
    const deleteProjectFromStorage = (projectID) => {
        if (projectID === 'inbox') {
            console.log('cannot delete inbox');
        } else {
            delete _projects[projectID];
        }
    };

    const getProjectsFromStorage = () => Object.values(_projects).filter(
        (project) => project.getID() !== 'inbox'
    );
    const getProjectFromStorageByID = (id) => _projects[id];
    const addTodoToProject = (todo, projectID) => _projects[projectID].addTodo(todo);

    return {    
        addProjectToStorage,
        deleteProjectFromStorage,
        getProjectsFromStorage,
        getProjectFromStorageByID,
        addTodoToProject,
    };
})();




/***/ }),

/***/ "./src/projectNav.js":
/*!***************************!*\
  !*** ./src/projectNav.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayProjectAddForm": () => (/* binding */ displayProjectAddForm),
/* harmony export */   "buildProjectTab": () => (/* binding */ buildProjectTab)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _tabNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabNav */ "./src/tabNav.js");
/* harmony import */ var _loaders_projectLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders/projectLoader */ "./src/loaders/projectLoader.js");
/* harmony import */ var _loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loaders/inboxLoader */ "./src/loaders/inboxLoader.js");





const buildProjectTab = (project) => {
    let projectTab = document.createElement('div');
    let title = document.createElement('span');
    let deleteBtn = document.createElement('span');

    title.textContent = project.getTitle();
    deleteBtn.innerHTML = '&#10005';
    deleteBtn.classList.add('right-tab');
    deleteBtn.classList.add('project-delete-button');
    deleteBtn.onclick = (e) => {
        deleteProjectTab(project);
        e.stopPropagation();
    };

    projectTab.appendChild(title);
    projectTab.appendChild(deleteBtn);
    projectTab.classList.add('tab');
    projectTab.id = 'project-' + project.getID();

    projectTab.addEventListener('click', () => (0,_loaders_projectLoader__WEBPACK_IMPORTED_MODULE_2__.loadProject)(project));

    return projectTab;
}

const deleteProjectTab = (project) => {
    const projectTab = document.getElementById('project-' + project.getID());
    if (projectTab.classList.contains('selected')) {
        document.getElementById('inbox-tab').classList.add('selected');
        (0,_loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_3__.loadInbox)();
    };
    _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.deleteProjectFromStorage(project.getID());
    document.getElementById('project-list').removeChild(projectTab);
}

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
    submitButton.onclick = () => submitForm(textbox.value);

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
    projectList.removeChild(document.getElementById('project-add-form'));
}

const submitForm = (title) => {
    let newProject = (0,_project__WEBPACK_IMPORTED_MODULE_0__.projectFactory)(title);
    _project__WEBPACK_IMPORTED_MODULE_0__.projectStorage.addProjectToStorage(newProject);
    (0,_tabNav__WEBPACK_IMPORTED_MODULE_1__.renderProjectTabs)();
}

const displayProjectAddForm = () => {
    if (!(document.getElementById('project-add-form'))) {
        const addForm = buildProjectForm();
        document.getElementById('project-list').appendChild(addForm);
    }
}



/***/ }),

/***/ "./src/tabNav.js":
/*!***********************!*\
  !*** ./src/tabNav.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderProjectTabs": () => (/* binding */ renderProjectTabs)
/* harmony export */ });
/* harmony import */ var _loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loaders/inboxLoader */ "./src/loaders/inboxLoader.js");
/* harmony import */ var _loaders_todayLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loaders/todayLoader */ "./src/loaders/todayLoader.js");
/* harmony import */ var _loaders_weekLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders/weekLoader */ "./src/loaders/weekLoader.js");
/* harmony import */ var _loaders_overdueLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loaders/overdueLoader */ "./src/loaders/overdueLoader.js");
/* harmony import */ var _projectNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projectNav */ "./src/projectNav.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./project */ "./src/project.js");








const renderProjectTabs = () => {
    document.getElementById('project-list').innerHTML = '';
    let projects = _project__WEBPACK_IMPORTED_MODULE_5__.projectStorage.getProjectsFromStorage();
    let projectList = document.getElementById('project-list');
    for (let i = 0; i < projects.length; i++) {
        let tab = (0,_projectNav__WEBPACK_IMPORTED_MODULE_4__.buildProjectTab)(projects[i]);
        TabHighlighter.addHighlightToTab(tab);
        projectList.appendChild(tab);
    }
}

const TabHighlighter = (function () {

    const addHighlightToTab = (tab) => tab.addEventListener('click', () => {
        let selectedTab = document.querySelector('.selected');
        if (selectedTab) selectedTab.classList.remove('selected');
        tab.classList.add('selected');
    });

    document.querySelectorAll('.tab').forEach(tab => addHighlightToTab(tab));
    document.getElementById('inbox-tab').classList.add('selected');

    return { addHighlightToTab };

})();

// attach add form
const projectAddButton = document.getElementById('project-add-button');
projectAddButton.addEventListener('click', _projectNav__WEBPACK_IMPORTED_MODULE_4__.displayProjectAddForm);

// allow loading for static tabs
(0,_loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_0__.loadInbox)();
renderProjectTabs();
document.getElementById('inbox-tab').addEventListener('click', _loaders_inboxLoader__WEBPACK_IMPORTED_MODULE_0__.loadInbox);
document.getElementById('today-tab').addEventListener('click', _loaders_todayLoader__WEBPACK_IMPORTED_MODULE_1__.loadToday);
document.getElementById('week-tab').addEventListener('click', _loaders_weekLoader__WEBPACK_IMPORTED_MODULE_2__.loadWeek);
document.getElementById('overdue-tab').addEventListener('click', _loaders_overdueLoader__WEBPACK_IMPORTED_MODULE_3__.loadOverdue);




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
/* harmony import */ var _tabNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabNav */ "./src/tabNav.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9pbmJveExvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9hZGVycy9vdmVyZHVlTG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2FkZXJzL3Byb2plY3RMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvdG9kYXlMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvYWRlcnMvd2Vla0xvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdE5hdi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFiTmF2LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RTdG9yYWdlIH0gZnJvbSAnLi4vcHJvamVjdCc7XG5cblxuY29uc3QgbG9hZFNrZWxldG9uID0gKHBhZ2VUaXRsZSkgPT4ge1xuICAgIGxldCBlZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1lZGl0b3InKTtcbiAgICBlZGl0b3IuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBwYWdlVGl0bGU7XG4gICAgZWRpdG9yLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvTGlzdC5pZCA9ICd0b2RvLWxpc3QnOyAgXG4gICAgZWRpdG9yLmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcbn1cblxuY29uc3QgYnVpbGRUb2RvRWxlbWVudCA9ICh0b2RvKSA9PiB7XG4gICAgbGV0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kby5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG5cbiAgICBsZXQgdGl0bGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VGl0bGUoKTtcbiAgICBcbiAgICBsZXQgZGVzY3JpcHRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGRlc2NyaXB0aW9uVGV4dC50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RGVzY3JpcHRpb24oKTtcbn1cblxuY29uc3QgZGVsZXRlVG9kb0VsZW1lbnQgPSAodG9kbykgPT4ge1xuXG59XG5cbmNvbnN0IGJ1aWxkVG9kb0FkZEJ1dHRvbiA9ICgpID0+IHtcblxuICAgIGNvbnNvbGUubG9nKCdhY2Nlc3NlZCcpO1xuICAgIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhZGRCdXR0b24uaWQgPSAndG9kby1hZGQtYnV0dG9uJztcblxuICAgIGxldCBwbHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHBsdXMudGV4dENvbnRlbnQgPSAnKyc7XG4gICAgcGx1cy5pZCA9ICd0b2RvLWFkZC1wbHVzJztcblxuICAgIGxldCBhZGRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGFkZFRleHQudGV4dENvbnRlbnQgPSAnQWRkIHRhc2snO1xuICAgIGFkZFRleHQuaWQgPSAndG9kby1hZGQtdGV4dCc7XG5cbiAgICBhZGRCdXR0b24uYXBwZW5kQ2hpbGQocGx1cyk7XG4gICAgYWRkQnV0dG9uLmFwcGVuZENoaWxkKGFkZFRleHQpO1xuXG4gICAgYWRkQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0b2RvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWxpc3QnKTtcbiAgICAgICAgdG9kb0xpc3QucmVtb3ZlQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICAgICAgbGV0IGFkZEZvcm0gPSBidWlsZEFkZEZvcm0oKTtcbiAgICAgICAgY29uc29sZS5sb2coYWRkRm9ybSlcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkQnV0dG9uO1xuXG59XG5cbmNvbnN0IHJlbmRlckFkZEJ1dHRvbiA9ICgpID0+IHtcbiAgICBsZXQgdG9kb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1saXN0Jyk7XG4gICAgbGV0IGFkZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWFkZC1idXR0b24nKTtcbiAgICBpZiAoYWRkQnRuKSB0b2RvTGlzdC5yZW1vdmVDaGlsZChhZGRCdG4pO1xuICAgIGFkZEJ0biA9IGJ1aWxkVG9kb0FkZEJ1dHRvbigpO1xuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGFkZEJ0bik7XG59XG5cbmNvbnN0IGZvcm1CdWlsZGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIGNvbnN0IGJ1aWxkVGl0bGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGl0bGVMYWJlbC50ZXh0Q29udGVudCA9ICdUaXRsZSc7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGl0bGUuaWQgPSAndG9kby1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGVMYWJlbC5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRpdGxlTGFiZWxcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZERlc2NyaXB0aW9uID0gKCkgPT4ge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uTGFiZWwudGV4dENvbnRlbnQgPSAnZGVzY3JpcHRpb24nO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlkID0gJ3RvZG8tZm9ybS1kZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uTGFiZWwuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbkxhYmVsXG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGREYXRlID0gKCkgPT4ge1xuICAgICAgICBsZXQgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gJ0R1ZSBEYXRlJztcblxuICAgICAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGRhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgZGF0ZS5pZCA9ICd0b2RvLWZvcm0tZGF0ZSdcbiAgICAgICAgZGF0ZUxhYmVsLmFwcGVuZENoaWxkKGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBkYXRlTGFiZWw7XG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGRQcm9qZWN0RHJvcGRvd24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsZXQgcHJvamVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgICAgICBwcm9qZWN0TGFiZWwudGV4dENvbnRlbnQgPSAnUHJvamVjdCc7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBwcm9qZWN0U3RvcmFnZS5nZXRQcm9qZWN0c0Zyb21TdG9yYWdlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzWzBdLmdldElEKCkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0c1tpXS5nZXRJRCgpO1xuICAgICAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IHByb2plY3RzW2ldLmdldFRpdGxlKCk7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RMYWJlbC5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RMYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkUHJpb3JpdHlEcm9wZG93biA9ICgpID0+IHtcbiAgICAgICAgbGV0IHByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBwcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5JztcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gaTtcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgcHJpb3JpdHkuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBwcmlvcml0eUxhYmVsLmFwcGVuZENoaWxkKHByaW9yaXR5KTtcblxuICAgICAgICByZXR1cm4gcHJpb3JpdHlMYWJlbFxuICAgIH1cblxuICAgIGNvbnN0IGJ1aWxkQnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBidG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ0bnMuaWQgPSAndG9kby1mb3JtLWJ0bnMnO1xuXG4gICAgICAgIGxldCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBzdWJtaXQuaWQgPSAndG9kby1mb3JtLXN1Ym1pdCc7XG4gICAgICAgIHN1Ym1pdC52YWx1ZSA9ICdBZGQgdG9kbyc7XG4gICAgICAgIHN1Ym1pdC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgIHN1Ym1pdC5vbmNsaWNrID0gc3VibWl0QWRkRm9ybTtcblxuICAgICAgICBsZXQgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjbG9zZS5pZCA9ICd0b2RvLWZvcm0tY2xvc2UnO1xuICAgICAgICBjbG9zZS52YWx1ZSA9ICdDbG9zZSc7XG4gICAgICAgIGNsb3NlLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY2xvc2Uub25jbGljayA9IGNsb3NlQWRkRm9ybTtcbiAgICAgICAgYnRucy5hcHBlbmRDaGlsZChzdWJtaXQpO1xuICAgICAgICBidG5zLmFwcGVuZENoaWxkKGNsb3NlKTtcblxuICAgICAgICByZXR1cm4gYnRucztcbiAgICB9XG5cbiAgICByZXR1cm4ge2J1aWxkVGl0bGUsIGJ1aWxkRGVzY3JpcHRpb24sIGJ1aWxkRGF0ZSwgYnVpbGRQcm9qZWN0RHJvcGRvd24sIFxuICAgICAgICAgICAgYnVpbGRQcmlvcml0eURyb3Bkb3duLCBidWlsZEJ1dHRvbnN9O1xuXG59KSgpO1xuXG5jb25zdCBidWlsZEFkZEZvcm0gPSAoKSA9PiB7XG5cbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLmlkID0gJ3RvZG8tZm9ybSc7XG5cbiAgICBjb25zdCB0aXRsZSA9IGZvcm1CdWlsZGVyLmJ1aWxkVGl0bGUoKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGZvcm1CdWlsZGVyLmJ1aWxkRGVzY3JpcHRpb24oKTtcbiAgICBjb25zdCBkYXRlID0gZm9ybUJ1aWxkZXIuYnVpbGREYXRlKCk7XG4gICAgY29uc3QgcHJvamVjdERyb3Bkb3duID0gZm9ybUJ1aWxkZXIuYnVpbGRQcm9qZWN0RHJvcGRvd24oKTtcbiAgICBjb25zdCBwcmlvcml0eURyb3Bkb3duID0gZm9ybUJ1aWxkZXIuYnVpbGRQcmlvcml0eURyb3Bkb3duKCk7XG4gICAgY29uc3QgYnV0dG9ucyA9IGZvcm1CdWlsZGVyLmJ1aWxkQnV0dG9ucygpO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHByb2plY3REcm9wZG93bik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwcmlvcml0eURyb3Bkb3duKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGJ1dHRvbnMpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpLmFwcGVuZENoaWxkKGZvcm0pO1xufVxuXG5jb25zdCBjbG9zZUFkZEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpLnJlbW92ZUNoaWxkKGZvcm0pO1xuICAgIHJlbmRlckFkZEJ1dHRvbigpO1xufVxuXG5jb25zdCBzdWJtaXRBZGRGb3JtID0gKCkgPT4ge1xuICAgIC8vIGFkZCB0aGUgdG9kbyB0byB0aGUgc3RvcmFnZVxuXG5cbiAgICAvLyByZW5kZXIgdGhlIG5ldyBmb3JtXG59XG5cbmV4cG9ydCB7IFxuICAgIHJlbmRlckFkZEJ1dHRvbixcbiAgICBsb2FkU2tlbGV0b24sXG4gICAgYnVpbGRBZGRGb3JtLFxufTsiLCJpbXBvcnQgeyByZW5kZXJBZGRCdXR0b24sIGxvYWRTa2VsZXRvbiB9IGZyb20gXCIuL2NvbnRlbnRMb2FkZXJcIjtcblxuZnVuY3Rpb24gbG9hZEluYm94KCkge1xuICAgIGxvYWRTa2VsZXRvbignSW5ib3gnKTtcbiAgICByZW5kZXJBZGRCdXR0b24oKTtcbn1cblxuZXhwb3J0IHsgbG9hZEluYm94IH07IiwiaW1wb3J0IHsgbG9hZFNrZWxldG9uIH0gZnJvbSBcIi4vY29udGVudExvYWRlclwiO1xuXG5mdW5jdGlvbiBsb2FkT3ZlcmR1ZSgpIHtcbiAgICBsb2FkU2tlbGV0b24oJ092ZXJkdWUnKTtcbn1cblxuZXhwb3J0IHsgbG9hZE92ZXJkdWUgfTsiLCJpbXBvcnQgeyBsb2FkU2tlbGV0b24sIHJlbmRlckFkZEJ1dHRvbiB9IGZyb20gXCIuL2NvbnRlbnRMb2FkZXJcIjtcblxuZnVuY3Rpb24gbG9hZFByb2plY3QocHJvamVjdCkge1xuICAgIGxvYWRTa2VsZXRvbihwcm9qZWN0LmdldFRpdGxlKCkpO1xuICAgIHJlbmRlckFkZEJ1dHRvbigpO1xufVxuXG5leHBvcnQgeyBsb2FkUHJvamVjdCB9OyIsImltcG9ydCB7IGxvYWRTa2VsZXRvbiB9IGZyb20gXCIuL2NvbnRlbnRMb2FkZXJcIjtcblxuY29uc3QgZ2V0Rm9ybWF0dGVkRGF0ZSA9ICgpID0+IHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgY29uc29sZS5sb2coZGF0ZSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gICAgLy8gcmV0dXJuIGZvcm1hdCh0b2RheSwgJ01NL2RkL3l5eXknKTtcbn1cblxuZnVuY3Rpb24gbG9hZFRvZGF5KCkge1xuICAgIGxvYWRTa2VsZXRvbignVG9kYXknKTtcbn1cblxuZXhwb3J0IHsgbG9hZFRvZGF5IH07IiwiaW1wb3J0IHsgbG9hZFNrZWxldG9uIH0gZnJvbSBcIi4vY29udGVudExvYWRlclwiO1xuXG5mdW5jdGlvbiBsb2FkV2VlaygpIHtcbiAgICBsb2FkU2tlbGV0b24oJ1RoaXMgV2VlaycpO1xufVxuXG5leHBvcnQgeyBsb2FkV2VlayB9OyIsImNvbnN0IHByb2plY3RJREdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgX25leHRJZCA9IDA7XG4gICAgY29uc3QgZ2VuZXJhdGVQcm9qZWN0SUQgPSAoKSA9PiBfbmV4dElkKys7XG4gICAgcmV0dXJuIHsgZ2VuZXJhdGVQcm9qZWN0SUQgfVxufSkoKTtcblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUsIGlkID0gcHJvamVjdElER2VuZXJhdG9yLmdlbmVyYXRlUHJvamVjdElEKCkpID0+IHtcbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF90b2RvcyA9IFtdO1xuICAgIGxldCBfaWQgPSBpZDtcblxuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gX3RpdGxlO1xuICAgIGNvbnN0IHNldFRpdGxlID0gKCkgPT4gX3RpdGxlID0gdGl0bGU7XG4gICAgY29uc3QgZ2V0SUQgPSAoKSA9PiBfaWQ7XG5cbiAgICBjb25zdCBhZGRUb2RvID0gKHRvZG8pID0+IF90b2Rvcy5wdXNoKHRvZG8pO1xuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF90b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKF90b2Rvc1tpXSA9PT0gdG9kbykge1xuICAgICAgICAgICAgICAgIF90b2Rvcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBcbiAgICAgICAgICAgIGdldFRpdGxlLCBcbiAgICAgICAgICAgIHNldFRpdGxlLCBcbiAgICAgICAgICAgIGFkZFRvZG8sIFxuICAgICAgICAgICAgZGVsZXRlVG9kbywgXG4gICAgICAgICAgICAgZ2V0SUQsXG4gICAgICAgIH07XG59XG5cbmNvbnN0IHByb2plY3RTdG9yYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaW5ib3ggPSBwcm9qZWN0RmFjdG9yeSgnaW5ib3gnLCdpbmJveCcpO1xuICAgIGxldCBkZWZhdWx0UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KCdkZWZhdWx0Jyk7XG4gICAgbGV0IF9wcm9qZWN0cyA9IHsgJ2luYm94JyA6IGluYm94LCAwIDogZGVmYXVsdFByb2plY3QgfTtcblxuICAgIGNvbnN0IGFkZFByb2plY3RUb1N0b3JhZ2UgPSAocHJvamVjdCkgPT4gX3Byb2plY3RzW3Byb2plY3QuZ2V0SUQoKV0gPSBwcm9qZWN0O1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RGcm9tU3RvcmFnZSA9IChwcm9qZWN0SUQpID0+IHtcbiAgICAgICAgaWYgKHByb2plY3RJRCA9PT0gJ2luYm94Jykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nhbm5vdCBkZWxldGUgaW5ib3gnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfcHJvamVjdHNbcHJvamVjdElEXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0c0Zyb21TdG9yYWdlID0gKCkgPT4gT2JqZWN0LnZhbHVlcyhfcHJvamVjdHMpLmZpbHRlcihcbiAgICAgICAgKHByb2plY3QpID0+IHByb2plY3QuZ2V0SUQoKSAhPT0gJ2luYm94J1xuICAgICk7XG4gICAgY29uc3QgZ2V0UHJvamVjdEZyb21TdG9yYWdlQnlJRCA9IChpZCkgPT4gX3Byb2plY3RzW2lkXTtcbiAgICBjb25zdCBhZGRUb2RvVG9Qcm9qZWN0ID0gKHRvZG8sIHByb2plY3RJRCkgPT4gX3Byb2plY3RzW3Byb2plY3RJRF0uYWRkVG9kbyh0b2RvKTtcblxuICAgIHJldHVybiB7ICAgIFxuICAgICAgICBhZGRQcm9qZWN0VG9TdG9yYWdlLFxuICAgICAgICBkZWxldGVQcm9qZWN0RnJvbVN0b3JhZ2UsXG4gICAgICAgIGdldFByb2plY3RzRnJvbVN0b3JhZ2UsXG4gICAgICAgIGdldFByb2plY3RGcm9tU3RvcmFnZUJ5SUQsXG4gICAgICAgIGFkZFRvZG9Ub1Byb2plY3QsXG4gICAgfTtcbn0pKCk7XG5cblxuZXhwb3J0IHsgcHJvamVjdEZhY3RvcnksIHByb2plY3RTdG9yYWdlIH07IiwiaW1wb3J0IHsgcHJvamVjdEZhY3RvcnksIHByb2plY3RTdG9yYWdlIH0gZnJvbSAnLi9wcm9qZWN0J1xuaW1wb3J0IHsgcmVuZGVyUHJvamVjdFRhYnMgfSBmcm9tIFwiLi90YWJOYXZcIjtcbmltcG9ydCB7IGxvYWRQcm9qZWN0IH0gZnJvbSAnLi9sb2FkZXJzL3Byb2plY3RMb2FkZXInO1xuaW1wb3J0IHsgbG9hZEluYm94IH0gZnJvbSBcIi4vbG9hZGVycy9pbmJveExvYWRlclwiO1xuXG5jb25zdCBidWlsZFByb2plY3RUYWIgPSAocHJvamVjdCkgPT4ge1xuICAgIGxldCBwcm9qZWN0VGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0VGl0bGUoKTtcbiAgICBkZWxldGVCdG4uaW5uZXJIVE1MID0gJyYjMTAwMDUnO1xuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyaWdodC10YWInKTtcbiAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1kZWxldGUtYnV0dG9uJyk7XG4gICAgZGVsZXRlQnRuLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBkZWxldGVQcm9qZWN0VGFiKHByb2plY3QpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICBwcm9qZWN0VGFiLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBwcm9qZWN0VGFiLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgcHJvamVjdFRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKTtcbiAgICBwcm9qZWN0VGFiLmlkID0gJ3Byb2plY3QtJyArIHByb2plY3QuZ2V0SUQoKTtcblxuICAgIHByb2plY3RUYWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBsb2FkUHJvamVjdChwcm9qZWN0KSk7XG5cbiAgICByZXR1cm4gcHJvamVjdFRhYjtcbn1cblxuY29uc3QgZGVsZXRlUHJvamVjdFRhYiA9IChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdFRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LScgKyBwcm9qZWN0LmdldElEKCkpO1xuICAgIGlmIChwcm9qZWN0VGFiLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtdGFiJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgbG9hZEluYm94KCk7XG4gICAgfTtcbiAgICBwcm9qZWN0U3RvcmFnZS5kZWxldGVQcm9qZWN0RnJvbVN0b3JhZ2UocHJvamVjdC5nZXRJRCgpKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0JykucmVtb3ZlQ2hpbGQocHJvamVjdFRhYik7XG59XG5cbmNvbnN0IGJ1aWxkUHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLmlkID0gJ3Byb2plY3QtYWRkLWZvcm0nO1xuXG4gICAgbGV0IHRleHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRleHRib3gudHlwZSA9ICdpbnB1dCc7XG4gICAgdGV4dGJveC5pZCA9ICdwcm9qZWN0LWFkZC10ZXh0Ym94JztcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHN1Ym1pdEJ1dHRvbi5pZCA9ICdwcm9qZWN0LWFkZC1zdWJtaXQnO1xuICAgIHN1Ym1pdEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgc3VibWl0QnV0dG9uLnZhbHVlID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnMTAwMDMnKTtcbiAgICBzdWJtaXRCdXR0b24ub25jbGljayA9ICgpID0+IHN1Ym1pdEZvcm0odGV4dGJveC52YWx1ZSk7XG5cbiAgICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNsb3NlQnV0dG9uLmlkID0gJ3Byb2plY3QtYWRkLWNsb3NlJztcbiAgICBjbG9zZUJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgY2xvc2VCdXR0b24udmFsdWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCcxMDAwNicpO1xuICAgIGNsb3NlQnV0dG9uLm9uY2xpY2sgPSBjbG9zZUZvcm07XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKHRleHRib3gpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcblxuICAgIHJldHVybiBmb3JtO1xufVxuXG5jb25zdCBjbG9zZUZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuICAgIHByb2plY3RMaXN0LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWFkZC1mb3JtJykpO1xufVxuXG5jb25zdCBzdWJtaXRGb3JtID0gKHRpdGxlKSA9PiB7XG4gICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0RmFjdG9yeSh0aXRsZSk7XG4gICAgcHJvamVjdFN0b3JhZ2UuYWRkUHJvamVjdFRvU3RvcmFnZShuZXdQcm9qZWN0KTtcbiAgICByZW5kZXJQcm9qZWN0VGFicygpO1xufVxuXG5jb25zdCBkaXNwbGF5UHJvamVjdEFkZEZvcm0gPSAoKSA9PiB7XG4gICAgaWYgKCEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtYWRkLWZvcm0nKSkpIHtcbiAgICAgICAgY29uc3QgYWRkRm9ybSA9IGJ1aWxkUHJvamVjdEZvcm0oKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpLmFwcGVuZENoaWxkKGFkZEZvcm0pO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgZGlzcGxheVByb2plY3RBZGRGb3JtLCBidWlsZFByb2plY3RUYWIgfTsiLCJpbXBvcnQgeyBsb2FkSW5ib3ggfSBmcm9tICcuL2xvYWRlcnMvaW5ib3hMb2FkZXInO1xuaW1wb3J0IHsgbG9hZFRvZGF5IH0gZnJvbSAnLi9sb2FkZXJzL3RvZGF5TG9hZGVyJztcbmltcG9ydCB7IGxvYWRXZWVrIH0gZnJvbSAnLi9sb2FkZXJzL3dlZWtMb2FkZXInO1xuaW1wb3J0IHsgbG9hZE92ZXJkdWUgfSBmcm9tICcuL2xvYWRlcnMvb3ZlcmR1ZUxvYWRlcic7XG5cbmltcG9ydCB7IGRpc3BsYXlQcm9qZWN0QWRkRm9ybSwgYnVpbGRQcm9qZWN0VGFifSBmcm9tICcuL3Byb2plY3ROYXYnO1xuaW1wb3J0IHsgcHJvamVjdFN0b3JhZ2UgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5jb25zdCByZW5kZXJQcm9qZWN0VGFicyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0JykuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IHByb2plY3RzID0gcHJvamVjdFN0b3JhZ2UuZ2V0UHJvamVjdHNGcm9tU3RvcmFnZSgpO1xuICAgIGxldCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YWIgPSBidWlsZFByb2plY3RUYWIocHJvamVjdHNbaV0pO1xuICAgICAgICBUYWJIaWdobGlnaHRlci5hZGRIaWdobGlnaHRUb1RhYih0YWIpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIH1cbn1cblxuY29uc3QgVGFiSGlnaGxpZ2h0ZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgYWRkSGlnaGxpZ2h0VG9UYWIgPSAodGFiKSA9PiB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBzZWxlY3RlZFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHNlbGVjdGVkVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpLmZvckVhY2godGFiID0+IGFkZEhpZ2hsaWdodFRvVGFiKHRhYikpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveC10YWInKS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXG4gICAgcmV0dXJuIHsgYWRkSGlnaGxpZ2h0VG9UYWIgfTtcblxufSkoKTtcblxuLy8gYXR0YWNoIGFkZCBmb3JtXG5jb25zdCBwcm9qZWN0QWRkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtYWRkLWJ1dHRvbicpO1xucHJvamVjdEFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlQcm9qZWN0QWRkRm9ybSk7XG5cbi8vIGFsbG93IGxvYWRpbmcgZm9yIHN0YXRpYyB0YWJzXG5sb2FkSW5ib3goKTtcbnJlbmRlclByb2plY3RUYWJzKCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkSW5ib3gpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZGF5LXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZFRvZGF5KTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWVrLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZFdlZWspO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJkdWUtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkT3ZlcmR1ZSk7XG5cbmV4cG9ydCB7IHJlbmRlclByb2plY3RUYWJzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==