import { Todo } from "./todo.js";

const projects = {
    Personal: {
        id: "default",
        tasks: [{
                    title: "Sample Task",
                    dueDate: "2026-04-27",
                    description: "Promptly complete the sample task",
                    priority: "Medium",
                    checklist: [{description: "carry out step 1", isComplete: true}, {description: "Proceed to step 2", isComplete: false}]
               }], 
        taskCount: 1}
}

const activeProjectId = "default";


function getProjects(){
    const data = localStorage.getItem("projects");
    let parsedProjects;

    if(data){
        parsedProjects = JSON.parse(data);

    }else{
        localStorage.setItem("projects", JSON.stringify(projects)); 
        parsedProjects = JSON.parse(localStorage.getItem("projects"));
    }

    //Recreate todo instances to preserve class methods 
    for(const projectName in parsedProjects){
        parsedProjects[projectName].tasks = parsedProjects[projectName].tasks.map(
            item => new Todo(item)
        )
    }

    return parsedProjects;

}

function getActiveProjectId(){
    const data = localStorage.getItem("activeProjectId");

    if(data){
         return JSON.parse(data);
    }else{
        localStorage.setItem("activeProjectId", JSON.stringify(activeProjectId));
        return JSON.parse(localStorage.getItem("activeProject"));
    }
   
}

function activateProject(id){

    localStorage.setItem("activeProjectId", JSON.stringify(id));    
     
}
    


function updateProjects(projects){
    localStorage.setItem("projects", JSON.stringify(projects))
}

export { getProjects, getActiveProjectId, activateProject, updateProjects }