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


export { projectFactory, projectStorage };