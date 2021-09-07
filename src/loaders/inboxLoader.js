import { renderAddButton, loadSkeleton } from "./contentLoader";

function loadInbox() {
    loadSkeleton('Inbox');
    renderAddButton();
}

export { loadInbox };