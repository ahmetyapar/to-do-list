const form = document.querySelector("#task-form");
const taskInput = document.querySelector(".input");
const items = document.querySelector(".items")
const deleteAll = document.querySelector("#delete")

loadEventListeners();

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    items.addEventListener("click", removeTask);
    deleteAll.addEventListener("click", allDelete)
}

function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks")=== null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        const div = document.createElement("div");
        div.className = "item";
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(task));
        div.appendChild(p);
        const a = document.createElement("a");
        a.className = "delete";
        const i = document.createElement("i");
        i.className ="fa-solid fa-xmark";
        a.appendChild(i);
        div.appendChild(a);
        items.appendChild(div);

    });

    
}


function addTask(e) {
    if(taskInput.value === ""){
        alert("Add a task");
    }else {
        const div = document.createElement("div");
        div.className = "item";
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(taskInput.value));
        div.appendChild(p);
        const a = document.createElement("a");
        a.className = "delete";
        const i = document.createElement("i");
        i.className ="fa-solid fa-xmark";
        a.appendChild(i);
        div.appendChild(a);
        items.appendChild(div);
        
        storeTaskInLocalStorage(taskInput.value);
        

        taskInput.value = "";

        e.preventDefault();
        }
    

    
    
    

}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem("tasks")=== null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function removeTask(e){
    if( e.target.parentElement.classList.contains("delete")){
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove()
            
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }


}
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks")=== null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task ){
            tasks.splice(index,1);
        }

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));


}

function allDelete(){
    items.innerHTML = "";

    clearTasksFromLocalStorage();

}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}