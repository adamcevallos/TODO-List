import { todoStorage } from "./todo";

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
    const getTodos = todoStorage.getTodosOfProject(_id);

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
            todoStorage.removeTodosOfProject(projectID);
            storage.removeItem(`project-${projectID}`);
        }
    };

    const addTodoToProject = (todo, projectID) => {
        _projects[projectID].addTodo(todo.getID());
        storage.setItem(`project-${projectID}`, _projects[projectID].stringify());
        todoStorage.addTodo(todo);
    };

    const deleteTodoFromProject = (todoID, projectID) => {
        _projects[projectID].deleteTodo(todoID);
        todoStorage.removeTodo(todoID);
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


export { projectFactory, projectStorage };