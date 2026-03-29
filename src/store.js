import { Todo } from "./todo.js";

const projects = {
    default: {id: "default", tasks: [], taskCount: 0}
}

const activeProject = "default";


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

function getActiveProject(){
    const data = localStorage.getItem("activeProject");

    if(data){
         return JSON.parse(data);
    }else{
        localStorage.setItem("activeProject", JSON.stringify(activeProject));
        return JSON.parse(localStorage.getItem("activeProject"));
    }
   
}

function activateProject(project){
    localStorage.setItem("activeProject", JSON.stringify(project));
}


function updateProjects(projects){
    localStorage.setItem("projects", JSON.stringify(projects))
}

export { getProjects, getActiveProject, activateProject, updateProjects }