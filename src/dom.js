import { createChecklistComponent, createTodoComponent } from "./components.js";
import { activateProject, getActiveProjectId, getProjects } from "./store.js";
import { Todo } from "./todo.js";
import { addItemToActiveProject, addProject, deleteProject, getActiveProjectName, getTaskCount, renameProject } from "./utils.js";

const projectsList = document.querySelector(".projects");
const activeProject = document.querySelector(".activeRepo h1");
const tasks = document.querySelector(".activeRepo span");
const projectInput = document.querySelector("#newProject");
const addProjectBtn = document.querySelector("#addProjectBtn");
const deleteSvg = document.querySelector("svg#delete");
const renameSvg = document.querySelector("svg#edit");
const todoList = document.querySelector(".items-container");

const taskDialog = document.querySelector("#task-dialog");
const addNewTaskBtn = document.querySelector("#add-task");
const cancelTaskBtn = document.querySelector("#close-task-dialog");
const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#description");
const dueDate = document.querySelector("#dueDate");
const priority = document.querySelector("#priority");
const form = document.querySelector("form");
const addToChecklistBtn = document.querySelector("#add-to-checklist");
const checklistContainer = document.querySelector(".checklist-container");
const checklistInput = document.querySelector("#checklist-input");


function createProjectComponent(projectName){
    let projects = getProjects();
    let project = projects[projectName];
    let activeProjectId = getActiveProjectId();

    let container = document.createElement("div");
    let line = document.createElement("div");
    line.classList.add("line");
    let h1 = document.createElement("h1");

    if(project.id === activeProjectId){
        h1.classList.add("active")
    }

    h1.setAttribute("id", project.id)
    h1.textContent = projectName;

    h1.addEventListener("click", (e) => {
        let id = e.target.id;
        activateProject(id);

        renderProjects()
    })

    container.appendChild(line);
    container.appendChild(h1);

    return container;
}

function renderProjects(){
    let projects = getProjects();
    let activeProjectId = getActiveProjectId();

    activeProject.textContent = getActiveProjectName(activeProjectId);


    if(activeProjectId === "default"){
        deleteSvg.style.display = "none"
    }else{
        deleteSvg.style.display = "block"
    }

    let count = getTaskCount(activeProjectId);
    tasks.textContent = count === 1? `${count} task` : `${count} tasks`;

    projectsList.innerHTML = "";
    todoList.innerHTML = "";


    for(const projectName in projects){
        let project = projects[projectName];
        let component = createProjectComponent(projectName);
        projectsList.appendChild(component);

        if(project.id === activeProjectId){
            project.tasks.forEach(task => {
                let todoItem = new Todo(task);
                let component = createTodoComponent(todoItem);
                todoList.appendChild(component);
            })

        }
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

addNewTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let checklist = [];

    if(checklistContainer.children.length > 0){

        let items = checklistContainer.querySelectorAll("div");
        checklist = Array.from(items).map(item => {
            let checkbox = item.querySelector("input");
            let label = item.querySelector("label");

            return {
                text: label.textContent.trim(),
                checked: checkbox.checked
            };
        })
        
    }

    
    let data = {
        title: taskTitle.value,
        description: taskDescription.value,
        dueDate: dueDate.value, 
        priority: priority.value,
    }


    if(form.checkValidity()){ 

        let todoItem = new Todo(data);
        if(checklist.length > 0){
            checklist.forEach(item => {
                todoItem.addItemToChecklist(item.text, item.checked)
            })
        } 

        addItemToActiveProject(todoItem);

         form.reset();
         checklistContainer.innerHTML = "";
         checklistContainer.setAttribute("hidden", true)
         taskDialog.close();
         renderProjects();
    }else{
        form.reportValidity();
    }
    

})

cancelTaskBtn.addEventListener("click", () => {
    form.reset();
    checklistContainer.innerHTML = "";
    checklistContainer.setAttribute("hidden", true)
    taskDialog.close();
})

addToChecklistBtn.addEventListener("click", () => {
    const item = checklistInput.value;

    if(item){
        let checkItem = createChecklistComponent(item);
        checklistContainer.removeAttribute("hidden")
        checklistContainer.appendChild(checkItem);
        checklistInput.value = "";
        checklistInput.focus();
    }else{
        checklistInput.focus()
    }
})

export { createProjectComponent, renderProjects }