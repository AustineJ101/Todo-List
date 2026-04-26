import { getProjects, updateProjects, getActiveProjectId } from "./store.js";
import { addItemToActiveProject, updateTaskCount } from "./utils.js";

class Checklist{

    constructor(description, isComplete){
        this.description = description;
        this.isComplete = isComplete
    }
}

class Todo{
  
    constructor(
        {
            id = crypto.randomUUID(),
            title,
            description,
            dueDate, 
            priority, 
            isComplete = false, 
            checklist = []
        }
    ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.checklist = checklist;
    }

    complete(){
        this.isComplete = true;
    }

    addItemToChecklist(description, status){
        let checkItem = new Checklist(description, status);
        this.checklist.push(checkItem);
    }

}

function createTodoItem (todoObj){
    const item = new Todo(todoObj);
    addItemToActiveProject(item);
};


function completeTask(taskId){
    let projects = getProjects();
    let projectId = getActiveProjectId();

    for(const key in projects){
        let project = projects[key];
        if(project.id === projectId){
            let task = getTask(project, taskId);
            task.complete();

            updateProjects(projects);

            return;
        }
    }

}

function deleteTask(taskId){
    let projects = getProjects();
    let projectId = getActiveProjectId();
    
    for(const key in projects){
        let project = projects[key];
        if(project.id === projectId){
            let index = project.tasks.findIndex(task => task.id === taskId);
            project.tasks.splice(index, 1);

            updateTaskCount(project);

            updateProjects(projects);

        }
   
    }    
}

function getTask(project, taskId){
   let tasks = project.tasks;
   return tasks.find(todo => todo.id === taskId)

}


export { createTodoItem, Todo, completeTask, deleteTask }