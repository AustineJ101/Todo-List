class Checklist{
    isComplete = false;
    constructor(description){
        this.description = description;
    }

    complete(){
        this.isComplete = true;
    }
}

class Todo{
    isComplete = false;
    checklist = [];

    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    complete(){
        this.isComplete = true;
    }

    addItemToChecklist(description){
        let checkItem = new Checklist(description);
        this.checklist.push(checkItem);
    }

}

export { Todo }