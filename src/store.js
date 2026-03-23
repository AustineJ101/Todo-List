const projects = {
    default: [],
}

function initializeAndRetrieveProjects(){
    localStorage.setItem("projects", JSON.stringify(projects));
    return JSON.parse(localStorage.getItem("projects"));
}

function retrieveProjects(){
    return JSON.parse(localStorage.getItem("projects"));
}

function getProjects(){
    const projects = localStorage.getItem("projects")? retrieveProjects() : initializeAndRetrieveProjects();
    return projects;
}

export { getProjects }