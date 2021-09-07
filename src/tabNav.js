import { loadInbox } from './loaders/inboxLoader';
import { loadToday } from './loaders/todayLoader';
import { loadWeek } from './loaders/weekLoader';
import { loadOverdue } from './loaders/overdueLoader';

import { displayProjectAddForm, buildProjectTab} from './projectNav';
import { projectStorage } from './project';

const renderProjectTabs = () => {
    document.getElementById('project-list').innerHTML = '';
    let projects = projectStorage.getProjectsFromStorage();
    let projectList = document.getElementById('project-list');
    for (let i = 0; i < projects.length; i++) {
        let tab = buildProjectTab(projects[i]);
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
projectAddButton.addEventListener('click', displayProjectAddForm);

// allow loading for static tabs
loadInbox();
renderProjectTabs();
document.getElementById('inbox-tab').addEventListener('click', loadInbox);
document.getElementById('today-tab').addEventListener('click', loadToday);
document.getElementById('week-tab').addEventListener('click', loadWeek);
document.getElementById('overdue-tab').addEventListener('click', loadOverdue);

export { renderProjectTabs };
