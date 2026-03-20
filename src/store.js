import { projects } from "./createTodo.js";

function storeProjects(){
    localStorage.setItem("projects", JSON.stringify(projects))
}

function getProjects(){
    return JSON.parse(localStorage.getItem("projects"))
}

function initActiveRepo(){
    localStorage.setItem("activeRepo", JSON.stringify("defaultRepo"))
}

function switchActiveRepo(repoName){
    localStorage.setItem("activeRepo", JSON.stringify(repoName))
}

function getActiveRepo(){
    return JSON.parse(localStorage.getItem("activeRepo"))
}

export { storeProjects, getProjects, getActiveRepo, initActiveRepo, switchActiveRepo }