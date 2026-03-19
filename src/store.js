import { projects } from "./createTodo.js";

function storeData(){
    localStorage.setItem("projects", JSON.stringify(projects))
}

function getData(){
    return JSON.parse(localStorage.getItem("projects"))
}

export { storeData, getData }