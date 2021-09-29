import { loadInbox } from './loaders/inboxLoader';
import { loadToday } from './loaders/todayLoader';
import { loadWeek } from './loaders/weekLoader';
import { loadOverdue } from './loaders/overdueLoader';
import { loadProject } from './loaders/projectLoader';
import { projectStorage, projectFactory } from './project';
import { todoFactory, todoStorage } from './todo';

let storage = window.localStorage;
// window.localStorage.clear();

// todoStorage.copyTodosFromStorage();
let storageTab = storage.getItem('selected');
let currentTab = (storageTab) ? storageTab : 'inbox';

const refresh = (formActive=false) => {
    switch (currentTab) {
        case 'inbox':
            loadProject("inbox", formActive);
            // loadInbox(formActive);
            break;
        case 'overdue':
            loadOverdue(formActive);
            break;
        case 'today':
            loadToday(formActive);
            break;
        case 'week':
            loadWeek(formActive);
            break;
        default:
            let projectID = currentTab.slice(currentTab.indexOf('-')+1);
            loadProject(projectID, formActive);
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
        projectStorage.deleteProject(project.getID());
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
        let newProject = projectFactory(title);
        projectStorage.addProject(newProject);
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
    let projects = projectStorage.getAllProjects();
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

export { refresh };