let allTasks = [];
let prio;

function addTask(){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let assigned = document.getElementById('assigned').value;
    let date = document.getElementById('date').value;
    /* let prio = document.getElementById('title').value; */
    /* let subtask = document.getElementById('subtask').value; */

    

let task = {
    'title': title,
    'description': description,
    'category': category,
    'assigned': assigned,
    'date': date,
    /* 'title': title,
    'title': title, */
};

allTasks.push(task);
let allTasksAsString = JSON.stringify(allTasks);
localStorage.setItem('allTasks', allTasksAsString);
console.log(allTasks);
}

function loadAllTasks(){
   let allTasksAsString = localStorage.getItem('allTasks');
   allTasks = JSON.parse(allTasksAsString);
   console.log(allTasks);
}

function checkPriority(priority){
    prio = priority;
}