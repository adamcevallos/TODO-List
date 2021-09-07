import { loadSkeleton } from "./contentLoader";

const getFormattedDate = () => {
    let date = new Date().toLocaleDateString();
    console.log(date);
    return date;
    // return format(today, 'MM/dd/yyyy');
}

function loadToday() {
    loadSkeleton('Today');
}

export { loadToday };