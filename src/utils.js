
import { getActiveProject, getProjects, updateProjects } from "./store.js";


function addItemToActiveProject(item){
    const projects = getProjects()
    const active = getActiveProject();

    projects[active].tasks.push(item);

    updateProjects(projects);

    updateTaskCount()

}

function addProject(project){
    const projects = getProjects();
    projects[project] = {id: crypto.randomUUID(), tasks: [], taskCount: 0};

    updateProjects(projects)
}

function deleteProject(id){
    const projects = getProjects();
    for(const key in projects){
        let project = projects[key];

        if(id === "default"){
            console.log("Cannot delete default repo");
            return;
        }

        if(project.id === id){
            delete projects[project];
            break;
        }
    }

    updateProjects(projects)
}
    


function renameProject(id){

    let projects = getProjects();

    for(const key in  projects){
        if(projects[key].id === id){
            let newName = prompt("Enter new project name", `${key}`);
            let todos = projects[key];

            delete projects[key];

            while(!newName){
                newName = prompt("Enter new project name", `${key}`);
            }

            projects[newName] = todos;

            updateProjects(projects)
            
            return;
        }
   
    }
}

function updateTaskCount(){
    let projects = getProjects();
    let active = getActiveProject();
    let project = projects[active];

    project.taskCount = project.tasks.length;

    updateProjects(projects)
}

export {addItemToActiveProject, addProject, deleteProject, renameProject, updateTaskCount }