const todoIDGenerator = (function () {
    let _nextId = 0;
    const generateTodoID = _nextId++;
    return { generateTodoID }
})();

const todoFactory = (title, description, dueDate, priority) => {
    let _id = generateTodoID();
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;
    const getID = () => _id;

    const setTitle = (newTitle) => _title = newTitle;
    const setDescription = (newDescription) => _description = newDescription;
    const setDueDate = (newDueDate) => _dueDate = newDueDate;
    const setPriority = (newPriority) => _priority = newPriority;

    return {
        getTitle, 
        getDescription, 
        getDueDate, 
        getPriority,
        setTitle, 
        setDescription, 
        setDueDate, 
        setPriority,
        getID   
    };
}

export { todoFactory };