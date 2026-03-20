import { projects } from "./createTodo.js";

function storeProjects(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function getProjects(){
    return JSON.parse(localStorage.getItem("projects"));
}

function setDefaultRepo(name){
    localStorage.setItem("defaultRepo", JSON.stringify(name));
}

function getDefaultRepo(){
    return JSON.parse(localStorage.getItem("defaultRepo"));
}

function initActiveRepo(){
    localStorage.setItem("activeRepo", JSON.stringify(getDefaultRepo()));
}

function switchActiveRepo(repoName){
    localStorage.setItem("activeRepo", JSON.stringify(repoName));
}

function getActiveRepo(){
    return JSON.parse(localStorage.getItem("activeRepo"));
}

export { storeProjects, getProjects, getActiveRepo, initActiveRepo, switchActiveRepo, setDefaultRepo, getDefaultRepo }