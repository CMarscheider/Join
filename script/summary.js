let myTasks = [];
let urgentTasks = [];
let tasksInBoard = 0;
let tasksInProgess = 0;
let tasksAwaitingFeedback = 0;
let tasksDone = 0;
let tasksToDo = 0;


async function loadSummary() {
    await init();
    loadContentSummary();
    showTime();
    checkIfUserIsIncluded();
}


function loadContentSummary() {
    let name = user['name'];
    document.getElementById('greetingName').innerHTML = `${name}`;
}


function showTime() {
    var d = new Date();
    var time = d.getHours();
    let greetingBox = document.getElementById('time');

    if (time <= 11) {
        greetingBox.innerHTML = `Good morning,`;
    }
    if (time > 11 && time <= 14) {
        greetingBox.innerHTML = `Have a nice Lunch,`;
    }
    if (time > 14 && time <= 17) {
        greetingBox.innerHTML = `Good afternoon,`;
    }
    if (time > 17) {
        greetingBox.innerHTML = `Good evening,`;

    }
}


function checkIfUserIsIncluded() {

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];

        if (task.assigned.includes(user.name)) {
            myTasks.push(task);
        }
    }
    checkmyTasks();

}


function checkmyTasks(){
    for (let i = 0; i < myTasks.length; i++) {
        const task = myTasks[i];
        checkForUrgent(task);
        if (task['status'] == "inProgress") {
            tasksInProgess++;
        } else{
            if (task['status'] == "awaitingFeedback") {
                tasksAwaitingFeedback++;
            } else{
                if (task['status'] == "done") {
                    tasksDone++;
                } else{
                    tasksToDo++;
                }
            }
        }
    }
    fillContent();
}


function checkForUrgent(task) {
    if (task.prio == "urgent") {
        urgentTasks.push(task);
    }
}


function fillContent(){
    
    document.getElementById('tasksInBoard').innerHTML =`${myTasks.length}`;
    document.getElementById('tasksInProgress').innerHTML =`${tasksInProgess}`;
    document.getElementById('tasksAwaitingFeedback').innerHTML =`${tasksAwaitingFeedback}`;
    document.getElementById('urgentTasks').innerHTML =`${urgentTasks.length}`;
    document.getElementById('tasksToDo').innerHTML = `${tasksToDo}`;
    document.getElementById('tasksDone').innerHTML = ` ${tasksDone}`;

}