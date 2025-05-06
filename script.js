//get elements
let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let tasksdiv = document.querySelector(".tasks");
let delspan = document.querySelector(".delspan");
//array contains the tasks
let tasksArray = [];
//check if there is data in local storage
if (localStorage.getItem("tasks")){
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
};
//display tasks if reload
displayTasks(tasksArray);
//delete task
tasksdiv.addEventListener("click", (e)=>{
    if(e.target.classList.contains("del")){
        //remove from page
        e.target.parentElement.remove();
        //remove from local storage
        deleteTask(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("task")){
        task_status(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});
//when submit a task
submit.onclick = function (){
    if(input.value !==""){
        addTaskToArray(input.value);
        input.value = "";
    }
};

delspan.onclick = function(){
    tasksArray = [];
    tasksdiv.innerHTML = "";
    addTasksToLocalStorage(tasksArray);
}

function addTaskToArray(taskText){
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    };
    tasksArray.push(task);
    displayTasks(tasksArray);
    addTasksToLocalStorage(tasksArray);
};
// display tasks in the tasks section
function displayTasks(tasksArray){
    tasksdiv.innerHTML = "";
    tasksArray.forEach((task) =>{
        let Div = document.createElement("div");
        Div.className = "task";
        if(task.completed){
            Div.className = "task done";
        }
        Div.setAttribute("data-id", task.id);
        Div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        Div.appendChild(span);
        tasksdiv.appendChild(Div);


    });
};

function addTasksToLocalStorage(tasksArray){
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

/*function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
    }
}*/

function deleteTask(taskid){
    //filter array with id and remove the task deleted
    tasksArray = tasksArray.filter((task) => task.id != taskid);
    //update the array in the local storage
    addTasksToLocalStorage(tasksArray);
}


function task_status(taskid){
    for(let i=0 ; i<tasksArray.length ; i++){
        if(tasksArray[i].id == taskid){
            tasksArray[i].completed == false ? (tasksArray[i].completed = true) : (tasksArray[i].completed = false);
        }
    }
    addTasksToLocalStorage(tasksArray);
}