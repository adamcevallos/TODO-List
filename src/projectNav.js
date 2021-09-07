import { projectFactory, projectStorage } from './project'
import { renderProjectTabs } from "./tabNav";
import { loadProject } from './loaders/projectLoader';
import { loadInbox } from "./loaders/inboxLoader";

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

    projectTab.addEventListener('click', () => loadProject(project));

    return projectTab;
}

const deleteProjectTab = (project) => {
    const projectTab = document.getElementById('project-' + project.getID());
    if (projectTab.classList.contains('selected')) {
        document.getElementById('inbox-tab').classList.add('selected');
        loadInbox();
    };
    projectStorage.deleteProjectFromStorage(project.getID());
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
    let newProject = projectFactory(title);
    projectStorage.addProjectToStorage(newProject);
    renderProjectTabs();
}

const displayProjectAddForm = () => {
    if (!(document.getElementById('project-add-form'))) {
        const addForm = buildProjectForm();
        document.getElementById('project-list').appendChild(addForm);
    }
}

export { displayProjectAddForm, buildProjectTab };