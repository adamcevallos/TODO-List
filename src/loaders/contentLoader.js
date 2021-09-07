import { projectStorage } from '../project';


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

        const projects = projectStorage.getProjectsFromStorage();
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

export { 
    renderAddButton,
    loadSkeleton,
    buildAddForm,
};