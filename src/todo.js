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

export { todoFactory, todoStorage };