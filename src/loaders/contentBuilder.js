import { projectStorage } from '../project';
import { todoFactory, todoStorage } from '../todo';
import { refresh } from '../nav';

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
        projectStorage.deleteTodoFromProject(todo.getID(), todo.getProject());
        refresh(false);
    });
    circle.classList.add('todo-circle');
    let title = document.createElement('span');
    title.classList.add('todo-title');
    let projectName = projectStorage.getProject(todo.getProject()).getTitle();
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

    addButton.onclick = () => refresh(true);

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
        const todo = todoFactory(title,desc,date,projectID,priority);

        // form validation
        let form = document.getElementById('todo-form');
        if (form.checkValidity()) {
            projectStorage.addTodoToProject(todo, projectID);
            refresh(false);
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
        const projects = projectStorage.getAllProjects();
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
            refresh(false);
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

export { 
    buildTodoAddButton,
    buildTodoElement,
    buildTodoAddForm,
};