import { projects } from "./createTodo.js";
import { storeProjects, getActiveRepo } from "./store.js";

function addItemToProject(item){
    let activeRepo = getActiveRepo()
    projects[activeRepo].push(item)
    storeProjects();
}

function addProject(project){
    projects[project] = [];
    storeProjects()
}

function delProject(project){
    delete projects[project];
    storeProjects()
}

function delTodo(project, title){
    let repo =  projects[project];
    let index = repo.findIndex(todo => todo.title === title);
    repo.splice(index, 1);
    storeProjects();
}

export { addProject, delProject, delTodo, addItemToProject }