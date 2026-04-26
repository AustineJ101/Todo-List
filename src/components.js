import { renderProjects } from "./dom.js";
import { getActiveProjectId, getProjects, updateProjects } from "./store.js";
import { deleteTask } from "./todo.js";
import { getActiveProjectName } from "./utils.js";

function createChecklistComponent(item){
    const id = crypto.randomUUID();

    const container = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", id);

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = item;

    container.appendChild(checkbox);
    container.appendChild(label);

    return container;
}


function createTodoComponent(todo){
    let checklist = document.createElement("div");

    let container = document.createElement("div");
    container.classList.add("todo-item");

    if(todo.isComplete){
        container.setAttribute("id", "completedTask")
    }

    switch(todo.priority){
        case "high":
            container.classList.add("high");
            break;
        case "medium":
            container.classList.add("medium");
            break;
        case "low":
            container.classList.add("low")
    }

    let topSection = document.createElement("div");
    topSection.classList.add("headline");

    let div = document.createElement("div");
    div.classList.add("left-topSection");

    let statusContainer = document.createElement("div");
    statusContainer.classList.add("statusContainer");

    let title = document.createElement("h4");
    title.textContent = todo.title;

    let button = document.createElement("button");
    button.classList.add("task-delete");
    button.setAttribute("id", todo.id);

    button.innerHTML = `<svg width="20" fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`

    button.addEventListener("click", () => {
        let taskId = button.id;
        deleteTask(taskId);
        renderProjects();

        
    })
    

    let complete = document.createElement("div");
    let completeInput = document.createElement("input");
    completeInput.setAttribute("type", "checkbox");
    completeInput.setAttribute("id", `complete-${todo.id}`);
    completeInput.classList.add("complete");
    let completeLabel = document.createElement("label");
    completeLabel.setAttribute("for", `complete-${todo.id}`);
    completeLabel.classList.add("complete");
    completeLabel.textContent = "Complete";

    if(todo.isComplete){
        completeInput.checked = true;
    }else{
        completeInput.checked = false;
    }

    completeInput.addEventListener("change", (e) => {
        let projects = getProjects();
        let activeProjectId = getActiveProjectId();
        let projectName = getActiveProjectName(activeProjectId);
        let todoItem = projects[projectName].tasks.find(task => task.id === todo.id);
        
        if(e.target.checked){
            if(todoItem.checklist.length > 0){
                todoItem.checklist.forEach(item => item.isComplete = true);
                todoItem.isComplete = true;
                
            }else{
                todoItem.isComplete = true;
            }
        }else if(todoItem.checklist.length === 0){
            todoItem.isComplete = false;
        }

        updateProjects(projects);
        renderProjects();

    });

    complete.appendChild(completeInput);
    complete.appendChild(completeLabel);

    statusContainer.appendChild(complete);


    div.appendChild(title);
    div.appendChild(button);

    topSection.appendChild(div);
    topSection.appendChild(statusContainer);


    let date = document.createElement("div");
    date.textContent = todo.dueDate;

    let description = document.createElement("p");
    description.textContent = todo.description;

    if(todo.checklist.length > 0){

        todo.checklist.forEach(item => {
            let id = crypto.randomUUID();

            let checkContainer = document.createElement("div");

            let label = document.createElement("label");
            label.setAttribute("for", id);
            label.textContent = item.description;
            
            let listCheckbox = document.createElement("input");
            listCheckbox.setAttribute("type", "checkbox");
            listCheckbox.setAttribute("id", id);

            if(item.isComplete){
                listCheckbox.setAttribute("checked", true);
            }

            listCheckbox.addEventListener("change", (e) => {
                let projects = getProjects();
                let activeProjectId = getActiveProjectId();
                let projectName = getActiveProjectName(activeProjectId);
                let taskId = todo.id;
                let todoItem = projects[projectName].tasks.find(task => task.id === taskId);
                let checkItem = todoItem.checklist.find(item => item.description === label.textContent);

                if(e.target.checked){  
                    checkItem.isComplete = true;
                    if(todoItem.checklist.every(item => item.isComplete)){
                        todoItem.isComplete = true;
                    }
                   
                }else{
                    checkItem.isComplete = false;
                    todoItem.isComplete = false;
                }

                 updateProjects(projects);
                 renderProjects();
            })

            // input.addEventListener("click", (e) => {
            //     let projects = getProjects();
            //     let activeProjectId = getActiveProjectId();
            //     let projectName = getActiveProjectName(activeProjectId);
            //     let taskId = todo.id;

            //     let targetTask = projects[projectName].tasks.find(task => task.id === taskId);

            //     targetTask.checklist.forEach(item => {
            //         if(item.description === label.textContent){
            //             if(e.target.checked){
            //                 item.isComplete = true;
            //             }else{
            //                 item.isComplete = false;
            //             }

            //             updateProjects(projects);
            //         }
            //     });     
            // })
            
          
            checkContainer.appendChild(listCheckbox);
            checkContainer.appendChild(label);

            checklist.appendChild(checkContainer);
        })
        
    }

    container.appendChild(topSection);
    container.appendChild(date);
    container.appendChild(description);
    container.appendChild(checklist);

    return container;
}


export { createChecklistComponent, createTodoComponent }