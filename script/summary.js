let tasksInBoard = 0;
let myTasks = [];


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
    fillContent();
}


function fillContent(){
    document.getElementById('tasksInBoard').innerHTML =`${myTasks.length}`;
    document.getElementById('tasksInProgress').innerHTML =``;
    document.getElementById('tasksAwaitingFeedback').innerHTML =``;

}