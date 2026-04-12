import { activateProject, getActiveProjectId, getProjects } from "./store.js";
import { addProject, deleteProject, getActiveProjectName, getTaskCount, renameProject } from "./utils.js";

const projectsList = document.querySelector(".projects");
const activeProject = document.querySelector(".activeRepo h1");
const tasks = document.querySelector(".activeRepo span");
const projectInput = document.querySelector("#newProject");
const addProjectBtn = document.querySelector("#addProjectBtn");
const deleteSvg = document.querySelector("svg#delete");
const renameSvg = document.querySelector("svg#edit")


function createProjectComponent(key){
    let projects = getProjects();
    let project = projects[key];
    let activeProjectId = getActiveProjectId();

    let container = document.createElement("div");
    let line = document.createElement("div");
    line.classList.add("line");
    let h1 = document.createElement("h1");

    h1.addEventListener("click", (e) => {
        let id = e.target.id;
        activateProject(id);

        renderProjects()
    })

    if(project.id === activeProjectId){
        h1.classList.add("active")
    }
    h1.setAttribute("id", project.id)
    h1.textContent = key;

    container.appendChild(line);
    container.appendChild(h1);

    return container;
}

function renderProjects(){
    let projects = getProjects();
    let activeProjectId = getActiveProjectId();

    activeProject.textContent = getActiveProjectName(activeProjectId);

    //
    if(activeProjectId === "default"){
        deleteSvg.style.display = "none"
    }else{
        deleteSvg.style.display = "block"
    }

    let count = getTaskCount(activeProjectId);
    tasks.textContent = count === 1? `${count} task` : `${count} tasks`;

    projectsList.innerHTML = "";

    for(const key in projects){
        let component = createProjectComponent(key);
        projectsList.appendChild(component)
    }

}

addProjectBtn.addEventListener("click", () => {
    let projectName = projectInput.value;

    if(projectName){
        addProject(projectName);
        projectInput.value = "";
        projectInput.focus();
        renderProjects()
    }else{
        projectInput.focus();
    }
})

deleteSvg.addEventListener("click", () => {
    let projectId = getActiveProjectId()
    let confirmation =  confirm("All tasks under this project will be deleted");
    
    if(confirmation){
        deleteProject(projectId)
    }
  
})

renameSvg.addEventListener("click", () => {
    let projectId = getActiveProjectId();
    renameProject(projectId);
    
    renderProjects()
})

export { createProjectComponent, renderProjects }