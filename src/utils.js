
import { renderProjects } from "./dom.js";
import { activateProject, getActiveProjectId, getProjects, updateProjects } from "./store.js";


function addItemToActiveProject(item){
    const projects = getProjects()
    const id = getActiveProjectId();

    for(const key in projects){
        let project = projects[key];
        if(project.id === id){
            project.tasks.push(item);

            updateTaskCount(project);

            updateProjects(projects);

            return;
        }
    }
    

}

function addProject(project){
    const projects = getProjects();
    projects[project] = {id: crypto.randomUUID(), tasks: [], taskCount: 0};

    updateProjects(projects);
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
            delete projects[key];

            activateProject("default")
            updateProjects(projects);
            
            renderProjects()
            return;
        }
    }

}
    


function renameProject(id){

    let projects = getProjects();

    for(const key in  projects){
        if(projects[key].id === id){
            let newName = prompt("Enter new project name", `${key}`);
            let projectDetails = projects[key];

            delete projects[key];

            while(!newName){
                newName = prompt("Enter new project name", `${key}`);
            }

            projects[newName] = projectDetails;

            updateProjects(projects)
            
            return;
        }
   
    }
}

function updateTaskCount(project){
    
    project.taskCount = project.tasks.length;

}

function getActiveProjectName(){
    let id = getActiveProjectId();

    let projects = getProjects();

    for(const key in projects){
        let project = projects[key];

        if(project.id === id){
            return key;
        }
    }
}

function getTaskCount(){
    let projects = getProjects();
    let projectName = getActiveProjectName();

    console.log(projectName)

    return projects[projectName].taskCount;
}

export {addItemToActiveProject, addProject, deleteProject, renameProject, updateTaskCount, getActiveProjectName, getTaskCount }