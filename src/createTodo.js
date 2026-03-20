import { getDefaultRepo, initActiveRepo, setDefaultRepo} from "./store.js";
import { addItemToProject } from "./utils.js";

setDefaultRepo("Apex Projects Limited");
let defaultRepo = getDefaultRepo();

const projects = {
    [defaultRepo]: [],
}

initActiveRepo();

class Checklist{
    isComplete = false;

    constructor(name){
        this.name = name;
    }

    complete(){
        this.isComplete = true;
    }

}

class Todo{
  
    isComplete = false;
    description = "";
    checklist = [];

    constructor(title, dueDate, priority){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    set description(narrative){
        this.description = narrative;
    }

    complete(){
        this.isComplete = true;
    }

    addChecklist(name){
        let obj = new Checklist(name);
        this.checklist.push(obj);
    }
}

function createTodoItem(title, dueDate, priority){
    let item = new Todo(title, dueDate, priority);
    addItemToProject(item);
    return item;
}


export { createTodoItem, projects }