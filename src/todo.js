import { getProjects, getActiveProject, updateProjects } from "./store.js";
import { addItemToActiveProject, updateTaskCount } from "./utils.js";

class Checklist{

    constructor(description, isComplete = false){
        this.description = description;
        this.isComplete = isComplete
    }

    complete(){
        this.isComplete = true;
    }
}

class Todo{
  
    constructor({id = crypto.randomUUID(), title, description, dueDate, priority, isComplete = false, checklist = []}){
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

    addItemToChecklist(description){
        let checkItem = new Checklist(description);
        this.checklist.push(checkItem);
    }

}

function createTodoItem (todoObj){
    const item = new Todo(todoObj);
    addItemToActiveProject(item);
};


function completeTask(id){
    let projects = getProjects();
    let active  = getActiveProject();

    projects[active].forEach(task => {
        if(task.id === id){
            task.complete();
        }
    })

    updateProjects(projects);
}

function deleteTask(id){
    let projects = getProjects();
    let active = getActiveProject();
    let project = projects[active];

    let index = project.tasks.findIndex(task => task.id === id);

    project.tasks.splice(index, 1);

    updateProjects(projects);

    updateTaskCount();
}


export { createTodoItem, Todo, completeTask, deleteTask }