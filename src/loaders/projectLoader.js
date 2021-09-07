import { loadSkeleton, renderAddButton } from "./contentLoader";

function loadProject(project) {
    loadSkeleton(project.getTitle());
    renderAddButton();
}

export { loadProject };