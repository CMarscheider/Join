let myTasks = [];
let urgentTasks = [];
let tasksInBoard = 0;
let tasksInProgess = [];
let tasksAwaitingFeedback = [];
let tasksDone = [];
let tasksToDo = [];
let formatted_date;

/**
 * Loads the summary page by performing the necessary initialization steps,
 * loading the summary content, showing the current time, and checking if the user is included in tasks.
 */

async function loadSummary() {
  await init();
  loadContentSummary();
  showTime();
  checkIfUserIsIncluded();
}

/**
 * Loads the content for the summary page by setting the greeting name element to the user's name.
 */

function loadContentSummary() {
  let name = user["name"];
  document.getElementById("greetingName").innerHTML = `${name}`;
}

/**
 * Displays a greeting based on the current time of the day.
 */

function showTime() {
  let d = new Date();
  let time = d.getHours();
  let greetingBox = document.getElementById("time");

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

/**
 * hecks if the current user is included in any of the tasks and adds them to the 'myTasks' array.
 * Calls the 'checkmyTasks' function to perform further processing.
 */

function checkIfUserIsIncluded() {
  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];

    if (task.assigned.includes(user.name)) {
      myTasks.push(task);
    }
  }
  checkmyTasks();
}

/**
Performs various checks and processing on the 'myTasks' array.
Calls the 'checkForUrgent' function for each task to check if it is marked as urgent.
Calls the 'pushAssignedTasks' function for each task to push it to the 'assignedTasks' array.
Calls the 'checkForLowerDate' function to check for tasks with a lower due date.
Calls the 'fillContent' function to fill the content of the summary page.
*/

function checkmyTasks() {
  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];
    checkForUrgent(task);
    pushAssignedTasks(task);
  }
  checkForLowerDate();
  fillContent();
}

/**
 * Pushes the given task into the appropriate array based on its status.
 * If the status is 'inProgress', the task is pushed into the 'tasksInProgess' array.
 * If the status is 'awaitingFeedback', the task is pushed into the 'tasksAwaitingFeedback' array.
 * If the status is 'done', the task is pushed into the 'tasksDone' array.
 * For any other status, the task is pushed into the 'tasksToDo' array.
 * @param {Object} task - The task to be pushed into the corresponding array.
 */

function pushAssignedTasks(task) {
  switch (task.status) {
    case "inProgress":
      tasksInProgess.push(task);
      break;
    case "awaitingFeedback":
      tasksAwaitingFeedback.push(task);
      break;
    case "done":
      tasksDone.push(task);
      break;
    default:
      tasksToDo.push(task);
      break;
  }
}

/**
 * Checks if the given task is marked as urgent.
 * If the task is marked as urgent and its status is not 'done', it is added to the 'urgentTasks' array.
 * @param {Object} task - The task to be checked for urgency.
 */

function checkForUrgent(task) {
  if (task.prio == "urgent") {
    if (task["status"] == "done") {
    } else {
      urgentTasks.push(task);
    }
  }
}

/**
 * Checks for tasks marked as urgent and finds the lowest date among them.
 *If there are urgent tasks with a date lower than today, the lowest date is rendered.
 */

function checkForLowerDate() {
  if (urgentTasks.length > 0) {
    let lowestDate = null;
    for (let i = 0; i < urgentTasks.length; i++) {
      let date = urgentTasks[i]["date"];
      if (checkDateLowerThanToday(date)) {
        if (lowestDate == null || lowestDate > date) {
          lowestDate = date;
        }
      }
    }
    if (lowestDate != null) {
      renderDate(lowestDate);
    }
  }
}

/**
 * Checks if a given date is later than today's date.
 * @param {string} date - The date to compare in the format "YYYY-MM-DD".
 * @returns {boolean} - True if the date is later than today, false otherwise.
 */

function checkDateLowerThanToday(date) {
  let today = new Date().toISOString().slice(0, 10);
  return date > today;
}

/**
 * Renders a formatted date string based on the given date.
 * @param {string} date - The date to render in the format "YYYY-MM-DD".
 * @returns {string} - The formatted date string in the format "Month Day, Year".
 */

function renderDate(date) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let splitDate = date.split("-");
  let month = parseInt(splitDate[1]);
  let year = splitDate[0];
  let day = splitDate[2];

  let formatDate = () => {
    formatted_date = months[month - 1] + " " + day + ", " + year;
    return formatted_date;
  };
  formatDate();
}

/**
 * Updates the content on the webpage with the task statistics and formatted date.
 * It retrieves the required elements by their IDs and sets their innerHTML/innerText
 * to the corresponding values from the task arrays and formatted_date variable.
 * If formatted_date is falsy, "No" is displayed for the date.
 */

function fillContent() {
  document.getElementById("tasksInBoard").innerHTML = `${allTasks.length}`;
  document.getElementById("tasksInProgress").innerHTML = `${tasksInProgess.length}`;
  document.getElementById("tasksAwaitingFeedback").innerHTML = `${tasksAwaitingFeedback.length}`;
  document.getElementById("urgentTasks").innerHTML = `${urgentTasks.length}`;
  document.getElementById("tasksToDo").innerHTML = `${tasksToDo.length}`;
  document.getElementById("tasksDone").innerHTML = ` ${tasksDone.length}`;
  document.getElementById("date").innerHTML = formatted_date ? formatted_date : "No";
}

/**
 *Redirects the user to the board.html page.
 */

function forwardToBoard() {
  window.location.href = "board.html";
}
